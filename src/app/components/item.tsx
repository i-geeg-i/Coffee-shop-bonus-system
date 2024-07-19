"use client";

import Link from "next/link";
import styles from "./css/item.module.css";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/src/supabase/supabaseClient";
import { createClient } from "@/src/supabase/client";
import { useState } from "react";
export const fetchCache = 'force-no-store';
type Props = {
  params: {
    id: string;
    name: string;
    picSrc: string;
    price: string;
    description: string;
    amount: number;
  };
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

export default function Item({ params }: Props) {
  const [count, setCount] = useState(params.amount);

  async function addToCart(){
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user==undefined){
      alert("Please login, to add to the cart!");
    }
    else{
      let { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", user?.id)
      .single();
      console.log(data['cart'] as Data);
      console.log(error);
      if (data['cart'] == null || (data['cart'] as Data).cart.products.length == 0){
        const product : Product = {
          id: params.id,
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
        let contains: boolean = false;
        (data['cart'] as Data).cart.products.map(async (product: Product, index)=> {
          if (product.id == params.id){
            const upd_product : Product = {
              id: params.id,
              amount: product.amount+1
            };
            contains = true;
            setCount(product.amount+1);
            console.log(product.amount);
            user_cart.cart.products.push(upd_product);
          }
          else{
            user_cart.cart.products.push(product);
          }
          if (!contains){
            const product : Product = {
              id: params.id,
              amount: 1
            }
            setCount(1);
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
        alert("Please login, to add to the cart!");
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
            console.log(product.id);
            console.log(product.amount-1>0);
          if (product.id === params.id){
            if (product.amount-1 > 0){
                console.log("lalala")
                const upd_product : Product = {
                  id: params.id,
                  amount: product.amount-1
                };
                user_cart.cart.products.push(upd_product);
            }
            setCount(product.amount-1);
          }
          else{
            console.log("Amount " + product.amount);
            user_cart.cart.products.push(product);
            console.log("cart new in else:")
            console.log(user_cart);
          }
        })
        console.log(user_cart);
        const {error: update_error} = await supabase
        .from('profiles')
        .update({ cart: user_cart})
        .eq('id', user.id);
        console.log("new cart: ");
        console.log( user_cart)
        if (count>0){
            console.log()
        }
    }
  }
  const searchParams = useSearchParams();
  const name: string = params["name"] as string;
  const picSrc: string = params["picSrc"] as string;
  const price: string = params["price"] as string;
  const description: string = params["description"] as string;
  return (
    <>
      <a href="/menu">
        <img src="/back.png" className={styles.go_back_btn}></img>
      </a>
      <div className={styles.main_block}>
        <div className={styles.left_block}>
          <img className={styles.item_pic} src={picSrc}></img>
        </div>
        <div className={styles.right_block}>
          <h1 className="item">{name}</h1>
          <p>{description}</p>
          {count === 0 ? (
            <div><button className={styles.price_btn} onClick={addToCart}>{price + " ₽"}</button></div>
          ) : (
            <div><button className={styles.change_btn} onClick={removeFromCart}>-</button><input value={count} className={styles.input} readOnly={true}></input><button className={styles.change_btn} onClick={addToCart}>+</button></div>
          )}
          
        </div>
      </div>
    </>
  );
}
