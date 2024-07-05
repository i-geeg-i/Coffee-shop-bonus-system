import Link from "next/link";
import TextField from "../components/TextField";
import styles from "./menu.module.css"
import MenuItem from "../components/MenuItem";

export default function Menu() {
    return( <div>
        {/* <h1 className="main-title">Menu</h1> */}
        <div className={styles.main_div}>
        <TextField header="Here is our menu!" text="By the way, you may order it from website" />
        <div className={styles.items_div}>
        <MenuItem picSrc="/iced_latte.jpg" name="Iced latte" id={1} price={69} />
        <MenuItem picSrc="/espresso.jpg" name="Espresso" id={2} price={69} />
        <MenuItem picSrc="/cappuccino.jpg" name="Cappuccino" id={3} price={69} />
        <MenuItem picSrc="/bergeron.jpg" name="Bergeron" id={4} price={69} />
        <MenuItem picSrc="/croissant.jpg" name="Croissant" id={5} price={69} />
        </div>
        </div>
        <Link href="/">Go back</Link>
        </div>
    )
}