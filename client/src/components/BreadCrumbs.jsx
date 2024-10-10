import { Link } from "react-router-dom";
import styles from "./BreadCrumbs.module.css";

export default function BreadCrumbs({ crumbs = [] }) {
  return (
    <ul className={styles.breadcrumbs}>
      {crumbs.map(({ text, linkTo }, index) => (
        <li key={index} className={styles.crumb}>
          <Link to={linkTo} className={styles.link}>
            {text}
          </Link>
          {index !== crumbs.length - 1 && (
            <span className={styles.separator}>\</span>
          )}
        </li>
      ))}
    </ul>
  );
}
