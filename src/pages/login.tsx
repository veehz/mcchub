import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../firebase.js";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Button from "@/components/Button";
import FormLayout from "@/components/FormLayout";
import { useEffect, useState } from "react";
import regex from "@/helpers/regex.js";

interface LoginInput {
  email: string;
  password: string;
}

export default function LoginPage() {
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
    signInWithEmailAndPassword(auth, data.email, data.password)
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case "auth/user-not-found":
            setErrorMsg("User not found.");
            break;
          case "auth/wrong-password":
            setErrorMsg("Incorrect password.");
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
    <FormLayout title="Sign in to your account">
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
                  value: regex.email,
                  message: "Entered value does not match email format.",
                },
              })}
              id="email-address"
              type="email"
              autoComplete="email"
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
                required: "Password is required.",
              })}
              id="password"
              type="password"
              autoComplete="password"
              className={
                "rounded-b-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              }
              placeholder="Password"
            />
          </div>
        </div>
        <div
          className={"rounded-md p-2 text-sm " + errors ? "text-red-500" : ""}
        >
          <div>{errors?.email?.message}</div>
          <div>{errors?.password?.message}</div>
          <div>{errorMsg || ""}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="./forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>
          <div className="text-sm">
            <Link
              href="./register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Register an account
            </Link>
          </div>
        </div>

        <Button full={true} props={{ type: "submit" }} isLoading={isLoading}>
          Sign in
        </Button>
      </form>
    </FormLayout>
  );
}
