'use client'

import Link from "next/link";
import styles from "./item.module.css"
import { useSearchParams  } from 'next/navigation'
type Props = {
    params: {
        id: string;
    };
};

export default function Item({params: {id}}: Props) {
    const searchParams = useSearchParams();

    const name : string = searchParams.get('name') as string;
    const picSrc : string  = searchParams.get('picSrc') as string;
    const price : string  = searchParams.get('price') as string;
    return <>
    <Link href="/menu"><img src="/back.png" className={styles.go_back_btn}></img></Link>
    <div className={styles.main_block}>
        <div className={styles.left_block}>
            <img className={styles.item_pic} src={picSrc}></img>
        </div>
        <div className={styles.right_block}>
            <h1 className="item">{name}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at accumsan lectus. Etiam non imperdiet tellus, et molestie nisl. Suspendisse nibh nibh, malesuada et magna vitae, cursus pellentesque magna. Curabitur id lectus sed enim venenatis sagittis. In mattis tellus eleifend, cursus metus luctus, pretium magna. Suspendisse pulvinar sit amet sapien et venenatis. Pellentesque pretium, urna ut porta dictum, nisi purus hendrerit orci, eu ullamcorper purus eros sit amet quam. Cras ullamcorper velit felis, vitae viverra diam dictum imperdiet. Aenean sodales porta diam at imperdiet. Praesent id aliquet nunc, a auctor urna. Fusce pharetra ut ex in faucibus.</p>
            <button className={styles.price_btn}>{price + " ₽"}</button>
        </div>
        
    </div>
    </>;
}