import Link from "next/link";
import TextField from "./TextField";
import styles from "./css/menu.module.css"; // Ensure the correct path
import MenuItem from "./MenuItem";
import { createClient } from "@/src/supabase/server";

type Product = {
  id: string;
  img: string;
  name: string;
  price: number;
};
type Product_Cart = {
  id: string;
  amount: number;
};
// cart: {[{id:0}], promo: "asd"}
type Data = {
  cart: {
    promo: string;
    products: Product_Cart[];
  };
};
type Props = {
  products: Product[];
};

export default async function Menu({ products }: Props) {
  async function checkCart(product_id: string): Promise<number> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user != undefined) {
      let { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)
        .single();
      console.log(data["cart"] as Data);
      console.log(error);
      let amount = 0;
      (data["cart"] as Data).cart.products.map(
        async (product: Product_Cart) => {
          if (product.id == product_id) {
            console.log("id: ", product.id, "Amount in menu: ", product.amount);
            amount = product.amount;
          }
        },
      );
      return amount;
    }
    return 0;
  }
  if (!Array.isArray(products)) {
    console.error("Products prop is not an array");
    return <div>Error: Products prop is not an array</div>;
  }
  return (
    <div>
      <div className={styles.main_div}>
<<<<<<< HEAD
        <TextField
          header="Here is our menu!"
          text="By the way, you may order it from the website"
        />
=======
        <div className={styles.infoT}>
        <h2>Here is our menu!</h2>
        <p>By the way, you may order it from the website</p>
        </div>
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
        <div className={styles.items_div}>
          {products.map(async (product) => (
            <MenuItem
              key={product.id}
              picSrc={product.img}
              price={product.price}
              name={product.name}
              id={product.id}
              amount={await checkCart(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
