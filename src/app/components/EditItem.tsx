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
  const [price, setPrice] = useState<number>(parseFloat(item["price"]));
  const [description, setDescription] = useState<string>(item["description"] as string);

  // Added state for error messages
  const [errors, setErrors] = useState({ name: '', pic: '', description: '', price: '' });

  // Updated handlers to clear errors when user types
  const handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setName(e.target.value);
    setErrors({ ...errors, name: '' });
  };

  const handlePicChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    setPic(e.target.value);
    setErrors({ ...errors, pic: '' });
  };

  const handleDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void = (e) => {
    setDescription(e.target.value);
    setErrors({ ...errors, description: '' });
  };

  const handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const value = e.target.value;
    setPrice(parseFloat(value));
    setErrors({ ...errors, price: '' });
  };

  // Added form validation in handleSubmit
  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> = async (e) => {
    e.preventDefault();

    const newErrors: any = {};
    if (!name) newErrors.name = 'Name is required';
    if (!pic) newErrors.pic = 'Picture source is required';
    if (!description) newErrors.description = 'Description is required';
    if (!price || isNaN(price) || price <= 0) newErrors.price = 'Valid price is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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

  const handleDelete: (e: any) => Promise<void> = async (e: React.FormEvent<HTMLFormElement>, ) => {
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
          console.log("admin");
          console.log("Item: ", item, "Id: ", item["id"]);
          const response = await supabase
            .from("products")
            .delete()
            .eq("id", item["id"]);
          console.log("Error", response);
          navigateToAccount();
        } else {
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
          {errors.name && <div className={styles.error}>{errors.name}</div>} {/* Display error message for name */}
          <br />
          <label htmlFor="pic">Local picture src:</label>
          <input
            className={styles.input}
            value={pic}
            id="pic"
            onChange={handlePicChange}
          ></input>
          {errors.pic && <div className={styles.error}>{errors.pic}</div>} {/* Display error message for pic */}
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            cols={70}
            rows={15}
            value={description}
            id="description"
            onChange={handleDescriptionChange}
          ></textarea>
          {errors.description && <div className={styles.error}>{errors.description}</div>} {/* Display error message for description */}
          <br />
          <label htmlFor="price">Price:</label>
          <input
            className={styles.input}
            value={price}
            type="number"
            id="price"
            onChange={handlePriceChange}
          ></input> ₽
          {errors.price && <div className={styles.error}>{errors.price}</div>} {/* Display error message for price */}
          <br />
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
