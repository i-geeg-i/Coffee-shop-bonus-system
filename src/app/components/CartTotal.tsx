"use client";
import { supabase } from "@/src/supabase/supabaseClient";
import { createClient } from "@/src/supabase/client";
import { useState, useEffect } from "react";

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

export default function CartTotal() {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  useEffect(() => {
    setTimeout(() => {
      const fetchCartData = async () => {
        try {
          const {
            data: { user },
          } = await supabase.auth.getUser();

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

          setTotal(totalAmount);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching cart data:", err);
          setError("An error occurred while loading the cart.");
          setLoading(false);
        }
      };

      fetchCartData();
    }, 1000);
  }, [supabase]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <p>Total: {total}</p>
    </>
  );
}
