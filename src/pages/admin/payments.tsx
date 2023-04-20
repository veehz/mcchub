import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref, remove, set } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from "firebase/storage";
import { useEffect, useState } from "react";

type statusType = "" | "pending" | "approved" | "rejected";
const PaymentCard = ({
  uid,
  paymentId,
  paymentStatus,
  children,
}: {
  uid: string;
  paymentId: string;
  paymentStatus: string;
  children?: React.ReactNode;
}) => {
  function makeThis(status: statusType) {
    try {
      set(ref(db, `payments/${uid}/${paymentId}/approved`), status);
      remove(ref(db, `admin/payments/${paymentStatus}/${uid}-${paymentId}`));
      set(ref(db, `admin/payments/${status}/${uid}-${paymentId}`), true);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className={"rounded-lg overflow-hidden shadow-lg p-4 mb-4 w-full"}>
      <div className="font-bold text-xl mb-2">
        {uid}: #{paymentId}
      </div>
      {/* <div className="text-gray-700 text-base mb-2">{msg}</div> */}
      <div className="flex">
        <Button
          className="w-fit mr-2"
          onClick={() => {
            onValue(
              ref(db, `payments/${uid}/${paymentId}/fileExtension`),
              (snapshot) => {
                const storage = getStorage();
                getDownloadURL(
                  storageRef(
                    storage,
                    `paymentProof/${uid}/${paymentId}.${snapshot.val()}`
                  )
                ).then((url) => {
                  window.open(url, "_blank");
                });
              }
            );
          }}
        >
          Download Payment Proof
        </Button>
        {paymentStatus == "accepted" || (
          <Button
            className="w-fit mx-2 bg-green-500"
            onClick={() => makeThis("approved")}
          >
            Approve Payment
          </Button>
        )}
        {paymentStatus == "pending" || (
          <Button
            className="w-fit mx-2 bg-yellow-500"
            onClick={() => makeThis("pending")}
          >
            Set Pending
          </Button>
        )}
        {paymentStatus == "rejected" || (
          <Button
            className="w-fit mx-2 bg-red-500"
            onClick={() => makeThis("rejected")}
          >
            Reject Payment
          </Button>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [show, setShow] = useState<statusType>("");
  const [current, setCurrent] = useState<any[]>();

  useEffect(() => {
    if (!auth.currentUser || show == "") return;
    onValue(ref(db, `admin/payments/${show}`), (snapshot) => {
      setCurrent(snapshot.val());
    });
  }, [show]);
  return (
    <Dashboard>
      <div className="flex flex-col md:flex-row md:flex-wrap">
        <Button
          className="md:w-fit md:mx-2 my-2"
          onClick={() => setShow("approved")}
        >
          Show Approved Payments
        </Button>
        <Button
          className="md:w-fit md:mx-2 my-2"
          onClick={() => setShow("pending")}
        >
          Show Pending Approval Payments
        </Button>
        <Button
          className="md:w-fit md:mx-2 my-2"
          onClick={() => setShow("rejected")}
        >
          Show Rejected Payments
        </Button>
      </div>
      <div className="m-2 font-bold text-4xl">
        {show == "approved" && "Approved Payments"}
        {show == "pending" && "Pending Approval Payments"}
        {show == "rejected" && "Rejected Payments"}
      </div>
      <div className="flex flex-wrap">
        {current
          ? Object.keys(current).map((key) => (
              <PaymentCard
                key={key}
                uid={key.split("-")[0]}
                paymentId={key.split("-")[1]}
                paymentStatus={show}
              />
            ))
          : null}
      </div>
    </Dashboard>
  );
}
