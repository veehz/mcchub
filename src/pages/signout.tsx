import { useRouter } from "next/router.js";
import { auth } from "../firebase.js";
export default function Signout(){
    auth.signOut();
    useRouter().push("/");
    return <div>Signing Out</div>;
}
