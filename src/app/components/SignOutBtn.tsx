"use client"

import { signOut } from "./actions"
import style from "./css/menu.module.css"

export default function SignOutBtn() {
    return(
        <button className={style.signout_btn} onClick={() => signOut()}>Sign Out</button>
    )
}