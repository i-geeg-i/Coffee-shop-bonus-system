"use client";
import Link from "next/link";
import styles from "./css/MenuItem.module.css";
import { createClient } from "@/src/supabase/client";
import { useState } from "react";

type Props = {
  picSrc: string;
  price: number;
  name: string;
  id: string;
};
type Product = {
  id : string;
  amount: number;
}
// cart: {[{id:0}], promo: "asd"}
type Data = {
  cart: {
    promo: string;
    products: Product[];
  }
}

export default function MenuItem(props: Props) {
  const [count, setCount] = useState(0);
  async function addToCart(){
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user==undefined){
      console.log("Huiiiiiiiiiiiiiiiiiiiii!");
    }
    else{
      let { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user?.id)
      .single();
      console.log(data['cart'] as Data);
      console.log(error);
      if (data['cart'] == null){
        const product : Product = {
          id: props.id,
          amount: 1
        }
        setCount(1);
        const user_cart : Data = {
          cart: {
            promo: "",
            products: [product]
          }
        }
        const {error: update_error} = await supabase
        .from('profiles')
        .update({ cart: user_cart})
        .eq('id', user.id);
      }
      else{
        let user_cart : Data = {
          cart: {
            promo: "",
            products: []
          }
        };
        (data['cart'] as Data).cart.products.map(async (product: Product, index)=> {
          if (product.id == props.id){
            const upd_product : Product = {
              id: props.id,
              amount: product.amount+1
            };
            setCount(product.amount+1);
            user_cart.cart.products.push(upd_product);
          }
          else{
            user_cart.cart.products.push(product);
          }
        })
        
        const {error: update_error} = await supabase
        .from('profiles')
        .update({ cart: user_cart})
        .eq('id', user.id);
        console.log("new cart: ");
        console.log( user_cart)
      }

    }
  }
  async function removeFromCart(){
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user==undefined){
      console.log("Huiiiiiiiiiiiiiiiiiiiii!");
    }
    else{
      let { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user?.id)
      .single();
      console.log(data['cart'] as Data);
      console.log(error);
        let user_cart : Data = {
          cart: {
            promo: "",
            products: []
          }
        };
        (data['cart'] as Data).cart.products.map(async (product: Product, index)=> {
          if (product.id == props.id){
            const upd_product : Product = {
              id: props.id,
              amount: product.amount-1
            };
            setCount(product.amount-1);
            user_cart.cart.products.push(upd_product);
          }
          else{
            user_cart.cart.products.push(product);
          }
        })
        
        const {error: update_error} = await supabase
        .from('profiles')
        .update({ cart: user_cart})
        .eq('id', user.id);
        console.log("new cart: ");
        console.log( user_cart)

    }
  }
  return (
    <div className={styles.menu_item}>
      <Link href={{ pathname: "/menu/" + props.id.toLocaleString() }}>
        <img className={styles.item_pic} src={props.picSrc}></img>
      </Link>
      <p className={styles.item_name}>{props.name}</p>
      {count === 0 ? (
            <div><button className={styles.price_btn} onClick={addToCart}>{props.price + " ₽"}</button></div>
          ) : (
            <div><button className={styles.change_btn} onClick={removeFromCart}>-</button><input value={count} className={styles.input}></input><button className={styles.change_btn} onClick={addToCart}>+</button></div>
          )}
    </div>
  );
}
/*
cart: {[{id:0}], promo: "asd"}
*/
