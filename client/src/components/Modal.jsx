import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

import styles from "./Modal.module.css";
import iconLightBulb from "../assets/icon-light-bulb.png";
import Spinner from "./Spinner";

export default function Modal({
  isOpen,
  toggleModal,
  children,
  type,
  msg = "Post your success message",
}) {
  const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      maxWidth: "500px",
      margin: "auto",
      maxHeight: "250px",
      padding: "40px",
      borderRadius: "5px",
      overflow: "visible",
    },
  };

  return (
    <ReactModal isOpen={isOpen} style={modalStyles}>
      <div className={styles.modalBody}>
        {type === "idea-(create/update)" && (
          <>
            <img src={iconLightBulb} alt="icon-light-bulb" />
            <p className={styles.successMessage}>{msg}</p>
            {children}
          </>
        )}

        {type === "loading" && <Spinner />}

        {type !== "loading" && type !== "idea-(create/update)" && children}
      </div>

      {type !== "loading" && (
        <div className={styles.modalClose} onClick={() => toggleModal(false)}>
          X
        </div>
      )}
    </ReactModal>
  );
}
