import styles from "../components/Pagination.module.css"


export default function Pagination({ currentPage, totalPages, handleNext, handlePrevious }) {
  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={styles.arrowButton}
      >
        ◀
      </button>
      <span>
        {currentPage} - {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.arrowButton}
      >
        ▶
      </button>
    </div>
  );
}
