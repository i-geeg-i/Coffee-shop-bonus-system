import { supabase } from "@/src/supabase/supabaseClient";
import * as db from "../db_worker";

export async function GET() {
  const { data, error } = await supabase
  .from('products')
  .select()
  console.log(data);
  console.log(error);
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
