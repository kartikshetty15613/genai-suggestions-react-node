import styles from "./Button.module.css";

export default function Button({
  children,
  onClick,
  action = "button",
  type = "submit",
  size = "default",
  className = "",
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]} ${styles[size]} ${className}`}
      type={action}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
