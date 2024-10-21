"use strict";

const { data } = require("autoprefixer");
const config = require("../data/config");
const regex = require("./regex");

function authUid() {
  return `auth.uid`;
}

function or(...args) {
  if (args.length == 1) return args[0];
  return args.map((arg) => `(${arg})`).join(" || ");
}
function and(...args) {
  if (args.length == 1) return args[0];
  return args.map((arg) => `(${arg})`).join(" && ");
}

function self() {
  return `${authUid()} == $userId`;
}

function isRole(role) {
  return `root.child('role/' + auth.uid).val() == '${role}'`;
}

function isManager() {
  return or(isRole("teacher"), isRole("parent"));
}

function manager() {
  return `data.child('nric').exists() && root.child('nric/' + data.child('nric').val() + '/manager').val() == auth.uid`;
}

function getInfo(info, uid = "auth.uid") {
  return `root.child('users/' + ${uid} + '/${info}').val()`;
}

function newDataIs(value, data = "newData.val()") {
  return or(...value.map((v) => `${data} == ${v}`));
}

function newDataIsEmpty() {
  return `!newData.exists()`;
}

function dataIs(value, data = "data.val()") {
  return or(...value.map((v) => `${data} == ${v}`));
}

function dataIsEmpty() {
  return `!data.exists()`;
}

const rules = {
  ".read": isRole("admin"),
  users: {
    $userId: {
      // data.child('nric').exists() && root.child('nric/' + data.child('nric').val() + '/manager').val() == auth.uid
      ".read": or(self(), isRole("admin"), manager()),
      ".write": or(self(), isRole("admin"), manager()),

      name: { ".validate": "newData.isString() && newData.val().length > 0" },
      email: {
        ".write": and(self(), dataIsEmpty(), newDataIs(["auth.token.email"])),
        ".validate": "newData.isString() && newData.val().length > 0",
      },

      // receipt generation
      billingMobileNumber: {
        ".validate": `newData.val().matches(${regex.phone.toString()})`,
      },
      billingAddress: {
        line1: { ".validate": "true" },
        line2: { ".validate": "true" },
        postcode: { ".validate": "true" },
        city: { ".validate": "true" },
        state: { ".validate": "true" },
        country: { ".validate": "true" },
        $other: { ".validate": "false" },
      },

      // student details
      form: { ".validate": "true" },
      gender: {
        ".validate": newDataIs(
          Object.keys(config.genders).map((key) => `'${key}'`)
        ),
      },
      dob: { ".validate": `newData.val().matches(${regex.dob.toString()})` },

      state: { ".validate": "true" },
      country: { ".validate": "true" },

      category: {
        ".validate": newDataIs(["'junior'", "'intermediate'", "'senior'"]),
      },

      school: { ".validate": "true" },

      nationality: { ".write": dataIsEmpty() },
      nric: {
        ".write": or(
          isRole("admin"),
          and(
            dataIsEmpty(),
            `data.parent().child('nationality').exists()`,
            or(
              and(
                `data.parent().child('nationality').val() == 'Malaysian'`,
                `newData.val().matches(${regex.nric.toString()})`
              ),
              and(
                `data.parent().child('nationality').val() != 'Malaysian'`,
                `newData.val().matches(${regex.passport.toString()})`
              )
            )
          )
        ),
      },

      $other: { ".validate": "false" },
    },
  },

  role: {
    // only on account creation (teacher/parent/student)
    $userId: {
      // can only write teacher/parent/student
      ".read": or(self(), isRole("admin")),
      ".write": or(
        and(
          self(),
          dataIsEmpty(),
          newDataIs(["'teacher'", "'parent'", "'student'"])
        ),
        isRole("admin")
      ),
      ".validate": and(
        "newData.isString()",
        newDataIs(["'teacher'", "'parent'", "'student'", "'admin'"])
      ),
    },
  },

  // map nric -> student/manager
  nric: {
    $nric: {
      ".read": "true",
      // can write iff data not exists
      student: {
        ".write": or(
          and(
            dataIsEmpty(),
            newDataIs([authUid()]),
            isRole("student"),
            `$nric == ${getInfo("nric")}`
          ),
          isRole("admin")
        ),
      },
      manager: {
        ".write": or(
          and(
            dataIsEmpty(),
            newDataIs([authUid()]),
            or(isRole("teacher"), isRole("parent"))
            // BEFORE REGISTRATION DEADLINE
            // `root.child('contestInfo/registrationDeadline').val() > now`
          ),
          and(
            dataIs([authUid()]),
            newDataIsEmpty(),
            or(isRole("teacher"), isRole("parent"))
          ),
          and(dataIsEmpty(), newDataIsEmpty()),
          isRole("admin")
        ),
      },
      $other: { ".validate": "false" },
    },
  },

  // map manager -> students
  managedStudents: {
    $userId: {
      ".read": or(self(), isRole("admin")),
      ".write": or(self(), isRole("admin")),
      $nric: { ".validate": "true" },
    },
  },

  payments: {
    $userId: {
      ".read": self(),
      $paymentId: {
        // managers can create, can read, cannot edit
        ".write": or(self(), isRole("admin")),
        amount: {
          ".write": or(dataIsEmpty(), isRole("admin")),
          ".validate": `newData.val().matches(${regex.amount.toString()})`,
        },
        fileExtension: {
          ".write": or(dataIsEmpty(), isRole("admin")),
          ".validate": "newData.isString()",
        },
        uniqueId: {
          ".write": or(dataIsEmpty(), isRole("admin")),
          ".validate": "newData.isString()",
        },
        approved: {
          ".write": isRole("admin"),
          status: {
            ".validate": and(
              "newData.isString()",
              newDataIs(["'approved'", "'pending'", "'rejected'"])
            ),
          },
          by: {
            ".write": newDataIs(["auth.uid"]),
            ".validate": "newData.isString()",
          },
          $other: { ".validate": "false" },
        },
        $other: { ".validate": "false" },
      },
    },
  },

  contestInfo: {
    ".read": "true",
    ".write": isRole("admin"),

    registrationDeadline: { ".validate": "newData.isNumber()" },

    announcements: {
      $announcementId: {
        ".validate": "newData.isString()",
        ".write": isRole("admin"),
        title: { ".validate": "newData.isString()" },
        content: { ".validate": "newData.isString()" },
        $other: { ".validate": "false" },
      },
    },

    informationTitle: {
      ".validate": "newData.isString()",
    },

    information: {
      ".validate": "newData.isString()",
    },
  },

  $other: { ".validate": "false" },
};

console.log(JSON.stringify({ rules }, null, 2));
module.exports = rules;
