import styles from "./FormError.module.css";

export default function FormError({ msg }) {
  return <span className={styles.msgError}>{msg}</span>;
}
