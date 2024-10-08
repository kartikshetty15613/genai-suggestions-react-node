import { useNavigate } from "react-router-dom";
import styles from "../Stylesheet/Home.module.css";
import bulb from "../images/bulb.png";
import iconBulb from "../images/icon-light-bulb.png";

const Home = () => {
  const navigator = useNavigate();

  return (
    <main className={styles.main}>
      <section className={styles.heading}>
        <h3>Enterprise AI</h3>
        <h1>
          Envision your <span>Idea</span>
        </h1>
        <img src={bulb} alt="Bulb" onClick={() => navigator("/categories")} />
        <p>
          A concept consists of all elements necessary to set an idea into
          motion.
        </p>
      </section>
      <section className={styles.counter}>
        <img src={iconBulb} alt="icon-bulb" />

        <div className={styles.counters}>
          <span>7</span>
          <span>5</span>
          <span>5</span>
        </div>
      </section>
    </main>
  );
};

export default Home;
