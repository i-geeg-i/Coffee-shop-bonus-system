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
      <Link href={{ pathname: "/menu/" + props.id.toLocaleString() }}>
        <img className={styles.item_pic} src={props.picSrc}></img>
      </Link>
      <p className={styles.item_name}>{props.name}</p>
      <Link href={{ pathname: "/account/" + props.id.toLocaleString() }}>
        <button className={styles.btn}>Edit</button>
      </Link>
    </div>
  );
}
