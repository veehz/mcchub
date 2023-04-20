import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { auth, db } from "@/firebase.js";
import { ref, set, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

import TextInput from "@/components/FormComponents/TextInput";
import RadioInputList from "@/components/FormComponents/RadioInputList";
import RadioInput from "@/components/FormComponents/RadioInput";

interface NRICInput {
  isMalaysian: "null" | "true" | "false";
  nationality: string;
  nric: string;
  passport: string;
}

export default function App() {
  return <Dashboard>Edit Student Profile</Dashboard>;
}
