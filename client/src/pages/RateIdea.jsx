import { useState } from "react";
import styles from "../pages/RateIdea.module.css";
import { Rating } from 'react-simple-star-rating'
import Button from "../components/Button";
export default function RateIdea() {

  const [rating, setRating] = useState(0);
 
  const handleRatingClick = (rate) => {
    setRating(rate);
  };

  const handleSubmit = (e)=>{
       console.log(e)

  }
  

  return (
    <div className={styles.container}>
      <div className={styles.ideaForm}>
        <h3>Idea Title*</h3>
        <p>Logistics And Supply Startups</p>

        <br />
        <h3>Category</h3>
        <p>Strategic Business</p>

        <br />
        <h3>Sub Category</h3>
        <p>Strategic Business</p>

        <br />
        <h3>Describe the idea*</h3>
        <p>
          AI-integrated logistics & supply chain management is one of the best
          AI business ideas that helps startups and SMBs optimize warehouse
          operations, manage logistics and supply startups. There are some
          leading AI startups in application and logistics. Supply chain
          management makes substantial contributions.
        </p>

        <br />
        <h4>Idea Submitted By</h4>
        <p>John Dow</p>
      </div>

      {/* className={styles.ratingForm} */}
      <div className={styles.ratingForm}>

        <div className={styles.rateCommentText}>
          <p style={{ color: "#FFFFFF" }}>RATE YOUR COMMENTS</p>
        </div>

        <div className={styles.stars}>
          <Rating onClick={handleRatingClick} />
        </div>

        <div>
          <textarea className={styles.commentBox} />
        </div>
        
        <Button onClick={handleSubmit}>SUBMIT</Button>
        

      </div>
    </div>
  );
}























 
        {/* <div className={styles.stars}>
          {[...Array(5)].map((star, index) => (
            <span
              key={index}
              className={index < rating ? styles.filledStar : styles.emptyStar}
              onClick={() => handleRatingClick(index + 1)}
            >
              ★
            </span>
          ))}
        </div> */}
