"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { supabase } from "@/src/supabase/supabaseClient";
import { createClient } from "@/src/supabase/client";
import { TotalProvider, useTotal } from "./useTotal";

import styles from "./css/CartTotal.module.css";

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

type ProductDisp = {
  id: string;
  img: string;
  name: string;
  price: number;
  amount: number;
};

let updateOutside: Dispatch<SetStateAction<number>> | null = null;

export function setTotalEx(tot: number) {
  if (updateOutside) {
    updateOutside((total: number) => total * tot);
  }
}

export function addToTotal(amount: number) {
  if (updateOutside) {
    updateOutside((total: number) => total + amount);
  }
}

function CartTotalComponent() {
  const { total, setTotal } = useTotal();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    updateOutside = setTotal;
    return () => { updateOutside = null; };
  }, [setTotal]);

  const supabase = createClient();

  useEffect(() => {
      const fetchCartData = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            setError("You should login first!");
            setLoading(false);
            return;
          }

          const { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("id", user.id)
            .single();

          if (error || !data) {
            setError("Error loading cart");
            setLoading(false);
            return;
          }

          const cart = data.cart as Data;
          console.log(cart);

          const productPromises = cart.cart.products.map(async (product) => {
            const { data, error } = await supabase
              .from("products")
              .select()
              .eq("id", product.id)
              .single();

            if (error) {
              console.error("Error fetching product:", error);
              return null;
            }

            const productData = data as ProductDisp;
            productData.amount = product.amount;
            return productData;
          });

          const products = await Promise.all(productPromises);
          const validProducts = products.filter((product) => product !== null) as ProductDisp[];
          const totalAmount = validProducts.reduce((acc, product) => acc + product.amount * product.price, 0);

          setTotal(totalAmount);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching cart data:", err);
          setError("An error occurred while loading the cart.");
          setLoading(false);
        }
      };

      fetchCartData();
    
  }, [supabase, setTotal]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <p>Total: {total}</p>;
}

export default function CartTotal() {
  function onBuy(){
    console.log("asdas");
}
  return (
    <div className={styles.osnovnoy}>
    <TotalProvider>
      <CartTotalComponent />
    </TotalProvider>
    <button onClick={onBuy} className={styles.change_btn}>Order</button>
    </div>
  );
}
