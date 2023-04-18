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
        I am a...
      </h3>
      <div className="mt-6 mx-auto md:max-w-4xl text-center grid md:grid-flow-col justify-stretch text-3xl font-bold">
        <Link
          href="/login"
          className="block p-2 bg-blue-100 hover:bg-blue-200 rounded-lg drop-shadow-md m-2 md:py-16 mx-4"
        >
          Teacher
        </Link>
        <Link
          href="/login"
          className="block p-2 bg-blue-100 hover:bg-blue-200 rounded-lg drop-shadow-md m-2 md:py-16 mx-4"
        >
          Student
        </Link>
        <Link
          href="/login"
          className="block p-2 bg-blue-100 hover:bg-blue-200 rounded-lg drop-shadow-md m-2 md:py-16 mx-4"
        >
          Parent
        </Link>
      </div>

      <div className="text-center mt-4 text-red-500">
        {router?.query?.error == "not-logged-in" &&
          "You must be logged in to view that page."}
      </div>
    </AuthLayout>
  );
}
