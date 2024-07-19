'use client'
import { supabase } from "@/src/supabase/supabaseClient";
import { UUID } from "crypto";
import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  img: string;
  price: number;
}

interface PurchaseProps {
  id: number;
  itemsIds: number[];
  date: Date;
  status: string;
  user_id: UUID;
}

export default function Purchase({ id, itemsIds, date, status, user_id }: PurchaseProps) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems: Product[] = [];

      for (const itemId of itemsIds) {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', itemId)
            .single();

          if (error) {
            console.error('Error fetching product:', error);
          } else if (data) {
            fetchedItems.push(data);
          }
        } catch (error) {
          console.error('Unexpected error fetching product:', error);
        }
      }

      setItems(fetchedItems);
    };

    fetchItems();
  }, [itemsIds]);

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const totalPrice = getTotalPrice();
  const bonus = totalPrice * 0.05;

  return (
    <div className="flex rounded-lg p-3 w-3/4">
      <div className={`flex items-center justify-center rounded-lg w-2/5 h-auto ${status}`}>
        <span className="checkmark">✔</span>
      </div>
      <div className="flex-grow px-3">
        <div className="date">Order {date.toDateString()}</div>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}₽
            </li>
          ))}
        </ul>
        <div className="total">
          Total: {totalPrice}₽
        </div>
        <div className="bonus">
          Bonuses: <span className="bonus-value">{bonus}</span>
        </div>
      </div>
      <div className="refresh">
        <span className="refresh-icon">↻</span>
      </div>
    </div>
  );
}
