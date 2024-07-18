"use client";
import { useEffect } from "react";
import Link from "next/link";
import Login from "../components/Login";
import { check_login_before_profile } from "../components/actions";

export default function ProfilePage() {
  useEffect(() => {
    check_login_before_profile();
  }, []);

  return (
    <div>
      <h1 className="main-title">Profile</h1>
      <Login />
      <Link href="/">Go back</Link>
    </div>
  );
}
