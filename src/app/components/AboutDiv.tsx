import Image from "next/image";
import styles from "./css/AboutDiv.module.css";

type Props = {
  text: Array<Array<string>>;
  picSrc: string;
};

export default function AboutDiv(props: Props) {
  const iterText = (x: Array<string>) => (
    <>
      <h3 className={styles.subhead}>{x[0]} </h3>
      <p>{x[1]}</p>
    </>
  );
  return (
    <div className={styles.aboutdiv}>
      <div className={styles.text}>{props.text.map(iterText)}</div>
      <Image
        className={styles.image}
        src={props.picSrc}
        alt="CoffeeIn stand"
        width={300}
        height={400}
      />
    </div>
  );
}
