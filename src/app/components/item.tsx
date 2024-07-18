"use client";

import Link from "next/link";
import styles from "./css/item.module.css";
import { useSearchParams } from "next/navigation";

type Props = {
  data: {
    id: string;
    name: string;
    picSrc: string;
    price: string;
    description: string;
  };
};

export default function Item({ data }: Props) {
  const searchParams = useSearchParams();

  const name: string = data["name"] as string;
  const picSrc: string = data["picSrc"] as string;
  const price: string = data["price"] as string;
  const description: string = data["description"] as string;
  return (
    <>
      <Link href="/menu">
        <img src="/back.png" className={styles.go_back_btn}></img>
      </Link>
      <div className={styles.main_block}>
        <div className={styles.left_block}>
          <img className={styles.item_pic} src={picSrc}></img>
        </div>
        <div className={styles.right_block}>
          <h1 className="item">{name}</h1>
          <p>{description}</p>
          <button className={styles.price_btn}>{price + " ₽"}</button>
        </div>
      </div>
    </>
  );
}
