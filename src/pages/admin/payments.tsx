import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { db } from "@/firebase";
import { onValue, ref, update } from "firebase/database";
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
  const [url, setUrl] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function makeThis(status: statusType) {
    setIsLoading(true);
    try {
      const updates: {
        [key: string]: any;
      } = {};
      updates[`payments/${uid}/${paymentId}/approved`] = status;
      updates[`admin/payments/${paymentStatus}/${uid}-${paymentId}`] = null;
      updates[`admin/payments/${status}/${uid}-${paymentId}`] = true;
      await update(ref(db), updates);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
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
                  setUrl(url);
                });
              }
            );
          }}
        >
          View Payment Proof
        </Button>
        {paymentStatus == "approved" || (
          <Button
            className="w-fit mx-2 bg-green-500"
            onClick={() => makeThis("approved")}
            isLoading={isLoading}
          >
            Approve Payment
          </Button>
        )}
        {paymentStatus == "pending" || (
          <Button
            className="w-fit mx-2 bg-yellow-500"
            onClick={() => makeThis("pending")}
            isLoading={isLoading}
          >
            Set Payment as Pending
          </Button>
        )}
        {paymentStatus == "rejected" || (
          <Button
            className="w-fit mx-2 bg-red-500"
            onClick={() => makeThis("rejected")}
            isLoading={isLoading}
          >
            Reject Payment
          </Button>
        )}
      </div>
      <div className="my-4">
        {url ? <iframe src={url} width="100%" height="500px"></iframe> : null}
      </div>
    </div>
  );
};

export default function App() {
  const [approvedPayments, setApprovedPayments] = useState<any>({});
  const [pendingPayments, setPendingPayments] = useState<any>({});
  const [rejectedPayments, setRejectedPayments] = useState<any>({});
  useEffect(() => {
    onValue(ref(db, "admin/payments/approved"), (snapshot) => {
      console.log("Update: approved");
      setApprovedPayments(snapshot.val() || {});
    });
    onValue(ref(db, "admin/payments/pending"), (snapshot) => {
      console.log("Update: pending");
      setPendingPayments(snapshot.val() || {});
    });
    onValue(ref(db, "admin/payments/rejected"), (snapshot) => {
      console.log("Update: rejected");
      setRejectedPayments(snapshot.val() || {});
    });
  }, []);

  const [current, setCurrent] = useState<any>({});
  return (
    <Dashboard>
      <div className="flex flex-col md:flex-row md:flex-wrap">
        <Button
          className="md:w-fit md:mx-2 my-2"
          onClick={() => setCurrent("approved")}
        >
          Show Approved Payments
        </Button>
        <Button
          className="md:w-fit md:mx-2 my-2"
          onClick={() => setCurrent("pending")}
        >
          Show Pending Approval Payments
        </Button>
        <Button
          className="md:w-fit md:mx-2 my-2"
          onClick={() => setCurrent("rejected")}
        >
          Show Rejected Payments
        </Button>
        {Object.keys(
          current == "approved"
            ? approvedPayments
            : current == "pending"
            ? pendingPayments
            : rejectedPayments
        ).map((key) => {
          const [uid, paymentId] = key.split("-");
          return (
            <PaymentCard
              key={key}
              uid={uid}
              paymentId={paymentId}
              paymentStatus={current}
            />
          );
        })}
      </div>
    </Dashboard>
  );
}
