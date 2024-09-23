import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import config from "@/data/config";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from "firebase/storage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const PaymentCard = ({
  payment,
  paymentId,
}: {
  payment: any;
  paymentId: string;
}) => {
  const [url, setUrl] = useState<any>(null);
  const color = useRef<"" | "bg-red-100" | "bg-yellow-100" | "bg-green-100">(
    ""
  );
  // const [msg, setMsg] = useState<any>("");
  const msg = useRef<string>("");

  if (!payment?.approved?.status || payment.approved.status == "pending") {
    msg.current = "Pending Approval.";
    color.current = "bg-yellow-100";
  } else if (payment.approved.status == "approved") {
    msg.current = "Payment status is approved.";
    color.current = "bg-green-100";
  } else if (payment.approved.status == "rejected") {
    msg.current =
      "Payment status is rejected. You may contact us for more details.";
    color.current = "bg-red-100";
  }

  return (
    <div
      className={
        "rounded-lg overflow-hidden shadow-lg p-4 mb-4 " + color.current
      }
    >
      <div className="font-bold text-xl mb-2">#{paymentId} ({config.currency}{payment.amount})</div>
      <div className="text-gray-700 text-base mb-2">{msg.current}</div>
      <Button
        onClick={() => {
          const storage = getStorage();
          getDownloadURL(
            storageRef(
              storage,
              `paymentProof/${auth.currentUser!.uid}/${paymentId}-${
                payment.uniqueId
              }.${payment.fileExtension}`
            )
          ).then((url) => {
            setUrl(url);
          });
        }}
      >
        View Payment Proof
      </Button>
      <div className="my-4">
        {url ? <iframe src={url} width="100%" height="500px"></iframe> : null}
      </div>
    </div>
  );
};

export default function App() {
  const [payments, setPayments] = useState<{
    [key: string]: any;
  }>({});
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(!user) return;
      onValue(
        ref(db, `payments/${user.uid}`),
        (snapshot) => {
          setPayments(snapshot.val() || {});
        },
        {
          onlyOnce: true,
        }
      );
    });
  }, []);

  return (
    <Dashboard title="Payments">
      <div className="flex flex-wrap">
        <Link href="/payments/add">
          <Button className="mx-4 my-2 text-center">
            <span className="font-extrabold">+</span>&nbsp;Add Payment
          </Button>
        </Link>
      </div>
      <div className="flex flex-col">
        {Object.keys(payments).map((id) => (
          <div key={id} className="w-full p-4">
            <PaymentCard payment={payments[id]} paymentId={id} />
          </div>
        ))}
      </div>
    </Dashboard>
  );
}
