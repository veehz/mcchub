import { onAuthStateChanged } from "firebase/auth";
import Nav from "@/components/Nav";
import { auth, db } from "@/firebase.js";
import { User as FirebaseUser, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Button from "@/components/Button";
import { onValue, ref } from "firebase/database";

export default function Dashboard({
  children,
  pages,
  rightPages,
}: {
  children: React.ReactNode;
  pages?: Array<[string, string]>;
  rightPages?: Array<[string, string]>;
}) {
  const [user, setUser] = useState<FirebaseUser | null | undefined>(undefined);
  const [role, setRole] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/");
      onValue(
        ref(db, `role/${user!.uid}`),
        (snapshot) => {
          setRole(snapshot.val());
        },
        { onlyOnce: true }
      );
    });
  }, [router]);

  return (
    <div>
      <Nav
        pages={
          pages ||
          (role == "student"
            ? [["Dashboard", "/dashboard"]]
            : [
                ["Dashboard", "/dashboard"],
                ["Students", "/students"],
                ["Payment", "/payment"],
              ])
        }
        rightPages={rightPages || [["Profile", "/profile"]]}
        user={user?.email}
      />
      <main className="p-3">
        {user && !user.emailVerified && (
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
