import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const StudentCard = ({
  nric,
  fetchStatus,
  children,
}: {
  nric: string;
  fetchStatus?: boolean;
  children?: React.ReactNode;
}) => {
  const fetched = useRef<boolean>(false);
  const [forceFetchStatus, setForceFetchStatus] = useState<boolean>(false);

  const [msg, setMsg] = useState<any>("");
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    if (fetched.current) return;
    if (!fetchStatus && !forceFetchStatus) return;
    fetched.current = true;
    onValue(
      ref(db, "nric/" + nric + "/student"),
      (snapshot) => {
        if (!snapshot.exists()) {
          setMsg("Profile isn't bound");
          return;
        }
        onValue(
          ref(db, "users/" + snapshot.val() + "/category"),
          (snapshot) => {
            setShowButton(true);
            if (!snapshot.exists()) {
              setMsg("Profile bound, Profile isn't complete");
              return;
            }
            setMsg(
              "Profile complete. Student in " + snapshot.val() + " category"
            );
          },
          {
            onlyOnce: true,
          }
        );
      },
      {
        onlyOnce: true,
      }
    );
  }, [fetchStatus, forceFetchStatus, nric]);

  return (
    <div
      className={"rounded-lg overflow-hidden shadow-lg p-4 mb-4"}
      onClick={() => {
        setForceFetchStatus(true);
      }}
    >
      <div className="font-bold text-xl mb-2">
        {nric.split("-").join(" - ")}
      </div>
      <div className="text-gray-700 text-base mb-2">{msg}</div>
      <Link href={`/students/edit?id=${nric}`}>
        <Button full={true} className={showButton ? "" : "hidden"}>Edit Profile</Button>
      </Link>
    </div>
  );
};

export default function App() {
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);

  const [students, setStudents] = useState<any[]>([]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(!user) return;
      onValue(
        ref(db, "managedStudents/" + user.uid),
        (snapshot) => {
          if (snapshot.val()) {
            setStudents(Object.keys(snapshot.val()));
          }
        },
        {
          onlyOnce: true,
        }
      );
    });
  }, []);

  return (
    <Dashboard title="Students">
      <div className="flex flex-wrap">
        <Link href="/students/add">
          <Button className="mx-4 my-2 text-center">
            <span className="font-extrabold">+</span>&nbsp;Add Student
          </Button>
        </Link>
        <Button
          className="mx-4 my-2"
          onClick={() => setFetchStatus(true)}
        >
          Fetch All Student Status
        </Button>
      </div>
      <div className="flex flex-wrap">
        {students.map((str) => (
          <div key={str} className="w-72 p-4">
            <StudentCard nric={str} fetchStatus={fetchStatus}></StudentCard>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}
