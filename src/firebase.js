import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC02WuJ5btg2A6iTeGwYi0IDzGKziODv2k",
  authDomain: "mcc-registration-test.firebaseapp.com",
  databaseURL:
    "https://mcc-registration-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mcc-registration-test",
  storageBucket: "mcc-registration-test.appspot.com",
  messagingSenderId: "927692212307",
  appId: "1:927692212307:web:e3cd12ba84a9720b4b9ea6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
