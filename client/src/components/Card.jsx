import { useState } from "react";
import styles from "../components/Card.module.css";
import { Rating } from "react-simple-star-rating";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Card({ title, description }) {
  const [ratings, setRating] = useState(0);
  const [showCommentBox, setshowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const handleRatingClick = (rate) => {
    console.log(rate);
    setRating(rate);
  };

  const handleShowCommentBox = (e) => {
    e.preventDefault();
    setshowCommentBox(true);
  };

  const handleCloseCommentBox = (e)=>{
    e.preventDefault();
    setshowCommentBox(false);
  
  }

  const handleCommentChange = (e)=>{
      e.preventDefault()
      console.log(e.target.value)
      setComment(e.target.value)
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.cardActions}>
        <div className={styles.ratings}>
          <Rating onClick={handleRatingClick} />
        </div>

        <div className={styles.addComment}>
          <a onClick={handleShowCommentBox}>Add Comments</a>
        </div>

        <Link to={"/ideas/rate"}>
          {/* <Button >
               View
           </Button> */}
          <button className={styles.viewButton}>View</button>
        </Link>
      </div>

      {showCommentBox && (
        <div className={styles.commentBoxParent}>
          <div className={styles.commentBox}>
            <h3>Add Your Comment</h3>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              rows="4"
              className={styles.textarea}
              placeholder="Write your comment here..."
            ></textarea>
            <div className={styles.modalActions}>

              <button onClick={handleCloseCommentBox} className={styles.saveButton}>
                Save
              </button>

              <button
                onClick={handleCloseCommentBox}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
