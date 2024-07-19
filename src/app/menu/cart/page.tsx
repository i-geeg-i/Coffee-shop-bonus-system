import CartItems from "../../components/CartItems";
import CartPurchase from "../../components/CartPurchase";
import CartTotal from "../../components/CartTotal";
import styles from "./cart.module.css";

export default function Cart() {
    return (
        <><h1 style={{display: "block", width:"100%", height: "fit-content"}}>Cart</h1>
        <div className={styles.cart_div}>
            <CartItems onChange={CartTotal}/>
            <CartTotal/>
            <CartPurchase/>
        </div>
        </>
    )
}
