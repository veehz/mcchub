import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../firebase.js";
import Button from "@/components/Button";
import FormLayout from "@/components/FormLayout";
import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
} from "firebase/auth";

export default function App() {
  const router = useRouter();
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FORCE_VERIFY_EMAIL != "true") router.push("/");

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      } else if (user.emailVerified) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  const [message, setMessage] = useState<string>("");
  return (
    <FormLayout title="Verify Email">
      <div className="space-y-2">
        <div className="text-center mt-4">
          Click below to receive a verification email. Once you have verified
          your email, you may log in.
        </div>
        <div>{message}</div>
        <Button
          full={true}
          onClick={() => {
            if (auth && auth.currentUser)
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  setMessage("Verification email sent!");
                })
                .catch((_) => {
                  setMessage(
                    "There was an error. Please try again later. If the problem persists, please contact us."
                  );
                });
          }}
        >
          Send Verification Email
        </Button>
      </div>
    </FormLayout>
  );
}
