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
<<<<<<< HEAD
  const [price, setPrice] = useState<number>(parseFloat(item["price"]));
=======
  const [price, setPrice] = useState<string>(item["price"] as string);
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
  const [description, setDescription] = useState<string>(
    item["description"] as string,
  );

<<<<<<< HEAD
  // Added state for error messages
  const [errors, setErrors] = useState({
    name: "",
    pic: "",
    description: "",
    price: "",
  });

  // Updated handlers to clear errors when user types
  const handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e,
  ) => {
    setName(e.target.value);
    setErrors({ ...errors, name: "" });
  };

  const handlePicChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e,
  ) => {
    setPic(e.target.value);
    setErrors({ ...errors, pic: "" });
  };

  const handleDescriptionChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void = (e) => {
    setDescription(e.target.value);
    setErrors({ ...errors, description: "" });
  };

  const handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e,
  ) => {
    const value = e.target.value;
    setPrice(parseFloat(value));
    setErrors({ ...errors, price: "" });
  };

  // Added form validation in handleSubmit
  const handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
  ) => Promise<void> = async (e) => {
    e.preventDefault();

    const newErrors: any = {};
    if (!name) newErrors.name = "Name is required";
    if (!pic) newErrors.pic = "Picture source is required";
    if (!description) newErrors.description = "Description is required";
    if (!price || isNaN(price) || price <= 0)
      newErrors.price = "Valid price is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

=======
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
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
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
<<<<<<< HEAD
=======
    console.log("Hi there! Button to submit clicked!!! Action!");
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
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
<<<<<<< HEAD
=======
          console.log("Huesos");
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
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
<<<<<<< HEAD
          {errors.name && <div className={styles.error}>{errors.name}</div>}{" "}
          {/* Display error message for name */}
=======
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
          <br />
          <label htmlFor="pic">Local picture src:</label>
          <input
            className={styles.input}
            value={pic}
<<<<<<< HEAD
            id="pic"
            onChange={handlePicChange}
          ></input>
          {errors.pic && <div className={styles.error}>{errors.pic}</div>}{" "}
          {/* Display error message for pic */}
=======
            id="name"
            onChange={handlePicChange}
          ></input>
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
          <br />
          <label htmlFor="description">Description:</label>
          <textarea
            cols={70}
            rows={15}
            value={description}
            id="description"
            onChange={handleDescriptionChange}
          ></textarea>
<<<<<<< HEAD
          {errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}{" "}
          {/* Display error message for description */}
=======
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
          <br />
          <label htmlFor="price">Price:</label>
          <input
            className={styles.input}
            value={price}
<<<<<<< HEAD
            type="number"
            id="price"
            onChange={handlePriceChange}
          ></input>{" "}
          ₽{errors.price && <div className={styles.error}>{errors.price}</div>}{" "}
          {/* Display error message for price */}
          <br />
=======
            id="price"
            onChange={handlePriceChange}
          ></input>{" "}
          ₽ <br />
>>>>>>> 2cbf9e6 (Добавлены изменения из zip-архива)
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
