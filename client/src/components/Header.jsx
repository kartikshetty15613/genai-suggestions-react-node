import invertedBulb from "../assets/inverted-bulb.png";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={invertedBulb} alt="Inverted Bulb" className={styles.logo} />

      <span className={styles.mainHeading}>
        Envision your <span>idea</span>
      </span>

      <span className={styles.subHeading}>Enterprise AI</span>
    </header>
  );
}
