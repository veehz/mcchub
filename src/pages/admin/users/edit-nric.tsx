import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { useEffect, useReducer, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { auth, db } from "@/firebase.js";
import { ref, set, onValue, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

import TextInput from "@/components/FormComponents/TextInput";
import RadioInputList from "@/components/FormComponents/RadioInputList";
import RadioInput from "@/components/FormComponents/RadioInput";

import nationalities from "@/data/nationalities";
import Modal, { ModalInfo, reducer } from "@/components/Modal";
import { useRouter } from "next/router";
import { setOriginalNode } from "typescript";
import regex from "@/helpers/regex";

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
  } = useForm<NRICInput>({
    defaultValues: {
      isMalaysian: "null",
    },
  });

  const [inputLoaded, setInputLoaded] = useState<boolean>(false);
  const [allowInput, setAllowInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | Array<string>>("");

  const isMalaysian = watch("isMalaysian");
  const [bound, setBound] = useState<boolean>(false);
  const [boundNRIC, setBoundNRIC] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [state, dispatch] = useReducer(reducer, {});
  const errorModal: ModalInfo = {
    title: "Error.",
    icon: "error",
    children: "There was an error. Please contact us if problem persists.",
    hidden: false,
    mainText: "OK",
    mainColors: "bg-red-600",
    mainOnClick: () => {
      dispatch({ hidden: true });
    },
    secondaryShow: false,
  };

  const router = useRouter();
  const onSubmit: SubmitHandler<NRICInput> = async (data) => {
    // check if nric is taken
    setIsLoading(true);
    setAllowInput(false);

    const nric = data.nric ? data.nric.trim() : "";
    const nat = data.nationality ? data.nationality.trim() : "";
    const passport = data.passport ? data.passport.trim() : "";

    if (isMalaysian === "null") {
      dispatch({
        ...errorModal,
        children: "Please select user nationality.",
      });
      setIsLoading(false);
      setAllowInput(true);
      return;
    }

    if (isMalaysian === "true" && nric.length === 0) {
      dispatch({
        ...errorModal,
        children: "Please enter user NRIC.",
      });
      setIsLoading(false);
      setAllowInput(true);
      return;
    }

    if (isMalaysian === "false" && nat.length === 0) {
      dispatch({
        ...errorModal,
        children: "Please select user nationality.",
      });
      setIsLoading(false);
      setAllowInput(true);
      return;
    }

    if (isMalaysian === "false" && passport.length === 0) {
      dispatch({
        ...errorModal,
        children: "Please enter user passport number.",
      });
      setIsLoading(false);
      setAllowInput(true);
      return;
    }

    const identification = isMalaysian === "true" ? nric : passport;

    onValue(
      ref(db, "nric/" + identification + "/student"),
      async (snapshot) => {
        if (snapshot.val()) {
          dispatch({
            ...errorModal,
            children:
              "NRIC/Passport Number is already taken. Please contact us if this is a mistake.",
          });
          setIsLoading(false);
          return;
        } else {
          setSubmitted(true);
          try {
            await set(
              ref(db, "users/" + userId + "/nationality"),
              isMalaysian === "true" ? "Malaysian" : nat
            );
            await set(ref(db, "users/" + userId + "/nric"), identification);
            await set(ref(db, "nric/" + identification + "/student"), userId);
            setBoundNRIC(identification);
            dispatch({
              title: "Success!",
              icon: "checkmark",
              children: "Profile is successfully bound.",
              hidden: false,
              mainText: "OK",
              mainColors: "bg-green-600",
              mainOnClick: () => {
                dispatch({ hidden: true });
                router.reload();
              },
              secondaryShow: false,
            });

            setBound(true);
            setIsLoading(false);
            setAllowInput(false);
          } catch (e) {
            dispatch({
              ...errorModal,
              children:
                "There was an error. Please contact us if problem persists.",
            });
            setIsLoading(false);
            setAllowInput(true);
            return;
          }
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  const [userId, setUserId] = useState<string>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (submitted) return;
      if (user && router?.query?.id) {
        if (inputLoaded) return;
        setInputLoaded(true);

        const { id } = router.query;
        if (!id) {
          return;
        } else {
          setUserId(id as string);
        }

        onValue(
          ref(db, "role/" + id),
          (snapshot) => {
            setRole(snapshot.val());
          },
          {
            onlyOnce: true,
          }
        );

        onValue(
          ref(db, "users/" + id + "/nric"),
          (snapshot) => {
            const nric = snapshot.val();
            setBoundNRIC(nric);
            if (nric) {
              setBound(true);
              onValue(
                ref(db, "users/" + id + "/nationality"),
                (snapshot) => {
                  setValue("nationality", snapshot.val());
                  const userIsMalaysian = snapshot.val() === "Malaysian";
                  setValue("isMalaysian", userIsMalaysian ? "true" : "false");
                  if (userIsMalaysian) setValue("nric", nric);
                  else setValue("passport", nric);
                  setMessage([
                    "An indentification is already bound to user account.",
                    "If you want to change user identification, please contact us.",
                  ]);
                },
                {
                  onlyOnce: true,
                }
              );
            } else {
              setBound(false);
              onValue(ref(db, "role/" + id), (snapshot) => {
                setRole(snapshot.val());
                if (snapshot.val() === "student") {
                  setAllowInput(true);
                  setMessage([
                    "You can bind user identification only once.",
                    "Please check before submitting.",
                  ]);
                } else {
                  setMessage([
                    "You are not a student. You don't have to bind user IC number.",
                    "Please contact us if this is a mistake.",
                  ]);
                }
              });
            }
          },
          {
            onlyOnce: true,
          }
        );
      }
    });
  });

  return (
    <Dashboard title="Edit User Identification">
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
              {isMalaysian === "false" ? (
                <div className="w-full">
                  <div className="px-2 py-1">
                    <label>Nationality</label>
                  </div>
                  <select
                    className={
                      "rounded-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" +
                      " disabled:opacity-75 disabled:bg-slate-100"
                    }
                    disabled={!allowInput}
                    id="nationality"
                    defaultValue={"select-one"}
                    {...register("nationality", {
                      validate: {
                        notEmpty: (value) =>
                          value != "select-one" ||
                          "Please select user nationality",
                      },
                    })}
                  >
                    <option value="select-one" disabled>
                      Select user nationality
                    </option>
                    {nationalities
                      .filter((nat) => nat != "Malaysian")
                      .map((nat, index) => {
                        return (
                          <option key={index} value={nat}>
                            {nat}
                          </option>
                        );
                      })}
                  </select>
                </div>
              ) : null}
              {isMalaysian === "true"
                ? TextInput({
                    hook: register("nric", {
                      pattern: {
                        value: regex.nric,
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
                    hook: register("passport", {
                      pattern: {
                        value: regex.passport,
                        message:
                          "Invalid Passport format. Passports should only contain uppercase letters and numbers. If this is not the case for your passport number, please contact us.",
                      },
                    }),
                    id: "nric",
                    inputName: "Passport Number",
                    placeholder: "Passport Number (e.g. A1234567)",
                    disabled: !allowInput,
                    errorMsg: errors?.passport?.message,
                  })
                : null}

              <Button
                full={true}
                props={{ type: "submit" }}
                isLoading={isLoading}
                disabled={!allowInput}
              >
                Bind NRIC/Passport Number
              </Button>
            </div>
          </form>
          {role == "student" && (
            <Button
              full={true}
              onClick={() => {
                const updates: {
                  [key: string]: any;
                } = {};
                updates["users/" + userId + "/nric"] = null;
                updates["users/" + userId + "/nationality"] = null;
                updates["nric/" + boundNRIC + "/student"] = null;
                update(ref(db), updates)
                  .then(() => {
                    dispatch({
                      title: "Success!",
                      icon: "checkmark",
                      children: "Profile is successfully unbound.",
                      hidden: false,
                      mainText: "OK",
                      mainColors: "bg-green-600",
                      mainOnClick: () => {
                        dispatch({ hidden: true });
                        router.reload();
                      },
                      secondaryShow: false,
                    });
                  })
                  .catch((error) => {
                    dispatch({
                      title: "Error",
                      icon: "error",
                      children: "Unbound unsuccessful.",
                      hidden: false,
                      mainText: "OK",
                      mainColors: "bg-red-600",
                      mainOnClick: () => {
                        dispatch({ hidden: true });
                        router.reload();
                      },
                      secondaryShow: false,
                    });
                  });
              }}
            >
              Unbind NRIC/Passport Number
            </Button>
          )}
        </div>
      </div>
      {Modal(state)}
    </Dashboard>
  );
}
