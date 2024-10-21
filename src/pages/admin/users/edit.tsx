import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { useEffect, useReducer, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { auth, db } from "@/firebase.js";
import { ref, child, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

import InputList from "@/components/FormComponents/InputList";
import TextInput from "@/components/FormComponents/TextInput";
import RadioInput from "@/components/FormComponents/RadioInput";
import RadioInputList from "@/components/FormComponents/RadioInputList";
import Link from "next/link";
import Modal, { reducer, ModalInfo } from "@/components/Modal";
import { useRouter } from "next/router";
import config from "@/data/config";
import { getRole, getUserDetails } from "@/services/storage";

interface Profile {
  name?: string;
  email?: string;

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

export default function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Profile>();

  const [userId, setUserId] = useState<string>("");

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
        updates[key as string] = data[x] ? data[x] : "";
      }
    }
    update(child(ref(db), "users/" + userId), updates)
      .then(() => {
        setIsLoading(false);
        setAllowInput(true);
        dispatch({
          hidden: false,
          title: "Profile Updated Successfully",
          icon: "checkmark",
          mainText: "OK",
          mainOnClick: () => {
            dispatch({ hidden: true });
            router.push({
              pathname: "/admin/users",
              query: { fetch: true },
            });
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
    // get user id from router
    onAuthStateChanged(auth, async (user) => {
      if (user && router?.query?.id) {
        if (runOnce) return;
        setRunOnce(true);

        const { id } = router.query;
        if (!id) {
          return;
        } else {
          setUserId(id as string);
        }

        getRole(id as string).then((role) => {
          setRole(role!);
        });

        getUserDetails(id as string).then((details) => {
          setOriginalDetails(details);
          console.log(details);
          for (const key in details) {
            const x = key as keyof Profile;
            setValue(x, details[x]);
          }
          setAllowInput(true);
        });
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
    <Dashboard title="Edit Profile">
      <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8 max-w-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Editing Profile: {originalDetails.email}
            </h2>
          </div>
          <form
            className="mt-8 space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {role == "student" && (
              <Link
                href={{
                  pathname: "/admin/users/edit-nric",
                  query: { id: userId },
                }}
              >
                <Button full={true}>Edit NRIC</Button>
              </Link>
            )}
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
                    disabled={!allowInput}
                  >
                    Bongsu/Junior - Form 1, 2, 3, or Primary School
                  </RadioInput>
                  <RadioInput
                    id="intermediate"
                    hook={register("category")}
                    disabled={!allowInput}
                  >
                    Muda/Intermediate - Form 4, 5
                  </RadioInput>
                  <RadioInput
                    id="senior"
                    hook={register("category")}
                    disabled={!allowInput}
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
