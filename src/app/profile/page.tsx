import Link from "next/link";
import Auth from "../api/auth/login";

export default function Profile() {
    return( <div>
        <h1 className="main-title">Profile</h1>       
        <Auth />
        <Link href="/">Go back</Link>
        </div>
    )
}
