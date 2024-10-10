import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";

import Modal from "../components/Modal";

import styles from "./PostIdea.module.css";

import Button from "../components/Button";
import Container from "../components/Container";
import Dropdown from "../components/Dropdown";
import BreadCrumbs from "../components/BreadCrumbs";
import BreadCrumbsContainer from "../components/BreadCrumbsContainer";
import FormError from "../components/FormError";

export default function PostIdea() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
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

  const handleYesClick = () => {
    navigate(0);
  };

  const onIdeaSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !selectedCategory ||
      !selectedSubCategory ||
      !description ||
      !rating ||
      !comment
    ) {
      return setError("Please fill all required fields");
    }

    // if (!title) {
    //   return setError("Please add title");
    // }

    // if (!selectedCategory) {
    //   return setError("Please select category");
    // }

    // if (!selectedSubCategory) {
    //   return setError("Please select subcategory");
    // }

    // if (!description) {
    //   return setError("Please describe your idea");
    // }

    // if (!rating) {
    //   return setError("Please add rating");
    // }

    // if (!comment) {
    //   return setError("Please add comment");
    // }

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
          comment,
          rating,
        }),
      });

      setModalType("idea-(create/update)");
      setModalMessage("Your idea has been submitted");

      setError("");

      // setTimeout(() => {
      //   navigate("/");
      // }, 1000);
    } catch (err) {
      console.error(err);
      setIsModalOpen(true);
      setError("Something went wrong! Please try again later");
    } finally {
      setDisable(false);
      setSelectedCategory("");
      setSelectedSubCategory("");
      setTitle("");
      setDescription("");
      setRating(0);
      setComment("");
    }
  };

  const handleReset = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setTitle("");
    setDescription("");
    setRating(0);
    setComment("");
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
      >
        <br />
        <p>Do you want to submit another idea ?</p>
        <div className={`${styles.modalBtnGroup} ${styles.btnGroup}`}>
          <Button type="submit" onClick={handleYesClick}>
            Yes
          </Button>
          <Button type="cancel" onClick={() => navigate("/dashboard")}>
            No
          </Button>
        </div>
      </Modal>

      <Container>
        <div className={styles.postIdea}>
          <form className={styles.form}>
            <div className={styles.formSectionOne}>
              <div className={styles.row}>
                <label htmlFor="idea-title">
                  Idea Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  required
                  id="idea-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className={styles.row}>
                <label htmlFor="category">
                  Category <span className="required">*</span>
                </label>
                <Dropdown
                  options={categories}
                  placeholder="Select Category"
                  onChange={onCategoryChange}
                />
              </div>

              <div className={styles.row}>
                <label>
                  Sub Category <span className="required">*</span>
                </label>
                <Dropdown
                  options={selectedCategory?.subCategories || []}
                  placeholder="Select Subcategory"
                  onChange={onSubCategoryChange}
                />
              </div>

              <div className={styles.row}>
                <label>
                  Describe the idea <span className="required">*</span>
                </label>
                <textarea
                  placeholder="Upto 250 words"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className={styles.formSectionTwo}>
              <div className={styles.row}>
                <label>
                  Rate your idea <span className="required">*</span>{" "}
                  <div className="tooltip">
                    <i className="fa fa-info-circle"></i>
                    <span className="tooltiptext">Guidelines</span>
                  </div>
                </label>

                <Rating size={30} onClick={(e) => setRating(e)} />
              </div>

              <div className={styles.row}>
                <label>
                  Comments <span className="required">*</span>{" "}
                  <div className="tooltip">
                    <i className="fa fa-info-circle"></i>
                    <span className="tooltiptext">Guidelines</span>
                  </div>
                </label>
                <textarea
                  placeholder="Upto 250 words"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className={styles.imgContainer}></div>
          </form>

          {error && <FormError msg={error} />}

          <div className={styles.btnGroup}>
            <Button
              type="submit"
              action="submit"
              disabled={disable}
              onClick={onIdeaSubmit}
            >
              Submit
            </Button>
            <Button type="cancel" disabled={disable} onClick={handleReset}>
              Reset
            </Button>
          </div>

          {/* <img src={ideaFormImage} alt="Idea form Image" /> */}
        </div>
      </Container>
    </>
  );
}
