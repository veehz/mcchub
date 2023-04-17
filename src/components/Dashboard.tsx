import { onAuthStateChanged } from "firebase/auth";
import Nav from "@/components/Nav";
import { auth } from "@/firebase.js";
import { User as FirebaseUser, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Button from "@/components/Button";

export default function Dashboard({ children }) {
  const [user, setUser] = useState<FirebaseUser | null | undefined>(undefined);
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user]);

  return (
    <div>
      <Nav
        pages={{ Dashboard: "/dashboard", Profile: "/profile" }}
        user={user?.email}
      />
      <main className="p-3">
        { (user && !user.emailVerified) && (
          <div className="w-full bg-yellow-100 py-4 px-4 rounded-md">
            Your email is not verified. You cannot access your dashboard until
            you are verified.
            <Button
              className="w-fit ml-2"
              flex={false}
              props={{
                onClick: () => {
                  if (user && !user?.emailVerified) {
                    sendEmailVerification(user)
                      .then(() => {
                        console.log("Verification email sent.");
                      })
                      .catch((error) => {
                        console.log(
                          "Error sending verification email: " + error
                        );
                      });
                  }
                },
              }}
            >
              Send Verification Email
            </Button>
          </div>
        )}
        <div>{children}</div>
      </main>
    </div>
  );
}
