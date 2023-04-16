import { onAuthStateChanged } from "firebase/auth";
import Nav from "../../components/Nav.tsx";
import { auth } from "../../firebase.js";
import { User as FirebaseUser } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [user, setUser] = useState<FirebaseUser|null>(null);
  const router = useRouter();
  onAuthStateChanged(auth, (user) => {
    setUser(user);
    if(!user){
      router.push({
        pathname: "/",
        query: { error: "not-logged-in" },
      });
    }
  });

  return (
    <div>
      <Nav pages={{ Dashboard: "/dashboard", Profile: "/profile" }} />
      <main className="p-4">
        <h1>Dashboard</h1>
        <p>
          {user
            ? "You are logged in as " + user.email
            : "You are not logged in."}
        </p>
      </main>
    </div>
  );
}
