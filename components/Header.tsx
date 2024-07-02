import styles from './css/Header.module.css';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.icon}><Image src="/home.png" width={10} height={10} alt="Home" /></a>
        <a href="/info" className={styles.icon}><Image src="/info.png" width={10} height={10} alt="Info" /></a>
        <a href="/menu" className={styles.icon}><Image src="/menu.png" width={10} height={10} alt="Menu" /></a>
        <a href="/profile" className={styles.icon}><Image src="/profile.png" width={10} height={10} alt="Profile" /></a>
      </div>
    </header>
  );
}

export default Header;