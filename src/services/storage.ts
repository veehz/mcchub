import { auth, db } from "@/firebase";
import { User } from "firebase/auth";
import { ref, get, onValue } from "firebase/database";

export async function getUser(force = false): Promise<User | null> {
  if (!force && auth.currentUser) {
    return auth.currentUser;
  }

  try {
    const user: User | null = await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
    return user;
  } catch (error) {
    console.error("Error fetching user from Firebase:", error);
    throw error;
  }
}
export async function getUserDetails(userid?: string): Promise<any> {
  const user = await getUser();
  if (user === null) {
    return null;
  }

  userid = userid || user.uid;

  console.log("fetching user details");
  return new Promise((resolve, reject) => {
    onValue(
      ref(db, "users/" + userid),
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        console.error("Error fetching user details from Firebase:", error);
        reject(error);
      }
    );
  });
}

export async function getRole(userid?: string): Promise<string | null> {
  const user = await getUser();
  if (user === null) {
    return null;
  }

  userid = userid || user.uid;

  return new Promise((resolve, reject) => {
    onValue(
      ref(db, "role/" + userid),
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        console.error("Error fetching user role from Firebase:", error);
        reject(error);
      }
    );
  });
}

export async function getManagedStudents(userid?: string): Promise<any> {
  const user = await getUser();
  if (user === null) {
    return null;
  }

  userid = userid || user.uid;

  return new Promise((resolve, reject) => {
    onValue(
      ref(db, "managedStudents/" + userid + "/"),
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        console.error("Error fetching managed students from Firebase:", error);
        reject(error);
      }
    );
  });
}

export async function getManagedStudentsCount(
  userid?: string
): Promise<number> {
  const managedStudents = await getManagedStudents(userid);
  return managedStudents === null ? 0 : Object.keys(managedStudents).length;
}

export async function getPayments(userid?: string): Promise<any> {
  const user = await getUser();
  if (user === null) {
    return null;
  }

  userid = userid || user.uid;

  return new Promise((resolve, reject) => {
    onValue(
      ref(db, "payments/" + userid + "/"),
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        console.error("Error fetching payments from Firebase:", error);
        reject(error);
      }
    );
  });
}

export async function getContestInfo(): Promise<any> {
  const user = await getUser();
  if (user === null) {
    return null;
  }

  return new Promise((resolve, reject) => {
    onValue(
      ref(db, "contestInfo"),
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        console.error("Error fetching contest info from Firebase:", error);
        reject(error);
      }
    );
  });
}
