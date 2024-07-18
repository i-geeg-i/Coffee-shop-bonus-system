import Link from "next/link";
import TextField from "./TextField";
import styles from "./css/menu.module.css"; // Ensure the correct path
import MenuItem from "./MenuItem";

type Product = {
  id: number;
  img: string;
  name: string;
  price: number;
};

type Props = {
  products: Product[];
};

export default function Menu({ products }: Props) {
  if (!Array.isArray(products)) {
    console.error("Products prop is not an array");
    return <div>Error: Products prop is not an array</div>;
  }

  return (
    <div>
      <div className={styles.main_div}>
        <TextField
          header="Here is our menu!"
          text="By the way, you may order it from the website"
        />
        <div className={styles.items_div}>
          {products.map((product) => (
            <MenuItem
              key={product.id}
              picSrc={product.img}
              price={product.price}
              name={product.name}
              id={product.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
