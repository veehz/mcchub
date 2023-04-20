import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { auth, db } from "@/firebase.js";
import { ref, set, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

import TextInput from "@/components/FormComponents/TextInput";
import RadioInputList from "@/components/FormComponents/RadioInputList";
import RadioInput from "@/components/FormComponents/RadioInput";
import { useRouter } from "next/router";
import InputList from "@/components/FormComponents/InputList";

import nationalities from "@/data/nationalities";

interface NRICInput {
  isMalaysian: "true" | "false";
  nric: string;
  passport: string;
}

export default function App() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<NRICInput>({
    defaultValues: {
      isMalaysian: "true",
    },
  });

  const [allowInput, setAllowInput] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | Array<string>>("");

  const isMalaysian = watch("isMalaysian", "true");

  const router = useRouter();
  const onSubmit: SubmitHandler<NRICInput> = async (data) => {
    // check if nric is taken
    setIsLoading(true);
    setAllowInput(false);

    const nric = data.nric ? data.nric.trim() : "";
    const passport = data.passport ? data.passport.trim() : "";
    const identification = isMalaysian === "true" ? nric : passport;

    if (isMalaysian === "true" && nric.length === 0) {
      setMessage("NRIC cannot be empty.");
      setIsLoading(false);
      setAllowInput(true);
      return;
    }

    if (isMalaysian === "false" && passport.length === 0) {
      setMessage("Passport number cannot be empty.");
      setIsLoading(false);
      setAllowInput(true);
      return;
    }

    onValue(
      ref(db, "nric/" + identification + "/manager"),
      async (snapshot) => {
        if (snapshot.val()) {
          setMessage(
            "NRIC/Passport is already taken. Please contact us if this is a mistake."
          );
          setIsLoading(false);
          return;
        } else {
          try {
            await set(ref(db, "managedStudents/" + auth!.currentUser!.uid + "/" + identification), "true");
            await set(
              ref(db, "nric/" + identification + "/manager"),
              auth!.currentUser!.uid
            );
            router.push("/students");
          } catch (e) {
            console.log(e);
            setMessage("An error occurred. Please try again later.");
            setIsLoading(false);
            setAllowInput(true);
          }
        }
      }
    );
  };

  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         // fetch role
  //         onValue(ref(db, "role/" + user.uid), (snapshot) => {
  //           if (snapshot.val() === "student") {
  //             router.push("/");
  //           }
  //         });
  //       }
  //     });
  //   });

  return (
    <Dashboard>
      <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8 max-w-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Add Student
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
            <InputList title="Identification">
              <RadioInputList>
                <RadioInput
                  id="malaysian"
                  value="true"
                  hook={register("isMalaysian")}
                  disabled={!allowInput}
                >
                  Malaysian
                </RadioInput>
                <RadioInput
                  id="nonmalaysian"
                  value="false"
                  hook={register("isMalaysian")}
                  disabled={!allowInput}
                >
                  Non-Malaysian
                </RadioInput>
              </RadioInputList>
              <div className="space-y-2">
                {isMalaysian === "true"
                  ? TextInput({
                      hook: register("nric", {
                        pattern: {
                          value:
                            /[0-9]{2}[0-1][0-9][0-3][0-9]-[0-1][0-9]-[0-9]{4}/,
                          message: "Invalid NRIC format.",
                        },
                      }),
                      id: "nric",
                      inputName: "NRIC",
                      placeholder: "NRIC with dashes (e.g. 031231-14-1234)",
                      disabled: !allowInput,
                      errorMsg: errors?.nric?.message,
                    })
                  : null}
                {isMalaysian === "false"
                  ? TextInput({
                      hook: register("passport"),
                      id: "nric",
                      inputName: "Passport Number",
                      placeholder: "Passport Number",
                      disabled: !allowInput,
                    })
                  : null}
              </div>
            </InputList>

            <Button
              props={{ type: "submit" }}
              isLoading={isLoading}
              disabled={!allowInput}
            >
              Add Student
            </Button>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}
