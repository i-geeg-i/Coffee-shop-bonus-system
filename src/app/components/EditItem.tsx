"use client";

import Link from "next/link";
import styles from "./css/item.module.css";
import { useSearchParams } from "next/navigation";
import TextField from "./TextField";
import { useState } from "react";
import { supabase } from "@/src/supabase/supabaseClient";

type Props = {
  data: {
    id: number;
    name: string;
    picSrc: string;
    price: string;
    description: string;
  };
};



export default function EditItem({ data }: Props) {
  const searchParams = useSearchParams();

  const [name, setName] = useState<string>(data["name"] as string);
  const picSrc: string = data["picSrc"] as string;
  const [price, setPrice] = useState<string>(data["price"] as string);
  const [description, setDescription] = useState<string>(data["description"] as string);

  const handleNameChange: (e: any) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }

  const handleDescriptionChange: (e: any) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }

  const handlePriceChange: (e: any) => void = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  }

  const handleSubmit: (e: any) => Promise<void> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
    .from('products')
    .update({ name: name, description: description, price: price})
    .eq('id', data["id"])
  }

  const handleDelete: (e: any) => Promise<void> = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("DELETING");

    const response = await supabase
    .from('products')
    .delete()
    .eq('id', data["id"])
  }

  return (
    <>
      <Link href="/account">
        <img src="/back.png" className={styles.go_back_btn}></img>
      </Link>
      <div className={styles.main_block}>
        <div className={styles.left_block}>
          <img className={styles.item_pic} src={picSrc}></img>
        </div>
        <form className={styles.right_block_edit} onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
          <input className={styles.input} value={name} id="name" onChange={handleNameChange}></input><br />
          <label htmlFor="description">Description:</label>
          <textarea cols={70} rows={15} value={description} id="description" onChange={handleDescriptionChange}></textarea><br />
          <label htmlFor="price">Price:</label>
          <input className={styles.input} value={price} id="price" onChange={handlePriceChange}></input> ₽ <br />
          <button className={styles.delete_btn} onClick={handleDelete}>Delete</button>
            <button className={styles.submit_btn} type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
