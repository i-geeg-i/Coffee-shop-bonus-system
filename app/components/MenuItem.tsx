import styles from "./css/MenuItem.module.css"

type Props = {
    picSrc : string,
    price : number,
    name : string,
    id: number
}

export default function MenuItem(props : Props) {

    return (
        <div className={styles.menu_item}>
            <a href={"/menu/" + props.id.toLocaleString()}><img className={styles.item_pic} src={props.picSrc}></img></a>
            <p className={styles.item_name}>{props.name}</p>
            <button className={styles.price_btn}>{props.price + " ₽"}</button>
        </div>
    )
}