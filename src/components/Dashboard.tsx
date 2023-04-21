import { onAuthStateChanged } from "firebase/auth";
import Nav from "@/components/Nav";
import { auth, db } from "@/firebase.js";
import { User as FirebaseUser, sendEmailVerification } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
      if (!user){
        router.push("/");
        return;
      }
      setUser(user);
      onValue(
        ref(db, `role/${user!.uid}`),
        (snapshot) => {
          setRole(snapshot.val());
          if (
            router.pathname.startsWith("/admin") &&
            snapshot.val() != "admin"
          ) {
            router.push("/");
          }
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
            : role == "teacher" || role == "parent"
            ? [
                ["Dashboard", "/dashboard"],
                ["Students", "/students"],
                ["Payments", "/payments"],
              ]
            : [
                // admin
                ["Dashboard", "/admin"],
                ["Users", "/admin/users"],
                ["Payments", "/admin/payments"],
              ])
        }
        rightPages={rightPages || [["Profile", "/profile"]]}
        user={user?.email}
      />
      <main className="p-3">
        <div>{children}</div>
      </main>
    </div>
  );
}
