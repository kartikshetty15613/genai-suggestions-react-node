import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

import styles from "./PostIdea.module.css";

import ideaFormImage from "../assets/idea-form-image.png";

export default function PostIdea() {
  const categories = [
    { name: "Test 1", id: 1 },
    { name: "Test 2", id: 2 },
  ];
  return (
    <div className={styles.postIdea}>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="idea-title">Idea Title*</label>
          <input type="text" id="idea-title" />
        </div>

        <div className={styles.row}>
          <label htmlFor="category">Category*</label>
          <Dropdown options={categories} />
        </div>

        <div className={styles.row}>
          <label>Sub Category</label>
          <Dropdown options={categories} />
        </div>

        <div className={styles.row}>
          <label>Describe the idea*</label>
          <textarea placeholder="Upto 250 words" maxLength={250}></textarea>
        </div>

        <div>
          <Button type="submit">Submit</Button>
          <Button type="cancel">Cancel</Button>
        </div>
      </form>

      <img src={ideaFormImage} alt="Idea form Image" />
    </div>
  );
}
