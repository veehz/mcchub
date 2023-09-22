import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import Link from "next/link";
import { auth, db } from "@/firebase.js";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { useRouter } from "next/router";

import { ContestInfo } from "@/data/ContestInfo";
import {
  getContestInfo,
  getManagedStudentsCount,
  getPayments,
  getRole,
  getUser,
  getUserDetails,
} from "@/services/storage";

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
  const [message, setMessage] = useState<string | string[]>([]);
  const [showVerifyEmailButton, setShowVerifyEmailButton] =
    useState<boolean>(false);
  const [disableVerifyEmailButton, setDisableVerifyEmailButton] =
    useState<boolean>(false);
  const [showBindICButton, setShowBindICButton] = useState<boolean>(false);
  const [showCompleteProfileButton, setShowCompleteProfileButton] =
    useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [studentCount, setStudentCount] = useState<number>(0);

  const [contestInfo, setContestInfo] = useState<ContestInfo>({
    announcements: {},
  });

  const router = useRouter();
  const [payments, setPayments] = useState<any>([]);

  useEffect(() => {
    getUser().then(async (user) => {
      if (!user) router.push("/");

      getRole((role) => {
        if (role == "admin") router.push("/admin");
        setRole(role);

        getUserDetails((userDetails) => {
          if (!userDetails.nric && role == "student") {
            setShowBindICButton(true);
          }
          if (!userDetails.name) {
            setShowCompleteProfileButton(true);
          }
        });
      });

      getContestInfo((contestInfo) => {
        setContestInfo(contestInfo);
      });

      if (!user!.emailVerified) {
        setShowVerifyEmailButton(true);
      }

      getManagedStudentsCount((count) => {
        console.log(count);
        setStudentCount(count);
      });

      getPayments((payments) => {
        const paymentsArray = [];
        if (payments) {
          for (const paymentId in payments) {
            paymentsArray.push({
              ...payments[paymentId],
              paymentId,
            });
          }
        }
        setPayments(paymentsArray);
      });
    });
  }, []);

  return (
    <Dashboard title="Dashboard">
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
                  full={true}
                  disabled={disableVerifyEmailButton}
                  onClick={() => {
                    if (auth.currentUser)
                      sendEmailVerification(auth.currentUser)
                        .then(() => {
                          setMessage("Verification email sent.");
                        })
                        .catch((error) => {
                          setMessage(error.message);
                        })
                        .finally(() => {
                          setDisableVerifyEmailButton(true);
                        });
                  }}
                >
                  Verify Your Email
                </Button>
              ) : null}

              {showBindICButton ? (
                <Link href="/profile/bind-nric/">
                  <Button full={true}>Bind Your IC Number</Button>
                </Link>
              ) : null}

              {showCompleteProfileButton ? (
                <Link href="/profile">
                  <Button full={true}>Complete Your Profile</Button>
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
                <Button full={true}>Add Students</Button>
              </Link>
            </Card>
          ) : null}

          {["teacher", "parent"].includes(role) &&
          contestInfo?.registrationDeadline ? (
            <Card title="Registration Deadline">
              {new Date(contestInfo.registrationDeadline).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </Card>
          ) : null}
          <Card title="Announcements">
            {contestInfo?.announcements?.length > 0
              ? Object.keys(contestInfo.announcements).map((key) => (
                  <div key={key}>{contestInfo.announcements[key]}</div>
                ))
              : "Any announcements will appear here."}
          </Card>
        </div>
        <div className="w-full md:w-1/3 px-2">
          {/* content for second column */}
          <Card title="Your Payments">
            <Card title="You need to pay..." className="">
              <span className="text-xl">
                {studentCount *
                  parseFloat(process.env.NEXT_PUBLIC_REGISTRATION_FEE || "0")}
              </span>
            </Card>
            <div>
              {/* Table with three columns */}
              <div className="container mx-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Payment ID</th>
                      <th className="text-left">Amount</th>
                      <th className="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments
                      ? payments.map((payment: any) => (
                          <tr key={payment.paymentId}>
                            <td className="border px-4 py-2">
                              {payment.paymentId}
                            </td>
                            <td className="border px-4 py-2">
                              {payment.amount}
                            </td>
                            <td className="border px-4 py-2">
                              {payment.approved
                                ? payment.approved.status
                                : "pending"}
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full md:w-1/3 px-2">
          {/* content for third column */}
          <Card title="Important Links">
            {/* button link to https://ioimalaysia.org/ */}
            <Button
              full={true}
              onClick={() => {
                window.open("https://ioimalaysia.org/", "_blank");
              }}
            >
              Malaysia Informatics and Programming Society (MIPS) Website
            </Button>
          </Card>
          {contestInfo?.informationTitle ? (
            <Card title={contestInfo.informationTitle}>
              {contestInfo.information}
            </Card>
          ) : null}
        </div>
      </div>
    </Dashboard>
  );
}
