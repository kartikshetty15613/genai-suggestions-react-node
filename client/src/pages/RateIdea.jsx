import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Rating } from "react-simple-star-rating";
import Container from "../components/Container";
import Button from "../components/Button";
import BreadCrumbs from "../components/BreadCrumbs";
import BreadCrumbsContainer from "../components/BreadCrumbsContainer";
import Modal from "../components/Modal";

import styles from "../pages/RateIdea.module.css";

export default function RateIdea() {
  const { ideaId } = useParams();
  const navigate = useNavigate();

  const [idea, setIdea] = useState({});
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/ideas/${ideaId}`
        );
        const { data } = await response.json();
        setIdea(data);

        if (data.rating) setRating(data.rating);
        if (data.comment) setComment(data.comment);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIdea();
  }, [ideaId]);

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsModalOpen(true);
      setModalType("loading");

      await fetch(`${import.meta.env.VITE_API_URL}/api/v1/ideas/${ideaId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      });

      setModalType("idea-(create/update)");
      setModalMessage("Rating updated successfully");

      setTimeout(() => {
        navigate("/admin/ideas");
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <BreadCrumbsContainer>
        <BreadCrumbs
          crumbs={[
            { text: "Home", linkTo: window.location.origin },
            { text: "Ideas", linkTo: "/admin/ideas" },
            { text: "Rate your idea", linkTo: `/admin/ideas/${ideaId}` },
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
        <div className={styles.ratingContainer}>
          <div className={styles.idea}>
            <h3>Title</h3>
            <p>{idea?.title}</p>

            <br />
            <h3>Category</h3>
            <p>{idea?.category?.name}</p>

            <br />
            <h3>Sub Category</h3>
            <p>{idea?.subCategory?.name}</p>

            <br />
            <h3>Description</h3>
            <p>{idea?.description}</p>

            <br />
            <br />
            <br />
            <br />
            <br />
            {/* <h4>Idea Submitted By</h4>
            <p>{idea?.submittedBy}</p> */}
          </div>

          <form className={styles.ratingForm} onSubmit={handleSubmit}>
            <p>RATE YOUR COMMENTS</p>

            <div className={styles.ratingBody}>
              <div className={styles.starsContainer}>
                <Rating
                  initialValue={rating}
                  className={styles.stars}
                  onClick={handleRatingClick}
                  size={50}
                />
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={styles.commentBox}
                placeholder="Share your comments..."
              />
            </div>

            <div className={styles.btnGroup}>
              <Button
                className={styles.ratingSubmitBtn}
                onClick={handleSubmit}
                action="submit"
                type="rate"
                size="full"
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
