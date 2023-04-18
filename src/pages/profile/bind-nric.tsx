import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { auth, db } from "@/firebase.js";
import { ref, get, set, child } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

import TextInput from "@/components/FormComponents/TextInput";

interface NRICInput {
  nric: string;
}

export default function Profile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NRICInput>();

  const [inputLoaded, setInputLoaded] = useState<boolean>(false);
  const [allowInput, setAllowInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | Array<string>>("");

  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit: SubmitHandler<NRICInput> = async (data) => {
    // check if nric is taken
    setIsLoading(true);

    const nric = data.nric.trim();

    if(!nric){
      setMessage("NRIC cannot be empty.");
      setIsLoading(false);
      return;
    }

    const NRICData = await get(child(ref(db), "nric/" + nric + "/student"));
    if (NRICData.val()) {
      setMessage(
        "NRIC is already taken. Please contact us if this is a mistake."
      );
      setIsLoading(false);
      return;
    }

    setSubmitted(true);
    await set(ref(db, "users/" + auth.currentUser?.uid + "/nric"), nric);
    await set(ref(db, "nric/" + nric + "/student"), auth.currentUser?.uid);

    setMessage("NRIC is successfully bound.");
    setIsLoading(false);

    setAllowInput(false);
  };

  onAuthStateChanged(auth, async (user) => {
    if (submitted) return;
    if (user) {
      if (inputLoaded) return;
      const userData = await get(child(ref(db), "users/" + user.uid));
      if (userData.val().nric) {
        setValue("nric", userData.val().nric);
        setMessage([
          "An NRIC is already bound to your account.",
          "If you want to change your NRIC, please contact us.",
        ]);
        return;
      }

      const role = await get(ref(db, "role/" + user.uid));
      if (role.val() === "student") {
        setAllowInput(true);
        setMessage([
          "You can bind your NRIC only once.",
          "Please check before submitting.",
          "If you are a Malaysian, please fill in your NRIC (with dashes).",
          "Otherwise, fill in your passport number.",
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
              : message.map((msg) => <p>{msg}</p>)}
          </div>
          <form
            className="space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-2">
              <TextInput
                hook={register("nric")}
                id="nric"
                inputName="NRIC/Passport Number"
                placeholder="NRIC/Passport Number (e.g. 031231-14-1234)"
                disabled={!allowInput}
              />

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
