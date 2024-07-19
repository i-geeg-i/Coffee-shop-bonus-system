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
<<<<<<< HEAD
      <h1 className="main-title">CoffeeIn</h1>
=======
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
      <NewsList {...{ news }} />
    </div>
  );
}
