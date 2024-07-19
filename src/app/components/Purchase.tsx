'use client'
import { supabase } from "@/src/supabase/supabaseClient";
import React, { useEffect, useState } from 'react';
import styles from './css/Purchase.module.css';

interface Product {
  id: number;
  name: string;
  description: string;
  img: string;
  price: number;
}

interface PurchaseProps {
  itemsIds: number[];
  date: Date;
  status: string;
}

export default function Purchase({ itemsIds, date, status }: PurchaseProps) {
  const [items, setItems] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems: Product[] = [];

      for (const itemId of itemsIds) {
        try {
          const { data, error } = await supabase
            .from('products')
            .select()
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

  const getStatusImage = (status: string) => {
    switch (status) {
      case 'done':
        return '/done.png'; // Replace with actual image path
      case 'in progress':
        return '/in_progress.png'; // Replace with actual image path
      case 'cancelled':
        return '/cancelled.png'; // Replace with actual image path
      default:
        return '';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['checkmark-container']}>
        <img src={getStatusImage(status)} alt={status} className={styles['status-icon']} />
      </div>
      <div className={styles.content}>
        <div className={styles.date}>Order {date.toLocaleDateString()}</div>
        <ul className={styles['item-list']}>
          {items.map(item => (
            <li key={item.id} className={styles.item}>
              {item.name} {item.price}₽
            </li>
          ))}
        </ul>
        <div className={styles.total}>
          Total: {totalPrice}₽
        </div>
        <div className={styles.bonus}>
          Bonuses: <span className={styles['bonus-value']}>{bonus}</span>
        </div>
      </div>
      <div className={styles.refresh}>
        <span className={styles['refresh-icon']}>↻</span>
      </div>
    </div>
  );
}
