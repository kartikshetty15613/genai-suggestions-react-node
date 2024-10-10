import IdeasListItem from "./IdeasListItem";
import styles from "./IdeasList.module.css";

export default function IdeasList({ ideas, onAddComment, onRatingChange }) {
  return (
    <ul className={styles.ideaList}>
      {ideas.map((idea) => (
        <IdeasListItem
          key={idea._id}
          idea={idea}
          onRatingChange={onRatingChange}
          onAddComment={onAddComment}
        />
      ))}
    </ul>
  );
}
