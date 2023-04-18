import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { auth, db } from "@/firebase.js";
import { ref, set } from "firebase/database";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router.js";
import Button from "@/components/Button";
import FormLayout from "@/components/FormLayout";

interface LoginInput {
  email: string;
  password: string;
  confirmPassword: string;
  type: "teacher" | "parent";
}

export default function Register() {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) router.push("/dashboard");
    });
  }, [router]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setIsLoading(false);
        set(ref(db, 'users/' + userCredential.user.uid), {
          role: data.type,
        });
        // sendEmailVerification(userCredential.user);
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/email-already-in-use":
            setErrorMsg("Email already in use.");
            break;
          case "auth/invalid-email":
            setErrorMsg("Invalid email address.");
            break;
          default:
            setErrorMsg(
              "There was an error. Please try again in a few minutes. If the problem persists, please contact us. (Error code: " +
                errorCode +
                ")"
            );
        }
      });
  };

  return (
    <FormLayout title="Register for a teacher/parent account">
      <form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email Address
            </label>
            <input
              {...register("email", {
                required: "Email address is required.",
                pattern: {
                  value:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
                  message: "Entered value does not match email format.",
                },
              })}
              id="email-address"
              type="email"
              autoComplete="email"
              required
              className={
                "rounded-t-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              }
              placeholder="Email Address"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters.",
                },
                maxLength: {
                  value: 20,
                  message: "Password must have less than 20 characters.",
                },
                required: "Password is required.",
              })}
              id="password"
              type="password"
              autoComplete="password"
              required
              className={
                "relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              }
              placeholder="Password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword", {
                validate: {
                  validateSamePassword: (value, formValues) => {
                    return (
                      value === formValues.password || "Passwords do not match."
                    );
                  },
                },
              })}
              id="confirmPassword"
              type="password"
              autoComplete="password"
              required
              className={
                "relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              }
              placeholder="Confirm Password"
            />
          </div>

          <div className="space-x-2 p-2 text-sm font-bold">
            <input
              type="radio"
              id="teacher"
              {...register("type", {
                required: "Please select if you are a teacher or parent.",
              })}
              value="teacher"
            />
            <label htmlFor="teacher">I am a Teacher</label>
          </div>
          <div className="space-x-2 px-2 pb-2 text-sm font-bold">
            <input
              type="radio"
              id="parent"
              {...register("type", {
                required: "Please select if you are a teacher or parent.",
              })}
              value="parent"
            />
            <label htmlFor="parent">I am a Parent</label>
          </div>
        </div>

        <div
          className={"rounded-md p-2 text-sm " + errors ? "text-red-500" : ""}
        >
          <div>{errors?.email?.message}</div>
          <div>
            {errors?.password?.message || errors?.confirmPassword?.message}
          </div>
          <div>{errors?.type?.message}</div>
          <div>{errorMsg || ""}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="/"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Not a teacher?
            </Link>
          </div>
          <div className="text-sm">
            <Link
              href="./login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account?
            </Link>
          </div>
        </div>

        <div>
          <Button props={{ type: "submit" }} isLoading={isLoading}>
            Register
          </Button>
        </div>
      </form>
    </FormLayout>
  );
}
