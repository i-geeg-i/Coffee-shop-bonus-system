import Link from "next/link";
import Menu from "../components/Menu";
import styles from "./menu.module.css";

export default async function MenuPage() {
  let res = await fetch(`http://localhost:3000/api/menu`, {
    method: "GET",
    headers: new Headers({
      Authorization: "Basic",
    }),
  });

  if (!res.ok) {
    console.log("Error fetching menu data:", res.statusText);
    return <div>No items available now</div>;
  }

  let data = await res.json();
  // console.log("Data fetched:", data);

  // Check if the data is an array
  if (!Array.isArray(data)) {
    console.error("Invalid data format:", data);
    return <div>No items available now</div>;
  }

  return (
    <Menu products={data} /> // Pass the products array to Menu component
  );
}
