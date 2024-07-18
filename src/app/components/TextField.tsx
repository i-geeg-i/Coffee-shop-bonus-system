import styles from "./css/TextField.module.css";

type Props = {
  header?: string;
  text: string;
};

export default function TextField(props: Props) {
  if (props.header != undefined) {
    return (
      <div className={styles.text_field}>
        <h2>{props.header}</h2>
        <p>{props.text}</p>
      </div>
    );
  }
  return (
    <div className={styles.text_field}>
      <p>{props.text}</p>
    </div>
  );
}
