import { createClient } from "../../supabase/server";
import { supabase } from "@/src/supabase/supabaseClient";
import AdminActions from "../components/AdminActions";
import FreeDrinkComponent from "../components/FreeDrinkComponent";
import PurchaseHistory from "../components/PurchaseHistory";

export default async function Account() {
  const supabaseAuth = createClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    console.log("User not authenticated");
    return <div>Please log in to view your account</div>;
  }

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id);

  if (profileError) {
    console.log("Error fetching profile:", profileError.message);
    return <div>Error loading profile</div>;
  }

  const profile = profileData[0];

  const purchaseIds = profile["purchase_history"];

  if (purchaseIds == null) {
    return (
      <div>
        <FreeDrinkComponent {...profile} />
      </div>
    );
  }

  const { data: purchasesData, error: purchasesError } = await supabase
    .from("purchases")
    .select("*")
    .in("id", purchaseIds);

  if (purchasesError) {
    console.log("Error fetching purchases:", purchasesError.message);
    return <div>Error loading purchases</div>;
  }
  console.log(purchasesData);

  if (!profile["is_admin"]) {
    return (
      <div>
        <FreeDrinkComponent {...profile} />

        <div className="w-3/4 m-auto">
          <PurchaseHistory purchases={purchasesData} />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <AdminActions />
      </>
    );
  }
}
