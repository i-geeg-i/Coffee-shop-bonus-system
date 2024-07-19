import { createClient } from "../../supabase/server";
import FreeDrinkComponent from "../components/FreeDrinkComponent";
import PurchaseHistory from "../components/PurchaseHistory";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("User not authenticated");
    return <div>Please log in to view your account</div>;
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.log("Error fetching profile:", profileError.message);
    return <div>Error loading profile</div>;
  }

  const { data: purchases, error: purchaseError } = await supabase
    .from("purchases")
    .select()
    .eq("user_id", user.id);

  if (purchaseError) {
    console.log("Error fetching purchases:", purchaseError.message);
    return <div>Error loading purchases</div>;
  }

  return (
    <>
      <FreeDrinkComponent {...profileData} />
      <PurchaseHistory purchases={purchases} />
    </>
  );
}
