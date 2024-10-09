export default function Dropdown({ options }) {
  return (
    <select>
      {options.map(({ name, id }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
