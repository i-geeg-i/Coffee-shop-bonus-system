"use client";
import styles from "./css/CartItem.module.css";
import { createClient } from "@/src/supabase/client";
import { useState } from "react";
import { getTotal, setTotal } from "./CartItems";

type Props = {
  id: string;
  name: string;
  img: string;
  price: string;
  amount: number;
  total: number;
};
type Product = {
  id: string;
  amount: number;
};

type Data = {
  cart: {
    promo: string;
    products: Product[];
  };
};

export default function CartItem(params: Props) {
  const [count, setCount] = useState<number>(params.amount);
  async function addToCart() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user == undefined) {
      alert("Please login, to add to the cart!");
    } else {
      let { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)
        .single();
      console.log(data["cart"] as Data);
      console.log(error);
      if (data["cart"] == null || data["cart"].length <= 0) {
        const product: Product = {
          id: params.id,
          amount: 1,
        };
        params.total;
        setCount(1);
        const user_cart: Data = {
          cart: {
            promo: "",
            products: [product],
          },
        };
        const { error: update_error } = await supabase
          .from("profiles")
          .update({ cart: user_cart })
          .eq("id", user.id);
      } else {
        let user_cart: Data = {
          cart: {
            promo: "",
            products: [],
          },
        };
        (data["cart"] as Data).cart.products.map(
          async (product: Product, index) => {
            if (product.id == params.id) {
              const upd_product: Product = {
                id: params.id,
                amount: product.amount + 1,
              };
              setCount(product.amount + 1);
              user_cart.cart.products.push(upd_product);
            } else {
              user_cart.cart.products.push(product);
            }
          },
        );

        const { error: update_error } = await supabase
          .from("profiles")
          .update({ cart: user_cart })
          .eq("id", user.id);
        console.log("new cart: ");
        console.log(user_cart);
      }
    }
  }
  async function removeFromCart() {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user == undefined) {
      alert("Please login, to add to the cart!");
    } else {
      let { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)
        .single();
      console.log(data["cart"] as Data);
      console.log(error);
      let user_cart: Data = {
        cart: {
          promo: "",
          products: [],
        },
      };
      (data["cart"] as Data).cart.products.map(
        async (product: Product, index) => {
          console.log(product.id);
          console.log(product.amount - 1 > 0);
          if (product.id === params.id) {
            if (product.amount - 1 > 0) {
              const upd_product: Product = {
                id: params.id,
                amount: product.amount - 1,
              };
              user_cart.cart.products.push(upd_product);
            }
            setCount(product.amount - 1);
          } else {
            console.log("Amount " + product.amount);
            user_cart.cart.products.push(product);
            console.log(user_cart);
          }
        },
      );
      console.log(user_cart);
      const { error: update_error } = await supabase
        .from("profiles")
        .update({ cart: user_cart })
        .eq("id", user.id);
      console.log("new cart: ");
      console.log(user_cart);
      if (count > 0) {
      }
    }
  }
  return (
    <>
      {count > 0 && (
        <div className={styles.cart_item} style={{ margin: "10px" }}>
          <p className={styles.item_name}>{params.name}</p>
          <p className={styles.item_price}>{params.price}₽</p>
          <div className={styles.changeForm}>
            <button className={styles.change_btn} onClick={removeFromCart}>
              -
            </button>
            <input
              value={count}
              className={styles.input}
              readOnly={true}
            ></input>
            <button className={styles.change_btn} onClick={addToCart}>
              +
            </button>
          </div>
        </div>
      )}
    </>
  );
}
