"use server";
import Link from "next/link";
import Login from "../components/Login";
import { createClient } from "@/src/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  console.log("Checking login status...");

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  if (user) {
    console.log("User is logged in. Redirecting to account...");
    redirect("/account");
  } else {
    return (
      <div>
        <h1 className="main-title">Profile</h1>
        <Login />
        <Link href="/">Go back</Link>
      </div>
    );
  }
}
