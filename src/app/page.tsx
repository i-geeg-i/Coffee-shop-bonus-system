import NewsList from "./components/NewsList";
import { supabase } from "@/src/supabase/supabaseClient";
export default async function Home() {
  const { data, error } = await supabase.from("news").select();
  let news = [];
  if (!error) {
    news = data;
  }
  return (
    <div>
      <h1 className="main-title">CoffeeIn</h1>
      <NewsList {...{ news }} />
    </div>
  );
}
