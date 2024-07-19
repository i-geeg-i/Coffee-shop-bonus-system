import Link from "next/link";
import Menu from "../components/Menu";
import styles from "./menu.module.css";
import { supabase } from "@/src/supabase/supabaseClient";
export const fetchCache = "force-no-store";
export default async function MenuPage() {
  const { data, error } = await supabase.from("products").select();

  if (error) {
    console.log("Error fetching menu data:", error);
    return <div>No items available now</div>;
  }

  if (!Array.isArray(data)) {
    console.error("Invalid data format:", data);
    return <div>No items available now</div>;
  }

  return <Menu products={data} />;
}
