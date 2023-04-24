import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { auth, db } from "@/firebase.js";
import { ref, set, onValue, update, child } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

import TextInput from "@/components/FormComponents/TextInput";
import RadioInputList from "@/components/FormComponents/RadioInputList";
import RadioInput from "@/components/FormComponents/RadioInput";

import { useRouter } from "next/router";
import InputList from "@/components/FormComponents/InputList";

interface StudentProfile {
  name?: string;

  form?: string;
  gender?: string;
  state?: string;
  country?: string;

  category?: string;

  school?: string;
}

export default function App() {
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<StudentProfile>();

  const [allowInput, setAllowInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [studentUid, setStudentUid] = useState<string>("");

  const [studentId, setStudentId] = useState<string>("");

  const [message, setMessage] = useState<string>("");

  const [originalDetails, setOriginalDetails] = useState<StudentProfile>({});

  const onSubmit: SubmitHandler<StudentProfile> = (data) => {
    setIsLoading(true);
    setAllowInput(false);
    const updates: {
      [key: string]: string | undefined;
    } = {};
    for (const key in data) {
      if (key == "nric") continue;

      const x = key as keyof StudentProfile;
      if ((data[x] || "") !== (originalDetails[x] || "")) {
        updates[key as string] = data[x] ? data[x] : "";
      }
    }

    update(child(ref(db), "users/" + studentUid), updates)
      .then(() => {
        setIsLoading(false);
        setAllowInput(true);
        setMessage("Profile updated successfully.");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setAllowInput(true);
        setMessage("An error occurred. Please try again later.");
      });
  };

  const [runOnce, setRunOnce] = useState<boolean>(false);
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const { id } = router.query;
      if (!id) return;

      if (runOnce) return;
      setRunOnce(true);
      setStudentId(id as string);
      onValue(
        ref(db, `nric/${id}/student`),
        (snapshot) => {
          const uid = snapshot.val();
          setStudentUid(uid);

          onValue(
            child(ref(db), "users/" + uid),
            (snapshot) => {
              setOriginalDetails(snapshot.val());
              console.log(snapshot.val());
              for (const key in snapshot.val()) {
                if (
                  ![
                    "name",
                    "form",
                    "gender",
                    "state",
                    "country",
                    "category",
                    "school",
                  ].includes(key)
                )
                  continue;
                const x = key as keyof StudentProfile;
                setValue(x, snapshot.val()[x]);
              }
              setAllowInput(true);
            },
            {
              onlyOnce: true,
            }
          );
        },
        {
          onlyOnce: true,
        }
      );
    }
  });

  const Input = ({
    hook,
    id,
    inputName,
    placeholder,
    children,
    disabled,
    errorMsg,
  }: {
    hook?: any;
    id?: string;
    inputName?: string;
    placeholder?: string;
    children?: React.ReactNode;
    disabled?: boolean;
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

  return (
    <Dashboard title="Edit Student Profile">
      <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8 max-w-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Student Profile
            </h2>
          </div>

          <div>{message}</div>

          <form
            className="mt-8 space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="space-y-2">
              <InputList title="Identification">
                {Input({
                  id: "nric",
                  inputName: "NRIC/Passport Number",
                  placeholder: studentId,
                  disabled: true,
                })}
              </InputList>
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
                    disabled={!allowInput}
                  >
                    Male
                  </RadioInput>
                  <RadioInput
                    id="female"
                    hook={register("gender")}
                    disabled={!allowInput}
                  >
                    Female
                  </RadioInput>
                  <RadioInput
                    id="undisclosed"
                    hook={register("gender")}
                    disabled={!allowInput}
                  >
                    Non-binary/Undisclosed
                  </RadioInput>
                </RadioInputList>
              </InputList>

              <InputList title="Student Information">
                {Input({
                  hook: register("school"),
                  id: "school",
                  placeholder: "School",
                  errorMsg: errors?.school?.message,
                })}
                {Input({
                  hook: register("form", {
                    validate: (value) => {
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

              <Button props={{ type: "submit" }} isLoading={isLoading} full={true}>
                Update Details
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}
