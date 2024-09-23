import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { useEffect, useReducer, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { auth, db } from "@/firebase.js";
import { ref, child, update, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

import InputList from "@/components/FormComponents/InputList";
import TextInput from "@/components/FormComponents/TextInput";
import RadioInput from "@/components/FormComponents/RadioInput";
import RadioInputList from "@/components/FormComponents/RadioInputList";
import DateInput from "@/components/FormComponents/DateInput";
import Link from "next/link";
import Modal, { reducer, ModalInfo } from "@/components/Modal";
import { useRouter } from "next/router";
import config from "@/data/config";

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
  dob?: string;
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

  const [allowInput, setAllowInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, {});

  const [originalDetails, setOriginalDetails] = useState<Profile>({});
  const onSubmit: SubmitHandler<Profile> = (data) => {
    setIsLoading(true);
    setAllowInput(false);
    const updates: {
      [key: string]: string | undefined;
    } = {};
    for (const key in data) {
      if (key == "nric") continue;

      const x = key as keyof Profile;
      if ((data[x] || "") !== (originalDetails[x] || "")) {
        let value = data[x];
        updates[key as string] = value ? value : "";
      }

      // Convert billingAddress to nested object
      if (x.startsWith("billingAddress") && updates[x]) {
        let val = updates[x] as string;
        delete updates[x];
        let newKey = x.slice("billingAddress".length);
        newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
        updates["billingAddress/" + newKey] = val;
      }
    }
    console.log("updates", updates);
    update(child(ref(db), "users/" + auth.currentUser?.uid), updates)
      .then(() => {
        setIsLoading(false);
        setAllowInput(true);
        dispatch({
          hidden: false,
          title: "Profile Updated Successfully",
          children: "",
          icon: "checkmark",
          mainText: "OK",
          mainOnClick: () => {
            dispatch({ hidden: true });
            router.push("/dashboard");
          },
          mainColors: "bg-green-600",
          secondaryShow: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setAllowInput(true);
        dispatch({
          hidden: false,
          title: "Error",
          children:
            "An error occurred. Please try again later. If problem persists, please contact us.",
          icon: "error",
          mainText: "OK",
          mainOnClick: () => {
            dispatch({ hidden: true });
          },
          mainColors: "bg-red-600",
          secondaryShow: false,
        });
      });
  };

  const [runOnce, setRunOnce] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (runOnce) return;
        setRunOnce(true);

        onValue(
          ref(db, "role/" + auth.currentUser?.uid),
          (snapshot) => {
            setRole(snapshot.val());
          },
          {
            onlyOnce: true,
          }
        );

        onValue(
          child(ref(db), "users/" + auth.currentUser?.uid),
          (snapshot) => {
            setOriginalDetails(snapshot.val());
            console.log(snapshot.val());
            for (const key in snapshot.val()) {
              const x = key as keyof Profile;
              setValue(x, snapshot.val()[x]);
            }
            setAllowInput(true);
          },
          {
            onlyOnce: true,
          }
        );
      }
    });
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
        disabled={!allowInput}
        errorMsg={errorMsg}
      >
        {children}
      </TextInput>
    );
  };

  const genders = config.genders as {
    [key: string]: string;
  };
  return (
    <Dashboard title="Profile">
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
            {role == "student" &&
            Object.keys(originalDetails).length &&
            !originalDetails.nric ? (
              <Link href="/profile/bind-nric">
                <Button full={true}>
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
                  {Object.keys(genders).map((gender) => {
                    return (
                      <RadioInput
                        key={gender}
                        id={gender}
                        hook={register("gender")}
                        disabled={!allowInput}
                      >
                        {genders[gender]}
                      </RadioInput>
                    );
                  })}
                </RadioInputList>
              </InputList>

              <InputList title="Student Information" hidden={role != "student"}>
                {Input({
                  hook: register("school"),
                  id: "school",
                  placeholder: "School",
                  errorMsg: errors?.school?.message,
                })}

                <DateInput
                  hook={register("dob", {
                    validate: (value) => {
                      if (role != "student") return true;
                      if (!value || value.length < 1)
                        return "Please fill in your Date of Birth.";
                    },
                  })}
                  id="dob"
                  inputName="Date of Birth"
                  placeholder="Date of Birth"
                  errorMsg={errors?.dob?.message}
                />

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
              </InputList>

              <InputList
                title="Billing Information"
                hidden={role != "teacher" && role != "parent"}
              >
                <div className="text-sm text-center">
                  This will be written on your receipt.
                </div>
                {Input({
                  hook: register("billingMobileNumber", {
                    pattern: {
                      value: /\+?[\d ]{1,6}[- ]?[\d ]{1,15}/,
                      message: "Please enter a valid mobile number.",
                    },
                  }),
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

              <Button
                props={{ type: "submit" }}
                isLoading={isLoading}
                full={true}
              >
                Update Details
              </Button>
            </div>
          </form>
        </div>
      </div>
      {Modal(state)}
    </Dashboard>
  );
}
