import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import bulb from "../assets/inverted-bulb.png";
import iconBulb from "../assets/icon-light-bulb.png";

export default function Home() {
  const navigator = useNavigate();

  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <h3>Enterprise AI</h3>
        <h1>
          Envision your <span>Idea</span>
        </h1>
        <img
          title="Post your idea"
          src={bulb}
          alt="Post your idea"
          onClick={() => navigator("/ideas/post")}
        />
        <p>
          <a onClick={() => navigator("/ideas/post")}>
            Click to post your ideas
          </a>
        </p>
        <p>
          A concept consists of all elements necessary to set an idea into
          motion.
        </p>
      </div>
      {/* <div className={styles.counter}>
        <img src={iconBulb} alt="icon-bulb" />

        <div className={styles.counters}>
          <span>7</span>
          <span>5</span>
          <span>5</span>
        </div>
      </div> */}
    </main>
  );
}
