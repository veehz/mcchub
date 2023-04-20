import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from "firebase/storage";
import Link from "next/link";
import { useEffect, useState } from "react";

const PaymentCard = ({
  paymentId,
  fileExtension,
  fetchStatus,
  children,
}: {
  paymentId: string;
  fileExtension: string;
  fetchStatus?: boolean;
  children?: React.ReactNode;
}) => {
  const [fetched, setFetched] = useState<boolean>(false);
  const [color, setColor] = useState<
    "" | "bg-red-100" | "bg-yellow-100" | "bg-green-100"
  >("");
  const [msg, setMsg] = useState<any>("");

  function forceFetchStatus() {
    if (fetched) return;
    setFetched(true);
    console.log("fetching data for " + paymentId);
    onValue(
      ref(db, `payments/${auth.currentUser!.uid}/${paymentId}`),
      (snapshot) => {
        console.log(snapshot.val());
        if (!snapshot.exists()) {
          setMsg(
            "Payment isn't found. There is an error. Please contact us immediately."
          );
          setColor("bg-red-100");
          return;
        }

        if (snapshot.val().status == "pending" || !snapshot.val().status) {
          setMsg("Pending Approval.");
          setColor("bg-yellow-100");
        } else if (snapshot.val().status == "approved") {
          setMsg("Payment status is approved.");
          setColor("bg-green-100");
        } else if (snapshot.val().status == "rejected") {
          setMsg(
            "Payment status is rejected. You may contact us for more details."
          );
          setColor("bg-red-100");
        }
      },
      {
        onlyOnce: true,
      }
    );
  }
  useEffect(() => {
    if (!fetchStatus || fetched) return;
    forceFetchStatus();
  }, [fetchStatus, paymentId]);
  return (
    <div
      className={"rounded-lg overflow-hidden shadow-lg p-4 mb-4 " + color}
      onClick={() => {
        forceFetchStatus();
      }}
    >
      <div className="font-bold text-xl mb-2">#{paymentId}</div>
      <div className="text-gray-700 text-base mb-2">{msg}</div>
      <Button
        className="w-fit"
        onClick={() => {
          const storage = getStorage();
          getDownloadURL(
            storageRef(storage, `paymentProof/${auth.currentUser!.uid}/${paymentId}.${fileExtension}`)
          ).then((url) => {
            // go to url
            window.open(url, "_blank");
          });
        }}
      >
        Download Payment Proof
      </Button>
    </div>
  );
};

export default function Guide() {
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);

  const [payments, setPayments] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  onAuthStateChanged(auth, (user) => {
    if (loaded || !user) return;
    setLoaded(true);
    onValue(
      ref(db, `payments/${user.uid}`),
      (snapshot) => {
        if (snapshot.val()) {
          setPayments(
            Object.keys(snapshot.val()).map((str) => [
              str,
              snapshot.val()[str].fileExtension,
            ])
          );
        }
      },
      {
        onlyOnce: true,
      }
    );
  });

  return (
    <Dashboard>
      <div className="flex flex-wrap">
        <Link href="/payments/add">
          <Button className="mx-4 my-2 w-max text-center">
            <span className="font-extrabold">+</span>&nbsp;Add Payment
          </Button>
        </Link>
        <Button
          className="mx-4 my-2 w-max"
          onClick={() => setFetchStatus(true)}
        >
          Fetch All Payment Status
        </Button>
      </div>
      <div className="flex flex-col">
        {payments.map(([str, fe]) => (
          <div key={str} className="w-full p-4">
            <PaymentCard
              paymentId={str}
              fetchStatus={fetchStatus}
              fileExtension={fe}
            />
          </div>
        ))}
      </div>
    </Dashboard>
  );
}
