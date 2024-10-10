import { useState } from "react";
import IdeasListItem from "./IdeasListItem";
import Button from "../components/Button";
import Pagination from "../components/Pagination";

import styles from "./IdeasList.module.css";

export default function IdeasList({ ideas, onFeedbackSubmit }) {
  const [currentPage, setCurrentPage] = useState(2);
  const [totalPages, setTotalPages] = useState(10);

  const handleFeedbackSubmit = async () => {
    onFeedbackSubmit();
  };

  const handleRatingChange = (ideaId, rating) => {
    ideas.forEach((idea) => {
      if (idea._id === ideaId) idea.rating = rating;
    });
  };

  const handleAddComment = (ideaId, comment) => {
    ideas.forEach((idea) => {
      if (idea._id === ideaId) idea.comment = comment;
    });

    console.log(ideas);
  };

  const handleNext = (e) => {
    e.preventDefault();
  };

  const handlePrevious = (e) => {
    e.preventDefault();
  };
  return (
    <ul className={styles.ideaList}>
      {ideas.map((idea) => (
        <IdeasListItem
          key={idea._id}
          idea={idea}
          onRatingChange={handleRatingChange}
          onAddComment={handleAddComment}
        />
      ))}

      <div
        style={{
          height: "45px",
          display: "flex",
          backgroundColor: "#EFEFEF",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>

        <Button
          className={styles.feedbackButton}
          onClick={handleFeedbackSubmit}
        >
          Submit Your Feedback
        </Button>
      </div>
    </ul>
  );
}
