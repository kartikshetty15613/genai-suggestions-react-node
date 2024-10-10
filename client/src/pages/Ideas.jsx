import { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import BreadCrumbsContainer from "../components/BreadCrumbsContainer";
import Container from "../components/Container";
import IdeasList from "../components/IdeasList";
import Modal from "../components/Modal";
import Button from "../components/Button";

import styles from "./Ideas.module.css";

export default function Ideas() {
  const [ideas, setIdeas] = useState([]);
  const [ideaToComment, setIdeaToComment] = useState("");
  const [comment, setComment] = useState("");

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/ideas`
        );
        const { data } = await response.json();
        setIdeas(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchIdeas();
  }, []);

  const handleAddComment = (ideaId) => {
    setIdeaToComment(ideaId);
    setIsCommentModalOpen(true);
  };

  const handleCommentSubmit = (ideaId) => {
    ideas.forEach((idea) => {
      if (idea._id === ideaId) idea.comment = comment;
    });

    console.log(ideas);
  };

  const handleCommentCancel = () => {
    setComment("");
    setIsCommentModalOpen(false);
  };

  const handleIdeasBulkUpdate = async () => {
    setIsSubmitModalOpen(true);
    setModalType("loading");

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
      setModalType("idea-(create/update)");
      setModalMessage("Feedback submitted successfully");
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
        type={modalType}
        msg={modalMessage}
      ></Modal>

      <Modal isOpen={isCommentModalOpen} toggleModal={setIsCommentModalOpen}>
        <div className={styles.commentForm}>
          <h3>Add your comment</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className={styles.btnGroup}>
            <Button type="submit" action="button" onClick={handleCommentSubmit}>
              Submit
            </Button>
            <Button type="cancel" action="button" onClick={handleCommentCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Container>
        <div className={styles.ideaListContainer}>
          <IdeasList
            ideas={ideas}
            onFeedbackSubmit={handleIdeasBulkUpdate}
            onAddComment={handleAddComment}
          />
        </div>
      </Container>
    </>
  );
}
