import { useState, useEffect } from "react";
import styles from "../pages/RateIdea.module.css";
import { Rating } from "react-simple-star-rating";
import Button from "../components/Button";
import BreadCrumbs from "../components/BreadCrumbs";
import BreadCrumbsContainer from "../components/BreadCrumbsContainer";
import { useParams } from "react-router-dom";

export default function RateIdea() {
  const { ideaId } = useParams();

  const [idea, setIdea] = useState({});
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/ideas/${ideaId}`
        );
        const { data } = await response.json();
        setIdea(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIdea();
  }, []);

  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(rating);
  };

  return (
    <>
      <BreadCrumbsContainer>
        <BreadCrumbs crumbs={["Home", "Ideas", "Rate Idea"]} />
      </BreadCrumbsContainer>

      <div className="container">
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
            <h4>Idea Submitted By</h4>
            <p>{idea?.submittedBy}</p>
          </div>

          <form className={styles.ratingForm} onSubmit={handleSubmit}>
            <p>RATE YOUR COMMENTS</p>

            <div className={styles.ratingBody}>
              <div className={styles.starsContainer}>
                <Rating
                  className={styles.stars}
                  onClick={handleRatingClick}
                  size={50}
                />
              </div>

              <textarea
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
      </div>
    </>
  );
}
