"use server";

import styles from "./css/menu.module.css";
import AdminItem from "./AdminItem";
import AddItemBtn from "./AddItemBtn";
import { supabase } from "@/src/supabase/supabaseClient";
import { signOut } from "./actions";
<<<<<<< HEAD
import SignOutBtn from "./SignOutBtn";
=======
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)

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

<<<<<<< HEAD
        <SignOutBtn />
=======
        <button className="button secondary" onClick={() => signOut()}>
          Sign Out
        </button>
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
        <AddItemBtn />
      </div>
    </>
  );
}
