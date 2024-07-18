"use server"

import styles from "./css/menu.module.css";
import AdminItem from "./AdminItem";
import { supabase } from "@/src/supabase/supabaseClient";
import { useRouter } from "next/router";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { check_login_before_profile, navigateToLogin } from "./actions";
import SignOutBtn from "./SignOutBtn";

type Product = {
    id: number;
    img: string;
    name: string;
    price: number;
  };
  
  type Props = {
    products: Product[];
  };


export default async function AdminActions() {
    let res = await fetch(`http://localhost:3000/api/menu`, {
        method: "GET",
        headers: new Headers({
          Authorization: "Basic",
        }),
      });
    
      if (!res.ok) {
        console.log("Error fetching menu data:", res.statusText);
        return <div>No items available now</div>;
      }
    
      let data = await res.json();
      // console.log("Data fetched:", data);
    
      // Check if the data is an array
      if (!Array.isArray(data)) {
        console.error("Invalid data format:", data);
        return <div>No items available now</div>;
      }
    
      

    return (
        <>
        <button className={styles.btn}>Add Item</button>
        <div className={styles.main_div}>
          <div className={styles.items_div}>
            {data.map((product) => (
              <AdminItem
                key={product.id}
                picSrc={product.img}
                price={product.price}
                name={product.name}
                id={product.id}
              />
            ))}
          </div>
          <SignOutBtn />
        </div>
        </>
  );
}
