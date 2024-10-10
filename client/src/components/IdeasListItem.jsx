import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../components/IdeasListItem.module.css";
import { Rating } from "react-simple-star-rating";
import Button from "./Button";

export default function IdeaListItem({ idea, onRatingChange, onAddComment }) {
  const navigate = useNavigate();
  const [showCommentBox, setshowCommentBox] = useState(false);
  const [ideaToComment, setIdeaToComment] = useState("");
  const [comment, setComment] = useState("");
  const [disableCommentSubmit, setDisableCommentSubmit] = useState(true);

  const handleRatingClick = (ideaId, rate) => {
    onRatingChange(ideaId, rate);
  };

  const handleCommentSubmit = () => {
    onAddComment(ideaToComment, comment);
  };

  const handleCommentChange = (e) => {
    if (e.target.value) {
      setDisableCommentSubmit(false);
    }

    setComment(e.target.value);
  };

  const handleShowCommentBox = (ideaId) => {
    setIdeaToComment(ideaId);
    setshowCommentBox(true);
  };

  const handleCloseCommentBox = (e) => {
    e.preventDefault();
    setComment("");
    setshowCommentBox(false);
  };

  return (
    <div className={styles.ideaItem}>
      <div className={styles.itemContent}>
        <h3>{idea.title}</h3>
        <p>{idea.description}</p>
      </div>
      <div className={styles.itemAction}>
        <div className={styles.ratings}>
          <Rating
            onClick={(rate) => handleRatingClick(idea._id, rate)}
            initialValue={idea.rating || 0}
          />
        </div>

        <div className={styles.addComment}>
          <a onClick={() => handleShowCommentBox(idea._id)}>Add Comments</a>
        </div>

        <Button
          className={styles.viewButton}
          onClick={() => navigate(`/ideas/${idea._id}/rate`)}
        >
          View
        </Button>
      </div>

      {showCommentBox && (
        <div className={styles.commentBoxParent}>
          <div className={styles.commentBox}>
            <h3>Add Your Comment for {ideaToComment}</h3>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              rows="4"
              className={styles.textarea}
              placeholder="Write your comment here..."
            ></textarea>
            <div className={styles.modalActions}>
              <button
                onClick={handleCommentSubmit}
                className={styles.saveButton}
                disabled={disableCommentSubmit}
              >
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
