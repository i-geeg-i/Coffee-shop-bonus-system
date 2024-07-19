"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { createClient } from "../../supabase/server";
import { supabase } from "@/src/supabase/supabaseClient";

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error?.status === 400) {
    return "Wrong email or password";
  } else if (error) {
    return "Error: " + error.status;
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function check_login_before_profile() {
  console.log("Checking login status...");
  
  // Create a Supabase client
  // const supabase = createClient();

  // Fetch the user from Supabase authentication
  const { data: { user } } = await supabase.auth.getUser();
  
  console.log(user, supabase.auth.logged);
  // Log the user object to the console
  // console.log(user);

  // Check if the user exists
  if (user) {
    console.log("User is logged in. Redirecting to account...");
    // Redirect to the account page
    redirect("/account");
  } else {
    console.log("Not a user");
    redirect("/profile")
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return "Error: " + error.message;
  } else {
    const id = (await supabase.auth.getUser()).data.user?.id;

    await supabase
      .from("profiles")
      .update({ full_name: data.name })
      .eq("id", id);
    revalidatePath("/", "layout");
    redirect("/account");
  }
}

export const signOut: () => Promise<void> = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  console.log("SOSI PISKA");
  console.log("error while logiut: ", error);
  const { data: { user } } = await supabase.auth.getUser();
  console.log(user, supabase.auth.logged);
  await check_login_before_profile();
}

export async function navigateToAccount() {
  redirect(`/account`);
}

export async function navigateToLogin() {
  redirect(`/profile`);
}

export const addItem: () => Promise<void> = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
  .from('products')
  .insert({ name: 'New Product', description: 'Description', price: 1, img: '/default_coffee.jpg' })
  .select()
  .single()
  redirect(`account/` + data["id"])
}

