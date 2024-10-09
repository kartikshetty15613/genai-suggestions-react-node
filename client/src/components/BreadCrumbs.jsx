import styles from "./BreadCrumbs.module.css";

export default function BreadCrumbs({ crumbs = [] }) {
  return (
    <ul className={styles.breadcrumbs}>
      {crumbs.map((crumb, index) => (
        <li key={index} className={styles.crumb}>
          {index !== crumbs.length - 1 ? `${crumb} /` : crumb}
        </li>
      ))}
    </ul>
  );
}
