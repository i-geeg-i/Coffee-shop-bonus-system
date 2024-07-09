import styles from "./css/NewsItem.module.css"
import Link from "next/link"


type Props = {
    title: string,
    img : string,
    info: string,
    buttonInfo: string,
    link: string
}

export default function NewsItemLeft(props : Props) {

    return (
        <div className={styles.news_item}>
            <img className={styles.item_pic} src={props.img}></img>
            <div className={styles.main_info}>
            <h1>{props.title}</h1>
            <p>{props.info}</p>
            <Link href = {props.link}><button className={styles.btn}>{props.buttonInfo}</button></Link>
            </div>
        </div>
    )
}