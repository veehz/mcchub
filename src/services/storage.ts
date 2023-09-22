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

export async function getUserDetails(callback: (userDetails: any) => void) {
  const user = await getUser();
  if (user === null) {
    return null;
  }

  try {
    console.log("fetching user details");
    onValue(ref(db, "users/" + auth.currentUser!.uid), (snapshot) => {
      callback(snapshot.val());
    });
  } catch (error) {
    console.error("Error fetching user details from Firebase:", error);
    throw error;
  }
}

export async function getRole(callback: (role: string) => void) {
  const user = await getUser();
  if (user === null) {
    return null;
  }

  try {
    onValue(ref(db, "users/" + auth.currentUser!.uid + "/role"), (snapshot) => {
      callback(snapshot.val());
    });
  } catch (error) {
    console.error("Error fetching user role from Firebase:", error);
    throw error;
  }
}

export async function getManagedStudents(
  callback: (managedStudents: any) => void
) {
  if ((await getUser()) === null) {
    return null;
  }

  try {
    onValue(
      ref(db, "managedStudents/" + auth.currentUser!.uid + "/"),
      (snapshot) => {
        callback(snapshot.val());
      }
    );
  } catch (error) {
    console.error("Error fetching managed students from Firebase:", error);
    throw error;
  }
}

export async function getManagedStudentsCount(
  callback: (managedStudentsCount: number) => void
) {
  getManagedStudents((managedStudents) => {
    callback(
      managedStudents === null ? 0 : Object.keys(managedStudents).length
    );
  });
}

export async function getPayments(callback: (payments: any) => void) {
  if ((await getUser()) === null) {
    return null;
  }

  try {
    onValue(ref(db, "payments/" + auth.currentUser!.uid + "/"), (snapshot) => {
      callback(snapshot.val());
    });
  } catch (error) {
    console.error("Error fetching payments from Firebase:", error);
    throw error;
  }
}

export async function getContestInfo(callback: (contestInfo: any) => void) {
  if ((await getUser()) === null) {
    return null;
  }

  try {
    onValue(ref(db, "contestInfo"), (snapshot) => {
      callback(snapshot.val());
    });
  } catch (error) {
    console.error("Error fetching contest info from Firebase:", error);
    throw error;
  }
}
