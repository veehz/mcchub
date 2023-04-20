import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import Link from "next/link";
import { auth, db } from "@/firebase.js";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { useRouter } from "next/router";

const Card = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={
        "rounded-lg overflow-hidden shadow-lg p-4 mb-4 " + (className || "")
      }
    >
      <div className="font-bold text-xl mb-2">{title}</div>
      <div className="text-gray-700 text-base">{children}</div>
    </div>
  );
};

const PartCard = ({
  title,
  children,
  splitInto,
  color,
}: {
  title: any;
  children: any;
  color?: string;
  splitInto: number;
}) => {
  const widthClass = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
  }[splitInto];
  const colorClass = {
    red: "bg-red-100",
    green: "bg-green-100",
    yellow: "bg-yellow-100",
    none: "",
  }[color || "none"];
  return (
    <div className={`${widthClass} ${colorClass} px-4 py-6`}>
      <div className="font-bold">{title}</div>
      {children}
    </div>
  );
};

export default function Home() {
  const [showVerifyEmailButton, setShowVerifyEmailButton] =
    useState<boolean>(false);
  const [showBindICButton, setShowBindICButton] = useState<boolean>(false);
  const [showCompleteProfileButton, setShowCompleteProfileButton] =
    useState<boolean>(false);

  const [role, setRole] = useState<string>("");
  const [studentCount, setStudentCount] = useState<number>(0);

  const [message, setMessage] = useState<string | string[]>([]);

  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<{
    [key: string]: number;
  }>({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user || role) return;

      if (!user!.emailVerified) {
        setShowVerifyEmailButton(true);
      } else {
        setShowVerifyEmailButton(false);
      }

      onValue(
        ref(db, "role/" + user!.uid),
        (snapshot) => {
          setRole(snapshot.val());
          if (snapshot.val() == "student") {
            // student
            onValue(
              ref(db, "users/" + user!.uid + "/nric"),
              (snapshot) => {
                if (!snapshot.exists()) setShowBindICButton(true);
              },
              { onlyOnce: true }
            );
            onValue(
              ref(db, "users/" + user!.uid + "/category"),
              (snapshot) => {
                if (!snapshot.exists()) setShowCompleteProfileButton(true);
              },
              { onlyOnce: true }
            );
          } else if (
            snapshot.val() == "teacher" ||
            snapshot.val() == "parent"
          ) {
            // manager
            onValue(
              ref(db, "managedStudents/" + user!.uid),
              (snapshot) => {
                if (snapshot.exists())
                  setStudentCount(Object.keys(snapshot.val()).length);
              },
              { onlyOnce: true }
            );
            onValue(ref(db, "payments/" + user!.uid), (snapshot) => {
              console.log("snapshot", snapshot.val());
              if (snapshot.exists()) {
                for (const key in snapshot.val()) {
                  if (snapshot.val()[key].approved)
                    setPaymentStatus((prev) => ({
                      ...prev,
                      [snapshot.val()[key].approved]:
                        parseFloat(snapshot.val()[key].amount) +
                          prev[snapshot.val()[key].approved] || 0,
                    }));
                }
              }
            });
          } else if (snapshot.val() == "admin") {
            router.push("/admin");
          }
        },
        { onlyOnce: true }
      );
    });
  });

  return (
    <Dashboard>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="w-full md:w-1/3 px-2">
          {/* content for first column */}
          {/* Todo Card */}
          <Card title="To-do">
            <div className="flex flex-col space-y-2">
              <div>
                {typeof message === "string"
                  ? message
                  : message.map((msg, index) => <div key={index}>{msg}</div>)}
              </div>
              {showVerifyEmailButton ? (
                <Button
                  onClick={() => {
                    if (auth.currentUser)
                      sendEmailVerification(auth.currentUser)
                        .then(() => {
                          setMessage("Verification email sent.");
                        })
                        .catch((error) => {
                          setMessage(error.message);
                        });
                  }}
                >
                  Verify Your Email
                </Button>
              ) : null}

              {showBindICButton ? (
                <Link href="/profile/bind-nric/">
                  <Button>Bind Your IC Number</Button>
                </Link>
              ) : null}

              {showCompleteProfileButton ? (
                <Link href="/profile">
                  <Button>Complete Your Profile</Button>
                </Link>
              ) : null}
              {!showVerifyEmailButton &&
              !showBindICButton &&
              !showCompleteProfileButton ? (
                <div className="text-green-500">All done!</div>
              ) : null}
            </div>
          </Card>

          {["teacher", "parent"].includes(role) ? (
            <Card title="Students">
              <div>
                {studentCount} {studentCount == 1 ? "student" : "students"}{" "}
              </div>
              {studentCount == 0 ? (
                <div className="text-red-500">Remember to add students!</div>
              ) : null}
              <Link href="/students">
                <Button>Add Students</Button>
              </Link>
            </Card>
          ) : null}

          <Card title="Announcements">
            This is a description of my card. It can be multiple lines long.
          </Card>
        </div>
        <div className="w-full md:w-1/3 px-2">
          {/* content for second column */}
          <Card title="Your Payments">
            <Card title="You need to pay..." className="">
              <span className="text-xl">
                {studentCount * parseFloat(process.env.NEXT_PUBLIC_REGISTRATION_FEE || "0")}
              </span>
            </Card>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg text-center">
              <div className="flex">
                <PartCard title="Accepted" splitInto={3} color="green">
                  {paymentStatus["accepted"] || 0}
                </PartCard>
                <PartCard title="Pending" splitInto={3} color="yellow">
                  {paymentStatus["pending"] || 0}
                </PartCard>
                <PartCard title="Rejected" splitInto={3} color="red">
                  {paymentStatus["rejected"] || 0}
                </PartCard>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full md:w-1/3 px-2">
          {/* content for third column */}
          <Card title="Important Links">
            This is a description of my card. It can be multiple lines long.
            <Link href="/guide">
              <Button>
                <p>Guide to use MCC Hub.</p>
                <p>This link actually works.</p>
              </Button>
            </Link>
          </Card>
          <Card title="Important Dates">
            This is a description of my card. It can be multiple lines long.
            <div className="container mx-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-left">Date</th>
                    <th className="text-left">Event Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">April 20, 2023</td>
                    <td className="border px-4 py-2">
                      MCC Registration Deadline
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">April 25, 2023</td>
                    <td className="border px-4 py-2">MCC</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">May 25, 2023</td>
                    <td className="border px-4 py-2">MCO Qualifying Rounds</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">June 25, 2023</td>
                    <td className="border px-4 py-2">
                      MCO Training Camp and MCO
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">July 25, 2023</td>
                    <td className="border px-4 py-2">APIO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
}
