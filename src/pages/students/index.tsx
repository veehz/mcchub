import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import Link from "next/link";
import { useEffect, useState } from "react";

const StudentCard = ({
  nric,
  fetchStatus,
  children,
}: {
  nric: string;
  fetchStatus?: boolean;
  children?: React.ReactNode;
}) => {
  const [msg, setMsg] = useState<any>("");
  useEffect(() => {
    if (!fetchStatus) return;
    console.log("fetching data for " + nric);
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
  }, [fetchStatus, nric]);
  return (
    <div className={"rounded-lg overflow-hidden shadow-lg p-4 mb-4"}>
      <div className="font-bold text-xl mb-2">{nric.split("-").join(" - ")}</div>
      <div className="text-gray-700 text-base">
        {msg}
      </div>
    </div>
  );
};

const CardList = ({ fetchStatus = false }: { fetchStatus: boolean }) => {
  const [students, setStudents] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  onAuthStateChanged(auth, (user) => {
    if(loaded || !user) return;
    setLoaded(true);
    onValue(
      ref(db, "managedStudents/" + auth!.currentUser!.uid),
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

  return (
    <div className="flex flex-wrap">
      {students.map((str) => (
        <div key={str} className="w-72 p-4">
          <StudentCard
            nric={str}
            fetchStatus={fetchStatus}
          ></StudentCard>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);

  return (
    <Dashboard>
      <div className="flex flex-wrap">
        <Link href="/students/add">
          <Button className="mx-4 my-2 w-max text-center">
            <span className="font-extrabold">+</span>&nbsp;Add Student
          </Button>
        </Link>
        <Button
          className="mx-4 my-2 w-max"
          onClick={() => setFetchStatus(true)}
        >
          Fetch Student Status
        </Button>
      </div>
      <CardList fetchStatus={fetchStatus} />
    </Dashboard>
  );
}
