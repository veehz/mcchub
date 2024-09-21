import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import TextInput from "@/components/FormComponents/TextInput";
import { db } from "@/firebase";
import { onValue, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { PaymentCard } from "../payments";
import Link from "next/link";
import { useRouter } from "next/router";

import config from "@/data/config";

const sum = (a: number, b: number) => a + b;
const reduceMethods: {
  [key: string]: (a: boolean, b: boolean) => boolean;
} = {
  and: (a: boolean, b: boolean) => a && b,
  or: (a: boolean, b: boolean) => a || b,
  xor: (a: boolean, b: boolean) => a != b,
};
const reduceMethodsDefaultValues: {
  [key: string]: boolean;
} = {
  and: true,
  or: false,
  xor: false,
};
const UserCard = ({
  userId,
  users,
  nricData,
  role,
  managedStudents,
  payments,
  searchKey,
}: {
  userId: string;
  users: any;
  nricData: any;
  role: string;
  managedStudents: any;
  payments: any;
  searchKey: string;
}) => {
  const [hidden, setHidden] = useState<boolean>(false);

  const [viewPayments, setViewPayments] = useState<boolean>(false);
  useEffect(() => {
    if (searchKey) {
      setHidden(true);
      const keys = searchKey
        .trim()
        .split(" ")
        .map((x) => x.toLowerCase().trim())
        .filter((x) => x.length > 0);

      const rawSearchKeys = [];
      const options: {
        [key: string]: string;
      } = {};

      for (const k of keys) {
        if (k.includes(":")) {
          const [key, value] = k.split(":");
          options[key] = value;
        } else {
          rawSearchKeys.push(k);
        }
      }

      const tfarray = [];

      for (const k of rawSearchKeys) {
        let found = false;
        for (const key of Object.keys(users[userId])) {
          if (users[userId][key].toLowerCase().includes(k)) {
            found = true;
            break;
          }
        }
        tfarray.push(found);
      }

      // options
      if (options["due"] == "true") {
        const needToPay =
          Object.keys(managedStudents).length * config.registration_fee;
        const approvedPayment = Object.keys(payments)
          .filter((key) => payments[key]?.approved?.status == "approved")
          .map((key) => parseFloat(payments[key].amount))
          .reduce(sum, 0);

        tfarray.push(needToPay > approvedPayment);
      }

      if (options["role"]) {
        tfarray.push(role == options["role"]);
      }

      if (options["managerof"]) {
        tfarray.push(options["managerof"] in managedStudents);
      }

      let verdict = tfarray.reduce(
        reduceMethods.and,
        reduceMethodsDefaultValues.and
      );

      if (options["searchtype"] && options["searchtype"] in reduceMethods) {
        verdict = tfarray.reduce(
          reduceMethods[options["searchtype"]],
          reduceMethodsDefaultValues[options["searchtype"]]
        );
      }

      if (options["not"] == "true") {
        verdict = !verdict;
      }

      setHidden(!verdict);
    } else {
      setHidden(false);
    }
  }, [searchKey, payments, managedStudents, role, userId, users]);

  function capitalize(str: string) {
    const words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }

  return (
    <div
      className={
        "rounded-lg overflow-hidden shadow-lg p-4 mb-4" +
        (hidden ? " hidden" : "")
      }
    >
      <div className="font-bold text-xl mb-2">
        {users[userId]?.name}: {users[userId].email}
      </div>
      <div className="text-gray-700 text-base mb-2">
        <div className="flex flex-col">
          <div>
            <span className="font-bold">User ID</span>: {userId}
          </div>
          <div>
            <span className="font-bold">Role</span>: {role}
          </div>
          {Object.keys(users[userId])
            .filter((key) => !["email", "name", "nric"].includes(key))
            .map((key) => (
              <div key={key}>
                <span className="font-bold">{capitalize(key)}</span>:{" "}
                {users[userId][key]}
              </div>
            ))}

          {/* payments */}
          {role == "teacher" || role == "parent" ? (
            <div>
              <div className="font-bold">
                Payments: {payments ? Object.keys(payments).length : null}{" "}
                (Approved:{" "}
                {payments
                  ? Object.keys(payments).filter(
                      (key) => payments[key]?.approved?.status == "approved"
                    ).length
                  : null}
                , Pending:{" "}
                {payments
                  ? Object.keys(payments).filter(
                      (key) =>
                        !payments[key]?.approved?.status ||
                        payments[key]?.approved?.status == "pending"
                    ).length
                  : null}
                , Rejected:{" "}
                {payments
                  ? Object.keys(payments).filter(
                      (key) => payments[key]?.approved?.status == "rejected"
                    ).length
                  : null}
                )
              </div>
              <div>
                <span className="font-bold">Need to pay:</span>{" "}
                {Object.keys(managedStudents).length * config.registration_fee}
              </div>
              <div>
                <span className="font-bold">Approved Payment:</span>{" "}
                {Object.keys(payments)
                  .filter(
                    (key) => payments[key]?.approved?.status == "approved"
                  )
                  .map((key) => parseFloat(payments[key].amount))
                  .reduce(sum, 0)}
              </div>
            </div>
          ) : null}

          {/* students */}
          {role == "teacher" || role == "parent" ? (
            <div>
              <div className="font-bold">
                Students: {Object.keys(managedStudents || {}).length}
              </div>
              <div className="flex flex-col">
                {Object.keys(managedStudents || {}).map((studentId) => (
                  <div
                    key={studentId}
                    className={
                      nricData[studentId]?.student
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {studentId}{" "}
                    {nricData[studentId]?.student ? (
                      <div>
                        ({users[nricData[studentId].student].email},{" "}
                        <span
                          className="text-blue-600 font-bold hover:opacity-75 cursor-pointer"
                          onClick={() => {
                            const updates: {
                              [key: string]: any;
                            } = {};
                            updates[`managedStudents/${userId}/${studentId}`] =
                              null;
                            updates[
                              `nric/${
                                users[nricData[studentId].student].nric
                              }/manager`
                            ] = null;
                            update(ref(db), updates);
                          }}
                        >
                          Unbind
                        </span>
                        )
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* teacher of student */}
          {role == "student" && users[userId]?.nric ? (
            <div>
              <div className="font-bold">
                NRIC/Passport Number:{" "}
                <span
                  className={
                    nricData[users[userId]!.nric]?.manager
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {users[userId]!.nric}{" "}
                  {nricData[users[userId]!.nric]?.manager
                    ? `(manager: ${
                        users[nricData[users[userId]!.nric]!.manager].email
                      })`
                    : null}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-wrap">
        <Link href={{ pathname: "/admin/users/edit", query: { id: userId } }}>
          <Button className="mx-2 my-1">Edit User</Button>
        </Link>
        {role == "teacher" || role == "parent" ? (
          <Button
            className="mx-2 my-1"
            onClick={() => setViewPayments(!viewPayments)}
          >
            {viewPayments ? "Hide Payments" : "View Payments"}
          </Button>
        ) : null}
      </div>
      {payments && viewPayments
        ? Object.keys(payments).map((paymentId) => (
            <PaymentCard
              key={userId + "-" + paymentId}
              payment={{
                ...payments[paymentId],
                userId,
                paymentId,
              }}
              showUid={false}
            />
          ))
        : null}
    </div>
  );
};

export default function App() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const [showSearchGuide, setShowSearchGuide] = useState<boolean>(false);

  const [users, setUsers] = useState<any>({});
  const [roles, setRoles] = useState<any>({});
  const [nricData, setNricData] = useState<any>({});
  const [managedStudents, setManagedStudents] = useState<any>({});
  const [payments, setPayments] = useState<any>({});

  function fetchUsers() {
    if (loaded) return;
    setLoaded(true);

    onValue(ref(db, "users"), (snapshot) => {
      const data = snapshot.val();
      console.log("users", data);
      setUsers(snapshot.val() || {});
    });

    onValue(ref(db, "nric"), (snapshot) => {
      const data = snapshot.val();
      console.log("nric", data);
      setNricData(snapshot.val() || {});
    });

    onValue(ref(db, "role"), (snapshot) => {
      const data = snapshot.val();
      console.log("role", data);
      setRoles(snapshot.val() || {});
    });

    onValue(ref(db, "managedStudents"), (snapshot) => {
      const data = snapshot.val();
      console.log("managedStudents", data);
      setManagedStudents(snapshot.val() || {});
    });

    onValue(ref(db, "payments"), (snapshot) => {
      const data = snapshot.val();
      console.log("payments", data);
      setPayments(snapshot.val() || {});
    });
  }

  const router = useRouter();
  useEffect(() => {
    if (router?.query?.fetch) {
      fetchUsers();
    }
  });

  return (
    <Dashboard title="Users">
      <div className="place-content-center w-full">
        <Button
          className={"mx-auto" + (loaded ? " hidden" : "")}
          onClick={() => fetchUsers()}
        >
          Fetch All Users
        </Button>
        <div hidden={!loaded}>
          <div className="text-gray-500 text-center">
            <div hidden={Object.keys(users).length > 0}>Loading Users Data</div>
            <div hidden={Object.keys(nricData).length > 0}>
              Loading NRIC Data
            </div>
          </div>
          <TextInput
            placeholder="Search"
            inputName={null}
            props={{
              onChange: (e: any) => {
                setSearch(e.target.value);
              },
            }}
          />
          <div
            className="mx-2 text-sm underline text-blue-500 cursor-pointer hover:opacity-90"
            onClick={() => {
              setShowSearchGuide(!showSearchGuide);
            }}
          >
            Advanced Search Guide
          </div>
          <div
            className="mx-2 text-sm m-2 p-2 rounded-md border border-solid border-black"
            hidden={!showSearchGuide}
          >
            <div>
              <span className="font-mono bg-gray-200">due:true</span> shows
              teachers whose approved payments are not enough to cover the
              registration fees.
            </div>
            <div>
              <span className="font-mono bg-gray-200">
                role:student | parent | teacher | admin
              </span>{" "}
              shows users with the respective role.
            </div>
            <div>
              <span className="font-mono bg-gray-200">managerof:[nric]</span>{" "}
              shows users with [nric] as their managed student.
            </div>
            <div>
              <span className="font-mono bg-gray-200">
                searchtype:and | or | xor
              </span>{" "}
              determines the search type (default: and)
            </div>
            <div>
              <span className="font-mono bg-gray-200">not:true</span> inverts
              the search results
            </div>
          </div>
          <div className="flex flex-col">
            {Object.keys(users).map((id: string) => (
              <UserCard
                key={id}
                userId={id}
                users={users}
                nricData={nricData}
                role={roles[id]}
                managedStudents={managedStudents[id] || {}}
                payments={payments[id] || {}}
                searchKey={search}
              />
            ))}
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
