import { useEffect, useState } from "react";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";

import styles from "./PostIdea.module.css";

import ideaFormImage from "../assets/idea-form-image.png";
import BreadCrumbs from "../components/BreadCrumbs";
import BreadCrumbsContainer from "../components/BreadCrumbsContainer";

export default function PostIdea() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/categories`,
          {
            method: "GET",
          }
        );

        const { data } = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const onCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (cat) => cat._id === e.target.value
    );

    setSelectedCategory(selectedCategory);
  };

  const onSubCategoryChange = (e) => {
    const selectedSubCategory = selectedCategory.subCategories.find(
      (subCat) => subCat._id === e.target.value
    );

    setSelectedSubCategory(selectedSubCategory);
  };

  const onIdeaSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <BreadCrumbsContainer>
        <BreadCrumbs crumbs={["Home", "Post Idea"]} />
      </BreadCrumbsContainer>

      <div className="container">
        <div className={styles.postIdea}>
          <form className={styles.form} onSubmit={onIdeaSubmit}>
            <div className={styles.row}>
              <label htmlFor="idea-title">Idea Title*</label>
              <input
                type="text"
                id="idea-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={styles.row}>
              <label htmlFor="category">Category*</label>
              <Dropdown
                options={categories}
                placeholder="Select Category"
                onChange={onCategoryChange}
              />
            </div>

            <div className={styles.row}>
              <label>Sub Category</label>
              <Dropdown
                options={selectedCategory?.subCategories || []}
                placeholder="Select Subcategory"
                onChange={onSubCategoryChange}
              />
            </div>

            <div className={styles.row}>
              <label>Describe the idea*</label>
              <textarea placeholder="Upto 250 words"></textarea>
            </div>

            <div className={styles.btnGroup}>
              <Button type="submit">Submit</Button>
              <Button type="cancel">Cancel</Button>
            </div>
          </form>

          <div className={styles.imgContainer}>
            <img src={ideaFormImage} alt="Idea form Image" />
          </div>
        </div>
      </div>
    </>
  );
}
