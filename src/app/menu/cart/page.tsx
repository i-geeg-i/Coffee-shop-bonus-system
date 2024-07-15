import CartItems from "../../components/CartItems"
import styles from "./cart.module.css"

export default function Cart() {
    return (
        <div className={styles.cart_div}>
            <h1>Cart</h1>
            <CartItems />
        </div>
    )
}