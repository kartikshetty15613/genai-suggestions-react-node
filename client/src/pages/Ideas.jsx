import { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import BreadCrumbsContainer from "../components/BreadCrumbsContainer";
import Container from "../components/Container";
import IdeasList from "../components/IdeasList";
import Modal from "../components/Modal";

import styles from "./Ideas.module.css";

export default function Ideas() {
  const [ideas, setIdeas] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleIdeasBulkUpdate = async () => {
    setIsModalOpen(true);
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
      setIsModalOpen(false);
      console.error(err);
    }
  };

  return (
    <>
      <BreadCrumbsContainer>
        <BreadCrumbs crumbs={["Home", "Ideas"]}></BreadCrumbs>
      </BreadCrumbsContainer>

      <Modal
        isOpen={isModalOpen}
        toggleModal={setIsModalOpen}
        type={modalType}
        msg={modalMessage}
      ></Modal>

      <Container>
        <div className={styles.ideaListContainer}>
          <IdeasList ideas={ideas} onFeedbackSubmit={handleIdeasBulkUpdate} />
        </div>
      </Container>
    </>
  );
}
