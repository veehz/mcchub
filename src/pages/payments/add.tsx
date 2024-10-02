import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { useReducer, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import TextInput from "@/components/FormComponents/TextInput";
import { onValue, ref, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { auth, db } from "@/firebase";
import Modal, { reducer } from "@/components/Modal";
import { useRouter } from "next/router";

import config from "@/data/config";
import regex from "@/helpers/regex";

interface PaymentInput {
  amount: string;
  proof: FileList | null;
}

function createUniqueId(): string {
  const baseChars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let num = new Date().valueOf();
  let result = "";

  // timestamp
  do {
    result = baseChars[num % 62] + result;
    num = Math.floor(num / 62);
  } while (num > 0);

  // random 5 chars
  for (let i = 0; i < 5; i++) {
    result += baseChars[Math.floor(Math.random() * 62)];
  }

  return result;
}

export default function App() {
  const [message, setMessage] = useState<string | string[]>([
    "Payment to bank:",
    ...config.bank_details,
    `Fees: ${config.currency}${config.registration_fee} per contestant`,
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allowInput, setAllowInput] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PaymentInput>();

  const file = watch("proof");

  const [state, dispatch] = useReducer(reducer, {});

  const router = useRouter();
  const onSubmit: SubmitHandler<PaymentInput> = async (data) => {
    setIsLoading(true);
    setAllowInput(false);

    const amount = data.amount ? data.amount.trim() : "";
    const proof = data.proof ? data.proof[0] : null;

    if (proof == null) return;

    onValue(
      ref(db, `payments/${auth.currentUser!.uid}`),
      (snapshot) => {
        const uniqueId = createUniqueId();
        const paymentId = snapshot.exists()
          ? Object.keys(snapshot.val()).length + 1 + 10000
          : 10001;
        const fileExtension = proof.name.split(".").pop();

        console.log(`paymentProof/${auth.currentUser!.uid}/${paymentId}-${uniqueId}.${fileExtension}`);
        const storage = storageRef(
          getStorage(),
          `paymentProof/${auth.currentUser!.uid}/${paymentId}-${uniqueId}.${fileExtension}`
        );
        uploadBytes(storage, proof)
          .then(async () => {
            try {
              const updates: {
                [key: string]: any;
              } = {};

              updates["amount"] = amount;
              updates["fileExtension"] = fileExtension;
              updates["uniqueId"] = uniqueId;

              await update(
                ref(db, `payments/${auth.currentUser!.uid}/${paymentId}`),
                updates
              );
              dispatch({
                title: "Success",
                icon: "checkmark",
                children: "Payment has been successfully uploaded.",
                hidden: false,
                mainText: "OK",
                mainColors: "bg-green-600",
                mainOnClick: () => {
                  dispatch({ hidden: true });
                  router.push("/payments");
                },
                secondaryShow: false,
              });
              setIsLoading(false);
            } catch (err) {
              console.log(err);

              dispatch({
                title: "Error.",
                icon: "error",
                children:
                  "There was an error processing your payment. Please contact us if problem persists.",
                hidden: false,
                mainText: "OK",
                mainColors: "bg-red-600",
                mainOnClick: () => {
                  dispatch({ hidden: true });
                },
                secondaryShow: false,
              });
              setAllowInput(true);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            console.log(err);
            dispatch({
              title: "Error.",
              icon: "error",
              children:
                "There was an error uploading your file. Please contact us if problem persists.",
              hidden: false,
              mainText: "OK",
              mainColors: "bg-red-600",
              mainOnClick: () => {
                dispatch({ hidden: true });
              },
              secondaryShow: false,
            });
            setAllowInput(true);
            setIsLoading(false);
          });
      },
      {
        onlyOnce: true,
      }
    );
  };

  return (
    <Dashboard title="Add Payment">
      <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8 max-w-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Add Payment
            </h2>
          </div>
          <div className="text-center text-sm">
            {typeof message === "string"
              ? message
              : message.map((msg, index) => <p key={index}>{msg}</p>)}
          </div>
          <form
            className="space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-6">
              <div>
                {TextInput({
                  inputName: `Amount (${config.currency})`,
                  placeholder: String(config.registration_fee),
                  hook: register("amount", {
                    required: "Amount is required",
                    pattern: {
                      value: regex.amount,
                      message: "Amount must be a number",
                    },
                    min: {
                      value: 1,
                      message: "Amount must be at least 1",
                    },
                  }),
                  errorMsg: errors.amount?.message,
                })}

                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="px-2 py-1">
                    Payment Proof
                  </label>
                  <div className="px-2 text-sm">{errors.proof?.message}</div>
                  {file ? (
                    <div className="px-2 text-sm">
                      Uploaded: {file[0].name}.{" "}
                      <div
                        className="inline-block font-semibold text-indigo-600 hover:text-indigo-500 hover:cursor-pointer"
                        onClick={() => setValue("proof", null)}
                      >
                        Remove
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="proof"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="proof"
                              type="file"
                              className="sr-only"
                              {...register("proof", {
                                required: "Payment proof is required",
                                validate: {
                                  lessThan3MB: (fileList) => {
                                    return (
                                      (fileList &&
                                        fileList[0].size < 3000000) ||
                                      "File must be less than 3MB"
                                    );
                                  },
                                  acceptedFormats: (fileList) =>
                                    (fileList &&
                                      [
                                        "image/png",
                                        "image/jpeg",
                                        "application/pdf",
                                      ].includes(fileList[0].type)) ||
                                    "Unsupported Format",
                                  onlyOneFile: (fileList) =>
                                    (fileList && fileList.length === 1) ||
                                    "Only one file is allowed",
                                },
                              })}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, PDF up to 3MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
            full={true}
              props={{ type: "submit" }}
              isLoading={isLoading}
              disabled={!allowInput}
            >
              Submit Payment
            </Button>
          </form>
        </div>
      </div>
      {Modal(state)}
    </Dashboard>
  );
}
