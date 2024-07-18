import AccountForm from "../components/AccountForm";
import { createClient } from "../../supabase/server";

export default async function editProfile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <AccountForm user={user} />
    </>
  );
}
