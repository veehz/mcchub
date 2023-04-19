import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { auth, db } from "@/firebase.js";
import { ref, get, set, child } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

import TextInput from "@/components/FormComponents/TextInput";
import RadioInputList from "@/components/FormComponents/RadioInputList";
import RadioInput from "@/components/FormComponents/RadioInput";

interface NRICInput {
  isMalaysian: "null" | "true" | "false";
  nationality: string;
  nric: string;
  passport: string;
}

export default function Profile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<NRICInput>();

  const [inputLoaded, setInputLoaded] = useState<boolean>(false);
  const [allowInput, setAllowInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | Array<string>>("");

  const isMalaysian = watch("isMalaysian", "null");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit: SubmitHandler<NRICInput> = async (data) => {
    // check if nric is taken
    setIsLoading(true);
    setAllowInput(false);

    const nric = data.nric ? data.nric.trim() : "";
    const nat = data.nationality ? data.nationality.trim() : "";
    const passport = data.passport ? data.passport.trim() : "";

    if (isMalaysian === "null") {
      setMessage("Please select your nationality.");
      setIsLoading(false);
      setAllowInput(true);
      return;
    }

    if (isMalaysian === "true" && nric.length === 0) {
      setMessage("NRIC cannot be empty.");
      setIsLoading(false);
      setAllowInput(true);
      return;
    }

    if (isMalaysian === "false" && nat.length === 0) {
      setMessage("Nationality cannot be empty.");
      setIsLoading(false);
      setAllowInput(true);
      return;
    }

    if (isMalaysian === "false" && passport.length === 0) {
      setMessage("Passport cannot be empty.");
      setIsLoading(false);
      setAllowInput(true);
      return;
    }

    const identification = isMalaysian === "true" ? nric : passport;

    const NRICData = await get(
      child(ref(db), "nric/" + identification + "/student")
    );
    if (NRICData.val()) {
      setMessage(
        "NRIC/Passport is already taken. Please contact us if this is a mistake."
      );
      setIsLoading(false);
      return;
    }

    setSubmitted(true);
    await set(
      ref(db, "users/" + auth.currentUser?.uid + "/nationality"),
      isMalaysian === "true" ? "Malaysian" : nat
    );
    await set(ref(db, "users/" + auth.currentUser?.uid + "/nric"), identification);
    await set(ref(db, "nric/" + identification + "/student"), auth.currentUser?.uid);

    setMessage("NRIC/Passport is successfully bound.");
    setIsLoading(false);

    setAllowInput(false);
  };

  onAuthStateChanged(auth, async (user) => {
    if (submitted) return;
    if (user) {
      if (inputLoaded) return;
      setInputLoaded(true);
      const nric = (await get(ref(db, "users/" + user.uid + "/nric"))).val();

      if (nric) {
        const userIsMalaysian = (await get(ref(db, "users/" + user.uid + "/nationality"))).val() === "Malaysian";
        setValue("isMalaysian", userIsMalaysian ? "true" : "false");
        if (userIsMalaysian) setValue("nric", nric);
        else setValue("passport", nric);
        setMessage([
          "An indentification is already bound to your account.",
          "If you want to change your identification, please contact us.",
        ]);
        return;
      }

      const role = await get(ref(db, "role/" + user.uid));
      if (role.val() === "student") {
        setAllowInput(true);
        setMessage([
          "You can bind your identification only once.",
          "Please check before submitting.",
        ]);
      } else {
        setMessage([
          "You are not a student. You don't have to bind your IC number.",
          "Please contact us if this is a mistake.",
        ]);
      }
    }
  });
  return (
    <Dashboard>
      <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8 max-w-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Bind NRIC/Passport Number
            </h2>
          </div>
          <div className="text-center text-sm">
            {typeof message === "string"
              ? message
              : message.map((msg, index) => <p key={index}>{msg}</p>)}
          </div>
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

          <form
            className="space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-2">
              {isMalaysian === "false"
                ? TextInput({
                    hook: register("nationality"),
                    id: "nationality",
                    inputName: "Nationality",
                    placeholder: "Nationality (e.g. Korean)",
                    disabled: !allowInput,
                  })
                : null}
              {isMalaysian === "true"
                ? TextInput({
                    hook: register("nric", {
                      pattern: {
                        value: /[0-9]{2}[0-1][0-9][0-3][0-9]-[0-1][0-9]-[0-9]{4}/,
                        message: "Invalid NRIC format.",
                      }
                    }),
                    id: "nric",
                    inputName: "NRIC",
                    placeholder: "NRIC with dashes (e.g. 031231-14-1234)",
                    disabled: !allowInput,
                    errorMsg: errors?.nric?.message
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

              <Button
                props={{ type: "submit" }}
                isLoading={isLoading}
                disabled={!allowInput}
              >
                Bind NRIC
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}
