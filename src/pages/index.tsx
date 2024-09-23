import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

import AuthLayout from "@/components/AuthLayout";

export default function LoginLanding() {
  const router = useRouter();
  useEffect(() => {
    if (router?.query?.signout === "true") {
      auth.signOut();
      router.push("/");
    } else {
      onAuthStateChanged(auth, (user) => {
        if (user) router.push("/dashboard");
      });
    }
  }, [router]);

  return (
    <AuthLayout>
      <h3 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">
        I would like to...
      </h3>
      <div className="mt-6 mx-auto md:max-w-4xl text-center grid md:grid-cols-3 justify-stretch text-3xl font-bold">
        <Link
          href="/login"
          className="flex justify-center p-2 items-center bg-blue-100 hover:bg-blue-200 rounded-lg drop-shadow-md m-2 md:py-16 mx-4"
        >
          <div>Login</div>
        </Link>
        <Link
          href="/register"
          className="flex justify-center p-2 items-center bg-blue-100 hover:bg-blue-200 rounded-lg drop-shadow-md m-2 md:py-16 mx-4"
        >
          Register
        </Link>
        <Link
          href="https://ioimalaysia.org/competition/mcc/"
          target="_blank"
          rel="noopener"
          className="flex justify-center p-2 items-center bg-blue-100 hover:bg-blue-200 rounded-lg drop-shadow-md m-2 md:py-16 mx-4"
        >
          Learn about MCC
        </Link>
      </div>

      <div className="text-center mt-4 text-red-500">
        {router?.query?.error == "not-logged-in" &&
          "You must be logged in to view that page."}
      </div>

      {process.env.NEXT_PUBLIC_SITE_MESSAGE ? (
        <div
          className="text-center text-lg max-w-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: process.env.NEXT_PUBLIC_SITE_MESSAGE}}
        ></div>
      ) : null}

    </AuthLayout>
  );
}
