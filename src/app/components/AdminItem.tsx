import Link from "next/link";
import styles from "./css/MenuItem.module.css";

type Props = {
  picSrc: string;
  price: number;
  name: string;
  id: number;
};

export default function AdminItem(props: Props) {
  return (
    <div className={styles.menu_item}> 
        <img className={styles.item_pic} src={props.picSrc}></img>
      <p className={styles.item_name}>{props.name}</p>
      <button className={styles.btn}>Edit Item</button>
      <button className={styles.btn}>Delete Item</button>
    </div>
  );
}