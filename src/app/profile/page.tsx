"use server";
import Link from "next/link";
import Login from "../components/Login";
import { createClient } from "@/src/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  console.log("Checking login status...");
  
  // Create a Supabase client
  const supabase = createClient();

  // Fetch the user from Supabase authentication
  const { data: { user } } = await supabase.auth.getUser();

  // Log the user object to the console
  console.log(user);

  // Check if the user exists
  if (user) {
    console.log("User is logged in. Redirecting to account...");
    // Redirect to the account page
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
