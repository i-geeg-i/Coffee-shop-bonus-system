"use client";
import { supabase } from "@/src/supabase/supabaseClient";
import React, { useEffect, useState } from "react";
import styles from "./css/Purchase.module.css";

interface Product {
  id: number;
  name: string;
  description: string;
  img: string;
  price: number;
}

interface Item {
  [key: string]: number;
}

interface PurchaseProps {
  items: Item[];
  date: Date;
  status: string;
}

export default function Purchase({ items, date, status }: PurchaseProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const productIds = items.map((item) => Object.keys(item)[0]);
        const fetchedProducts = await Promise.all(
          productIds.map(async (productId) => {
            const { data, error } = await supabase
              .from("products")
              .select()
              .eq("id", parseInt(productId))
              .single();

            if (error) {
              console.error("Error fetching product:", error);
              return null;
            }
            return data as Product;
          }),
        );

        const validProducts = fetchedProducts.filter(
          (product) => product !== null,
        ) as Product[];
        const fetchedQuantities = items.reduce(
          (acc, item) => {
            const productId = parseInt(Object.keys(item)[0]);
            acc[productId] = item[Object.keys(item)[0]];
            return acc;
          },
          {} as { [key: number]: number },
        );

        setProducts(validProducts);
        setQuantities(fetchedQuantities);
      } catch (error) {
        console.error("Unexpected error fetching products:", error);
      }
    };

    fetchItems();
  }, [items]);

  const getTotalPrice = () => {
    return products.reduce(
      (total, product) => total + product.price * (quantities[product.id] || 1),
      0,
    );
  };

  const totalPrice = getTotalPrice();
  const bonus = totalPrice * 0.1;

  const getStatusImage = (status: string) => {
    switch (status) {
      case "done":
        return "/done.png"; // Replace with actual image path
      case "in progress":
        return "/in_progress.png"; // Replace with actual image path
      case "cancelled":
        return "/cancelled.png"; // Replace with actual image path
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["checkmark-container"]}>
        <img
          src={getStatusImage(status)}
          alt={status}
          className={styles["status-icon"]}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.date}>Order {date.toLocaleDateString()}</div>
        <ul className={styles["item-list"]}>
          {products.map((product) => (
            <li key={product.id} className={styles.item}>
              {product.name} {product.price}₽ x {quantities[product.id]} ={" "}
              {product.price * quantities[product.id]}₽
            </li>
          ))}
        </ul>
        <div className={styles.total}>Total: {totalPrice}₽</div>
        <div className={styles.bonus}>
          Bonuses: <span className={styles["bonus-value"]}>{bonus}</span>
        </div>
      </div>
      <div className={styles.refresh}>
        <span className={styles["refresh-icon"]}>↻</span>
      </div>
    </div>
  );
}
