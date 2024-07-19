"use client";

import Link from "next/link";
import styles from "./css/item.module.css";
import { redirect, useSearchParams } from "next/navigation";
import TextField from "./TextField";
import { useState } from "react";
import { supabase } from "@/src/supabase/supabaseClient";
import { navigateToAccount, navigateToLogin } from "./actions";
import { createClient } from "@/src/supabase/client";

type Props = {
  item: {
    id: number;
    name: string;
    picSrc: string;
    price: string;
    description: string;
  };
};

export default function EditItem({ item }: Props) {
  const searchParams = useSearchParams();

  const [name, setName] = useState<string>(item["name"] as string);
  const [pic, setPic] = useState<string>(item["picSrc"] as string);
  const picSrc: string = item["picSrc"] as string;
  const [price, setPrice] = useState<string>(item["price"] as string);
  const [description, setDescription] = useState<string>(
    item["description"] as string,
  );

  const handleNameChange: (e: any) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(e.target.value);
  };

  const handlePicChange: (e: any) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPic(e.target.value);
  };

  const handleDescriptionChange: (e: any) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDescription(e.target.value);
  };

  const handlePriceChange: (e: any) => void = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPrice(e.target.value);
  };

  const handleSubmit: (e: any) => Promise<void> = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("Got user: ", user);
    if (!user) {
      console.log("Please login");
      navigateToLogin();
    } else {
      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        console.error("Error fetching cart:", error);
        navigateToLogin();
      } else {
        console.log("More user info: ", data, error);
        if (data["is_admin"]) {
          console.log("Item: ", item, "Id: ", item["id"]);
          const { error } = await supabase
            .from("products")
            .update({
              name: name,
              description: description,
              price: price,
              img: pic,
            })
            .eq("id", item["id"]);
          console.log("Error", error);
          navigateToAccount();
        } else {
          navigateToLogin();
        }
      }
    }
  };

  const handleDelete: (e: any) => Promise<void> = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    console.log("Hi there! Button to submit clicked!!! Action!");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("Got user: ", user);
    if (!user) {
      console.log("Please login");
      navigateToLogin();
    } else {
      const { data, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        console.error("Error fetching cart:", error);
        navigateToLogin();
      } else {
        console.log("More user info: ", data, error);
        if (data["is_admin"]) {
          console.log("admin");
          console.log("Item: ", item, "Id: ", item["id"]);
          const response = await supabase
            .from("products")
            .delete()
            .eq("id", item["id"]);
          console.log("Error", response);
          navigateToAccount();
        } else {
          console.log("Huesos");
          navigateToLogin();
        }
      }
    }
  };

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
          <input
            className={styles.input}
            value={name}
            id="name"
            onChange={handleNameChange}
          ></input>
          <br />
          <label htmlFor="pic">Local picture src:</label>
          <input
            className={styles.input}
            value={pic}
            id="name"
            onChange={handlePicChange}
          ></input>
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            cols={70}
            rows={15}
            value={description}
            id="description"
            onChange={handleDescriptionChange}
          ></textarea>
          <br />
          <label htmlFor="price">Price:</label>
          <input
            className={styles.input}
            value={price}
            id="price"
            onChange={handlePriceChange}
          ></input>{" "}
          ₽ <br />
          <button className={styles.delete_btn} onClick={handleDelete}>
            Delete
          </button>
          <button className={styles.submit_btn} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
