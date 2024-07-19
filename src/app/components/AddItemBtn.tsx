"use client";

import { addItem } from "./actions";
import style from "./css/menu.module.css";

export default function AddItemBtn() {
  return (
    <button className={style.btn} onClick={() => addItem()}>
      Add Item
    </button>
  );
}
