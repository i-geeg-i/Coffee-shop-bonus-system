import styles from "./css/Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.icon}>
          <Image src="/home.png" width={100} height={100} alt="Home" />
        </a>
        <a href="/info" className={styles.icon}>
          <Image src="/info.png" width={100} height={100} alt="Info" />
        </a>
        <a href="/menu" className={styles.icon}>
          <Image src="/menu.png" width={100} height={100} alt="Menu" />
        </a>
        <a href="/profile" className={styles.icon}>
          <Image src="/profile.png" width={100} height={100} alt="Profile" />
        </a>
      </div>
    </header>
  );
};

export default Header;
