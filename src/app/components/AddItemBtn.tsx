"use client";

import { addItem } from "./actions";
import style from "./css/MenuItem.module.css";

export default function AddItemBtn() {
  return (
    <button className={style.btn} onClick={() => addItem()}>
      Add Item
    </button>
  );
}
