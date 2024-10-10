import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

import styles from "./PostIdea.module.css";

import Button from "../components/Button";
import Container from "../components/Container";
import Dropdown from "../components/Dropdown";
import BreadCrumbs from "../components/BreadCrumbs";
import BreadCrumbsContainer from "../components/BreadCrumbsContainer";
import FormError from "../components/FormError";

import ideaFormImage from "../assets/idea-form-image.png";

export default function PostIdea() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate();

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

    selectedCategory.subCategories.sort((a, b) => a.name.localeCompare(b.name));

    setSelectedCategory(selectedCategory);
  };

  const onSubCategoryChange = (e) => {
    const selectedSubCategory = selectedCategory.subCategories.find(
      (subCat) => subCat._id === e.target.value
    );

    setSelectedSubCategory(selectedSubCategory);
  };

  const onIdeaSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory || !selectedSubCategory) {
      return setError("Please select a category and subcategory");
    }

    if (!title) {
      return setError("Please give a title");
    }

    if (!description) {
      return setError("Please describe your idea");
    }

    try {
      setDisable(true);
      setIsModalOpen(true);
      setModalType("loading");

      await fetch(`${import.meta.env.VITE_API_URL}/api/v1/ideas`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          category: selectedCategory._id,
          subCategory: selectedSubCategory._id,
          description: description,
          submittedBy: "John Doe",
          role: "sales",
        }),
      });

      setModalType("idea-(create/update)");
      setModalMessage("Your idea has been submitted");

      setError("");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      setIsModalOpen(true);
      setError("Something went wrong! Please try again later");
    } finally {
      setDisable(false);
      setSelectedCategory(null);
      setSelectedSubCategory(null);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <>
      <BreadCrumbsContainer>
        <BreadCrumbs
          crumbs={[
            { text: "Home", linkTo: window.location.origin },
            { text: "Post your ideas", linkTo: "/ideas/post" },
          ]}
        />
      </BreadCrumbsContainer>

      <Modal
        isOpen={isModalOpen}
        toggleModal={setIsModalOpen}
        type={modalType}
        msg={modalMessage}
      ></Modal>

      <Container>
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
              <textarea
                placeholder="Upto 250 words"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {error && <FormError msg={error} />}

            <div className={styles.btnGroup}>
              <Button type="submit" action="submit" disabled={disable}>
                Submit
              </Button>
              <Button type="cancel" disabled={disable}>
                Cancel
              </Button>
            </div>
          </form>

          <div className={styles.imgContainer}>
            <img src={ideaFormImage} alt="Idea form Image" />
          </div>
        </div>
      </Container>
    </>
  );
}
