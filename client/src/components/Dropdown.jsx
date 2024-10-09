import styles from "./Dropdown.module.css";

export default function Dropdown({ options, placeholder = "", onChange }) {
  return (
    <select className={styles.dropdown} defaultValue="" onChange={onChange}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(({ name, _id }) => (
        <option key={_id} value={_id}>
          {name}
        </option>
      ))}
    </select>
  );
}
