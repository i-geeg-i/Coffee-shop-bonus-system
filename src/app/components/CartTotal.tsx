"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { supabase } from "@/src/supabase/supabaseClient";
import { createClient } from "@/src/supabase/client";
import { TotalProvider, useTotal } from "./useTotal";

import styles from "./css/CartTotal.module.css";
import { navigateToAccount } from "./actions";

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
    return () => {
      updateOutside = null;
    };
  }, [setTotal]);

  const supabaseAuth = createClient();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const {
          data: { user },
        } = await supabaseAuth.auth.getUser();

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
        const validProducts = products.filter(
          (product) => product !== null,
        ) as ProductDisp[];
        const totalAmount = validProducts.reduce(
          (acc, product) => acc + product.amount * product.price,
          0,
        );
        console.log(validProducts);
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
  async function onBuy() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("User not logged in.");
      return;
    }

    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("cart, bonuses, purchase_history")
        .eq("id", user.id)
        .single();

      if (profileError || !profileData) {
        console.error("Error fetching profile data:", profileError);
        return;
      }

      const cart = profileData.cart as Data;

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
      const validProducts = products.filter(
        (product) => product !== null,
      ) as ProductDisp[];
      const totalCost = validProducts.reduce(
        (acc, product) => acc + product.amount * product.price,
        0,
      );
      const bonus = totalCost * 0.1;
      const newBonuses = (profileData.bonuses || 0) + bonus;

      const items = cart.cart.products.map((product) => ({
        [product.id]: product.amount,
      }));

      const { data: purchaseData, error: purchaseError } = await supabase
        .from("purchases")
        .insert([
          {
            items,
            date: new Date(),
            status: "done",
          },
        ])
        .select();

      if (purchaseError) {
        console.error("Error inserting purchase data:", purchaseError);
        return;
      }

      const purchaseHistory = profileData.purchase_history || [];
      purchaseHistory.push(purchaseData[0].id);

      await supabase
        .from("profiles")
        .update({
          purchase_history: purchaseHistory,
          bonuses: newBonuses,
          cart: { cart: { promo: "", products: [] } },
        })
        .eq("id", user.id);

      console.log("Purchase successful:", purchaseData);
      console.log("Cart cleared and bonuses added.");
      navigateToAccount();
    } catch (error) {
      console.error("Error during purchase:", error);
    }
  }

  return (
    <div className={styles.osnovnoy}>
      <TotalProvider>
        <CartTotalComponent />
      </TotalProvider>
      <button onClick={onBuy} className={styles.change_btn}>
        Order
      </button>
    </div>
  );
}
