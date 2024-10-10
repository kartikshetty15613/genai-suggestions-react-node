import styles from "./BreadCrumbsContainer.module.css";
import Container from "./Container";

export default function BreadCrumbsContainer({ children }) {
  return (
    <div className={`${styles.breadcrumbsContainer}`}>
      <Container className="container">{children}</Container>
    </div>
  );
}
