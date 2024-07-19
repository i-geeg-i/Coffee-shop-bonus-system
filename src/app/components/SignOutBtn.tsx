"use client";
import { signOut } from "./actions";
import styles from "@/src/app/components/css/MenuItem.module.css";

export default function SignOutBtn() {
  return (
    <button className={styles.delete_btn} onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
