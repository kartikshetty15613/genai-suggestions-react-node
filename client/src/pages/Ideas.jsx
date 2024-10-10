import { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import BreadCrumbsContainer from "../components/BreadCrumbsContainer";
import Container from "../components/Container";
import IdeasList from "../components/IdeasList";
import Modal from "../components/Modal";
import CommentForm from "../components/CommentForm";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";

import styles from "./Ideas.module.css";
import { useNavigate } from "react-router-dom";

export default function Ideas() {
  const navigate = useNavigate();

  const [ideas, setIdeas] = useState([]);
  const [ideaToComment, setIdeaToComment] = useState("");

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const [commentModalType, setCommentModalType] = useState("");
  const [feedbackModalType, setFeedbackModalType] = useState("");

  const [commentSubmitMessage, setCommentSubmitMessage] = useState("");
  const [feedbackSubmitMessage, setFeedbackSubmitMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(2);
  const [totalPages, setTotalPages] = useState(10);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchIdeas = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/ideas`
        );
        const { data } = await response.json();
        setIdeas(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIdeas();
  }, []);

  const handleRatingChange = (ideaId, rating) => {
    ideas.forEach((idea) => {
      if (idea._id === ideaId) idea.rating = rating;
    });
  };

  const handleNextClick = () => {
    navigate("/admin/dashboard");
  };

  const handleAddComment = (ideaId) => {
    setIdeaToComment(ideaId);
    setIsCommentModalOpen(true);
  };

  const handleCommentCancel = () => {
    setIsCommentModalOpen(false);
    setCommentModalType("");
    setCommentSubmitMessage("");
  };

  const handleCommentSubmit = async (comment) => {
    try {
      setCommentModalType("loading");

      await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/ideas/${ideaToComment}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            comment,
          }),
        }
      );

      setCommentModalType("idea-(create/update)");
      setCommentSubmitMessage("Comment submitted");
    } catch (err) {
      console.error(err);
    }
  };

  const handleIdeasBulkUpdate = async () => {
    setIsSubmitModalOpen(true);
    setFeedbackModalType("loading");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/ideas/bulk`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ideas,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setFeedbackModalType("idea-(create/update)");
      setFeedbackSubmitMessage("Feedback submitted successfully");

      navigate("/admin/dashboard");
    } catch (err) {
      setIsSubmitModalOpen(false);
      console.error(err);
    }
  };

  return (
    <>
      <BreadCrumbsContainer>
        <BreadCrumbs
          crumbs={[
            { text: "Home", linkTo: window.location.origin },
            { text: "Ideas", linkTo: "/ideas" },
          ]}
        ></BreadCrumbs>
      </BreadCrumbsContainer>

      <Modal
        isOpen={isSubmitModalOpen}
        toggleModal={setIsSubmitModalOpen}
        type={feedbackModalType}
        msg={feedbackSubmitMessage}
      ></Modal>

      <Modal
        isOpen={isCommentModalOpen}
        toggleModal={handleCommentCancel}
        type={commentModalType}
        msg={commentSubmitMessage}
      >
        <CommentForm
          onSubmit={handleCommentSubmit}
          onCancel={handleCommentCancel}
        />
      </Modal>

      <Container>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            <div className={styles.ideaListContainer}>
              <IdeasList
                ideas={ideas}
                onAddComment={handleAddComment}
                onRatingChange={handleRatingChange}
              />
            </div>

            <div className={styles.footerContainer}>
              {/* <div className={styles.paginatorContainer}>
                <Pagination currentPage={currentPage} totalPages={totalPages} />
              </div> */}

              <div className={styles.btnGroup}>
                <Button
                  className={styles.feedbackSubmit}
                  onClick={handleIdeasBulkUpdate}
                >
                  Submit Your Feedback
                </Button>

                <Button
                  className={styles.feedbackSubmit}
                  onClick={handleNextClick}
                >
                  Next
                </Button>
              </div>
            </div>
            <br />
          </>
        )}
      </Container>
    </>
  );
}
