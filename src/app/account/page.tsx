import { createClient } from "../../supabase/server";
import AdminActions from "../components/AdminActions";
import FreeDrinkComponent from "../components/FreeDrinkComponent";

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id);
  if (error) {
    console.log({ error: error.message });
  } else {
    const profile = data[0];
    // console.log(profile);
    if (!data[0]["is_admin"]) {
      return (
        <>
          <FreeDrinkComponent {...profile} />
        </>
      );
    } else {
      return (
        <>
          <AdminActions />
        </>
      );
    }
  }
}
