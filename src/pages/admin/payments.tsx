import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import config from "@/data/config";
import { auth, db } from "@/firebase";
import { onValue, ref, set } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
} from "firebase/storage";
import { useEffect, useState } from "react";

type statusType = "" | "pending" | "approved" | "rejected";
export const PaymentCard = ({
  payment,
  showUid = true,
}: {
  payment: {
    [key: string]: any;
  };
  showUid?: boolean;
}) => {
  const { userId: uid, paymentId } = payment;
  const paymentStatus = payment?.approved?.status || "pending";
  const [url, setUrl] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [viewPaymentProof, setViewPaymentProof] = useState<boolean>(false);

  async function makeThis(status: statusType) {
    setIsLoading(true);
    try {
      await set(ref(db, `payments/${uid}/${paymentId}/approved`), {
        status,
        by: auth.currentUser!.uid,
      });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  return (
    <div className={"rounded-lg overflow-hidden shadow-lg p-4 mb-4 w-full"}>
      <div className="font-bold text-xl mb-2">
        {showUid ? `${uid}: ` : null} #{paymentId}
      </div>
      <div className="text-gray-700 text-base mb-2">
        Payment of: {config.currency}{payment?.amount}{" "}
      </div>
      {/* <div className="text-gray-700 text-base mb-2">{msg}</div> */}
      <div className="flex">
        <Button
          className="mx-2 my-1"
          onClick={() => {
            const storage = getStorage();
            if (!url) {
              getDownloadURL(
                storageRef(
                  storage,
                  `paymentProof/${uid}/${paymentId}-${payment.uniqueId}.${payment.fileExtension}`
                )
              ).then((url) => {
                setUrl(url);
              });
            }

            setViewPaymentProof(!viewPaymentProof);
          }}
        >
          {viewPaymentProof ? "Hide" : "View"} Payment Proof
        </Button>
        <Button
          className="mx-2 my-1"
          onClick={() => {
            const storage = getStorage();
            getDownloadURL(
              storageRef(
                storage,
                `paymentProof/${uid}/${paymentId}-${payment.uniqueId}.${payment.fileExtension}`
              )
            ).then((url) => {
              window.open(url, "_blank");
            });
          }}
        >
          Download Payment Proof
        </Button>
        {paymentStatus == "approved" || (
          <Button
            className="mx-2 my-1 bg-green-500"
            onClick={() => makeThis("approved")}
            isLoading={isLoading}
          >
            Approve Payment
          </Button>
        )}
        {paymentStatus == "pending" || (
          <Button
            className="mx-2 my-1 bg-yellow-500"
            onClick={() => makeThis("pending")}
            isLoading={isLoading}
          >
            Set Payment as Pending
          </Button>
        )}
        {paymentStatus == "rejected" || (
          <Button
            className="mx-2 my-1 bg-red-500"
            onClick={() => makeThis("rejected")}
            isLoading={isLoading}
          >
            Reject Payment
          </Button>
        )}
      </div>
      <div className="my-4">
        {url && viewPaymentProof ? (
          <iframe src={url} width="100%" height="500px"></iframe>
        ) : null}
      </div>
    </div>
  );
};

export default function App() {
  const [payments, setPayments] = useState<any>({});
  useEffect(() => {
    onValue(ref(db, "payments"), (snapshot) => {
      const current: {
        [key: string]: any[];
      } = {
        approved: [],
        pending: [],
        rejected: [],
      };
      console.log("Update: payments", snapshot.val());
      if (!snapshot.val()) return current;
      for (const userId in snapshot.val()) {
        for (const paymentId in snapshot.val()[userId]) {
          const payment = snapshot.val()[userId][paymentId];
          if (!payment?.approved?.status)
            current.pending.push({
              ...payment,
              userId,
              paymentId,
            });
          else
            current[payment.approved.status].push({
              ...payment,
              userId,
              paymentId,
            });
        }
      }
      setPayments(current);
    });
  }, []);

  const [current, setCurrent] = useState<string>("");
  return (
    <Dashboard title="Payments">
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
        {current
          ? payments[current]?.map((payment: any) => {
              const { userId, paymentId } = payment;
              return (
                <PaymentCard key={userId + "-" + paymentId} payment={payment} />
              );
            })
          : null}
      </div>
    </Dashboard>
  );
}
