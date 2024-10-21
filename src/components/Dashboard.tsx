import Nav from "@/components/Nav";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import { getRole, getUser } from "@/services/storage";
import { auth } from "@/firebase";

export default function Dashboard({
  title,
  children,
  pages,
  rightPages,
}: {
  title?: string;
  children: React.ReactNode;
  pages?: Array<[string, string]>;
  rightPages?: Array<[string, string]>;
}) {
  const [user, setUser] = useState<FirebaseUser | null | undefined>(undefined);
  const [role, setRole] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
        return;
      }
      setUser(user);
      if (process.env.NEXT_PUBLIC_FORCE_VERIFY_EMAIL == "true") {
        if (router.pathname != "/verify-email" && !user.emailVerified) {
          router.push("/verify-email");
          return;
        }
      }
      getRole().then((role) => {
        setRole(role!);
        if (router.pathname.startsWith("/admin") && role != "admin") {
          router.push("/");
          return;
        }
      });
    });
  }, [router]);

  return (
    <div>
      <Head>
        <title key="title" lang="en">
          {title ? `${title} | MCC Hub` : `MCC Hub`}
        </title>
      </Head>
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
            : role == "admin"
            ? [
                // admin
                ["Dashboard", "/admin"],
                ["Users", "/admin/users"],
                ["Payments", "/admin/payments"],
              ]
            : [])
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
