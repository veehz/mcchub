/* eslint-disable */
import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { ProfilerProps, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { auth, db } from "@/firebase.js";
import { ref, get, set, child, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

import InputList from "@/components/FormComponents/InputList";
import TextInput from "@/components/FormComponents/TextInput";
import RadioInput from "@/components/FormComponents/RadioInput";
import RadioInputList from "@/components/FormComponents/RadioInputList";
import Link from "next/link";

interface Profile {
  name?: string;

  billingMobileNumber?: string;
  billingAddressLine1?: string;
  billingAddressLine2?: string;
  billingAddressPostcode?: string;
  billingAddressCity?: string;
  billingAddressState?: string;
  billingAddressCountry?: string;

  form?: string;
  gender?: string;
  state?: string;
  country?: string;

  category?: string;

  school?: string;
  nric?: string;
}

export default function Profile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Profile>();

  const [inputLoaded, setInputLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  const [originalDetails, setOriginalDetails] = useState<Profile>({});
  const onSubmit: SubmitHandler<Profile> = (data) => {
    const updates: {
      [key: string]: string | undefined;
    } = {};
    for (const key in data) {
      if (key == "nric") continue;

      const x = key as keyof Profile;
      if ((data[x] || "") !== (originalDetails[x] || "")) {
        updates[key as string] = data[x] ? data[x] : "";
      }
    }
    update(child(ref(db), "users/" + auth.currentUser?.uid), updates);
  };

  function mySetValue(key: string, value: string | undefined) {
    if (!value) return;
    const x = key as keyof Profile;
    console.log(x, value);
    setValue(x, value);
  }

  const [runOnce, setRunOnce] = useState<boolean>(false);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (runOnce) return;
      setRunOnce(true);

      if (inputLoaded) return;
      console.log("users/" + auth.currentUser?.uid);

      await get(ref(db, "role/" + auth.currentUser?.uid)).then((snapshot) => {
        setRole(snapshot.val());
      });

      await get(child(ref(db), "users/" + auth.currentUser?.uid))
        .then((snapshot) => {
          setOriginalDetails(snapshot.val());
          console.log(snapshot.val());
          for (const key in snapshot.val()) {
            const x = key as keyof Profile;
            mySetValue(key, snapshot.val()[x]);
          }
          setInputLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  const Input = ({
    hook,
    id,
    inputName,
    placeholder,
    children,
    errorMsg,
  }: {
    hook: any;
    id?: string;
    inputName?: string;
    placeholder?: string;
    children?: React.ReactNode;
    errorMsg?: string;
  }) => {
    return (
      <TextInput
        hook={hook}
        id={id}
        inputName={inputName}
        placeholder={placeholder}
        disabled={!inputLoaded}
        errorMsg={errorMsg}
      >
        {children}
      </TextInput>
    );
  };

  return (
    <Dashboard>
      <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8 max-w-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Your Profile
            </h2>
          </div>

          <form
            className="mt-8 space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {Object.keys(originalDetails).length && !originalDetails.nric ? (
              <Link href="/profile/bind-nric">
                <Button>
                  Bind your account to an NRIC Number/Passport Number
                </Button>
              </Link>
            ) : null}
            <div className="space-y-2">
              <InputList title="Personal Information">
                {Input({
                  hook: register("name", {
                    required: "Full name is required.",
                  }),
                  id: "name",
                  placeholder: "Full Name",
                  errorMsg: errors?.name?.message,
                })}

                <RadioInputList
                  title="Gender"
                  errorMsg={errors?.gender?.message}
                >
                  <RadioInput
                    id="male"
                    hook={register("gender")}
                    disabled={!inputLoaded}
                  >
                    I am a Male
                  </RadioInput>
                  <RadioInput
                    id="female"
                    hook={register("gender")}
                    disabled={!inputLoaded}
                  >
                    I am a Female
                  </RadioInput>
                  <RadioInput
                    id="undisclosed"
                    hook={register("gender")}
                    disabled={!inputLoaded}
                  >
                    I am non-binary/I do not wish to disclose my gender
                  </RadioInput>
                </RadioInputList>
              </InputList>

              <InputList title="Student Information" hidden={role != "student"}>
                {Input({
                  hook: register("school"),
                  id: "school",
                  placeholder: "School",
                  errorMsg: errors?.school?.message,
                })}
                {Input({
                  hook: register("form", {
                    validate: (value) => {
                      if (role != "student") return true;
                      if (!value || value.length < 1)
                        return "Please fill in your form/year.";
                    },
                  }),
                  id: "name",
                  inputName: "Form/Year",
                  placeholder: "Form/Year (e.g. Form 4, Standard 6)",
                  errorMsg: errors?.form?.message,
                })}
                {Input({
                  hook: register("state"),
                  id: "state",
                  inputName: "State",
                  placeholder: "State (e.g. Kuala Lumpur)",
                  errorMsg: errors?.state?.message,
                })}
                {Input({
                  hook: register("country", {
                    validate: (value) => {
                      if (role != "student") return true;
                      if (!value || value.length < 1)
                        return "Please fill in your country.";
                    },
                  }),
                  id: "country",
                  inputName: "Country",
                  placeholder: "Country (e.g. Malaysia)",
                  errorMsg: errors?.country?.message,
                })}
                <RadioInputList
                  title="Category"
                  errorMsg={errors?.category?.message}
                >
                  <RadioInput
                    id="junior"
                    hook={register("category", {
                      validate: (value) => {
                        if (role != "student") return true;
                        if (!value || value.length < 1)
                          return "Please select a category.";
                      },
                    })}
                    disabled={!inputLoaded}
                  >
                    Bongsu/Junior - Form 1, 2, 3, or Primary School
                  </RadioInput>
                  <RadioInput
                    id="intermediate"
                    hook={register("category")}
                    disabled={!inputLoaded}
                  >
                    Muda/Intermediate - Form 4, 5
                  </RadioInput>
                  <RadioInput
                    id="senior"
                    hook={register("category")}
                    disabled={!inputLoaded}
                  >
                    Sulung/Senior - Form 6 (lower & upper), Pre-U
                    (Matriculation, Foundation Studies, IB, A-Levels, etc.)
                  </RadioInput>
                </RadioInputList>
              </InputList>

              <InputList
                title="Billing Information"
                hidden={role != "teacher" && role != "parent"}
              >
                <div className="text-sm text-center">
                  This will be written on your receipt.
                </div>
                {Input({
                  hook: register("billingMobileNumber"),
                  id: "billingMobileNumber",
                  placeholder: "Mobile Number",
                })}
                {Input({
                  hook: register("billingAddressLine1"),
                  id: "billingAddressLine1",
                  placeholder: "Address Line 1",
                })}
                {Input({
                  hook: register("billingAddressLine2"),
                  id: "billingAddressLine2",
                  placeholder: "Address Line 2",
                })}
                {Input({
                  hook: register("billingAddressPostcode"),
                  id: "billingAddressPostcode",
                  placeholder: "Postcode",
                })}
                {Input({
                  hook: register("billingAddressCity"),
                  id: "billingAddressCity",
                  placeholder: "City",
                })}
                {Input({
                  hook: register("billingAddressState"),
                  id: "billingAddressState",
                  placeholder: "State",
                })}
                {Input({
                  hook: register("billingAddressCountry"),
                  id: "billingAddressCountry",
                  placeholder: "Country",
                })}
              </InputList>

              <Button props={{ type: "submit" }} isLoading={isLoading}>
                Update Details
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}
