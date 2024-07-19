"use server"

import styles from "./css/menu.module.css";
import AdminItem from "./AdminItem";
import SignOutBtn from "./SignOutBtn";
import AddItemBtn from "./AddItemBtn";
import { supabase } from "@/src/supabase/supabaseClient";

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
      const { data, error } = await supabase.from("products").select();
    
      if (error) {
        console.log("Error fetching menu data:", error);
        return <div>No items available now</div>;
      }
      // console.log("Data fetched:", data);
    
      // Check if the data is an array
      if (!Array.isArray(data)) {
        console.error("Invalid data format:", data);
        return <div>No items available now</div>;
      }
    
      

    return (
        <>
        
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
          <AddItemBtn />
        </div>
        </>
  );
}
