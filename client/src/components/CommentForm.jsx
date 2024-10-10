import { useState } from "react";
import Button from "./Button";

import styles from "./CommentForm.module.css";

export default function CommentForm({ onSubmit, onCancel }) {
  const [comment, setComment] = useState("");

  return (
    <div className={styles.commentForm}>
      <h3>Add your comment</h3>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />

      <div className={styles.btnGroup}>
        <Button
          type="submit"
          action="button"
          onClick={() => onSubmit(comment)}
          disabled={!comment}
        >
          Submit
        </Button>
        <Button type="cancel" action="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
