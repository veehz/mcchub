import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { auth, db } from "@/firebase";
import { getManagedStudents } from "@/services/storage";
import { onAuthStateChanged } from "firebase/auth";
import { child, onValue, ref, set, update } from "firebase/database";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const fetchStatusOnLoad =
  process.env["NEXT_PUBLIC_STUDENTS_FETCH_STATUS_ON_LOAD"] == "true";

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
  const [forceFetchStatus, setForceFetchStatus] =
    useState<boolean>(fetchStatusOnLoad);

  const [msg, setMsg] = useState<any>("");
  const [showButton, setShowButton] = useState<boolean>(false);

  const [studentExists, setStudentExists] = useState<boolean>(true);

  function deleteStudent() {
    if (!auth.currentUser) return; // should not happen
    if (studentExists === false) return;
    setStudentExists(false);

    set(ref(db, `nric/${nric}/manager`), null);
    set(ref(db, `managedStudents/${auth.currentUser.uid}/${nric}`), null);
  }

  useEffect(() => {
    if (studentExists === false) return;
    if (fetched.current) return;
    if (!fetchStatus && !forceFetchStatus) return;
    fetched.current = true;
    onValue(
      ref(db, "nric/" + nric),
      (snapshot) => {
        if (!snapshot.exists()) {
          deleteStudent();
          return;
        }

        if (snapshot.val().manager !== auth.currentUser?.uid) {
          deleteStudent();
          return;
        }

        if (snapshot.val().student === undefined) {
          setMsg(
            "Profile isn't bound. " +
              "Please ask your student/child to create a student account and " +
              "login to their account to bind their profile."
          );
          return;
        }

        onValue(
          ref(db, "users/" + snapshot.val().student),
          (snapshot) => {
            setShowButton(true);
            if (
              !snapshot.exists() ||
              !snapshot.val().dob ||
              !snapshot.val().name
            ) {
              setMsg(
                `Profile bound${
                  snapshot.val().name ? ` to ${snapshot.val().name}` : ""
                }, Profile isn't complete`
              );
              return;
            }
            setMsg(`Profile complete, bound to ${snapshot.val().name}`);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }, [fetchStatus, forceFetchStatus, nric]);

  return (
    <div
      className={
        "rounded-lg overflow-hidden shadow-lg p-4 mb-4" +
        (studentExists ? "" : " hidden")
      }
      onClick={() => {
        setForceFetchStatus(true);
      }}
    >
      <div className="font-bold text-xl mb-2">
        {nric.split("-").join(" - ")}
      </div>
      <div className="text-gray-700 text-base mb-2">{msg}</div>
      <Link href={`/students/edit?id=${nric}`}>
        <Button full={true} className={showButton ? "" : "hidden"}>
          Edit Profile
        </Button>
      </Link>
      <Button full={true} onClick={deleteStudent}>
        Delete Student
      </Button>
    </div>
  );
};

export default function App() {
  const [fetchStatus, setFetchStatus] = useState<boolean>(fetchStatusOnLoad);

  const [students, setStudents] = useState<any[]>([]);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
        return;
      }

      getManagedStudents(user.uid).then((students) => {
        if (students) {
          setStudents(Object.keys(students));
        }
      });
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
          className={"mx-4 my-2" + (fetchStatus ? " hidden" : "")}
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
