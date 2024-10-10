import { useNavigate } from "react-router-dom";
import styles from "../components/IdeasListItem.module.css";
import { Rating } from "react-simple-star-rating";
import Button from "./Button";

export default function IdeaListItem({ idea, onRatingChange, onAddComment }) {
  const navigate = useNavigate();

  return (
    <div className={styles.ideaItem}>
      <div className={styles.itemContent}>
        <h3>{idea.title}</h3>
        <p>{idea.description}</p>
      </div>
      <div className={styles.itemAction}>
        <div className={styles.ratings}>
          <Rating
            onClick={(rate) => onRatingChange(idea._id, rate)}
            initialValue={idea.rating || 0}
          />
        </div>

        <div
          className={styles.addComment}
          onClick={() => onAddComment(idea._id)}
        >
          <span>Add</span>
          <span>Comments</span>
        </div>

        <Button
          className={styles.viewBtn}
          type="view"
          action="button"
          onClick={() => navigate(`/admin/ideas/${idea._id}/rate`)}
        >
          View
        </Button>
      </div>
    </div>
  );
}
