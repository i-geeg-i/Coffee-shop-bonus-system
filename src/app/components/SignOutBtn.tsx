"use client";
import { signOut } from "./actions";

export default function SignOutBtn() {
  return (
    <button className="button secondary" onClick={() => signOut()}>
      Sign Out
    </button>
  );
}
