import Link from "next/link";
import Login from "../components/Login";

export default function Profile() {
    return( <div>
        <h1 className="main-title">Profile</h1>       
        <Login />
        <Link href="/">Go back</Link>
        </div>
    )
}
