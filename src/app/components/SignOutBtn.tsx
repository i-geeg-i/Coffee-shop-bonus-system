"use client"

import { signOut } from "./actions"


export default function SignOutBtn() {
    return(
        <button className="btn" onClick={() => signOut()}>Sign Out</button>
    )
}