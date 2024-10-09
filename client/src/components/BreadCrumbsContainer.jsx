import styles from "./BreadCrumbsContainer.module.css";

export default function BreadCrumbsContainer({ children }) {
  return (
    <div className={`${styles.breadcrumbsContainer}`}>
      <div className="container">{children}</div>
    </div>
  );
}
