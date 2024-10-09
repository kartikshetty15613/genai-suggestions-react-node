import { useEffect, useState } from "react";
import styles from "./Ideas.module.css";
import Card from "../components/Card";
import Pagination from "../components/Pagination";

const displayCardData = [
  {
    id: 1,
    title: "Logistics & Supply",
    description: "AI Logistics & Supply is one of the best AI Logistics & Supply is one of the best ",
    rating: 0,
  },
  {
    id: 2,
    title: "Logistics & Supply",
    description: "AI Logistics & Supply is one of the best AI Logistics & Supply is one of the best",
    rating: 0,
  },
  {
    id: 3,
    title: "Logistics & Supply",
    description: "AI Logistics & Supply is one of the best AI Logistics & Supply is one of the best",
    rating: 0,
  },
  {
    id: 4,
    title: "Logistics & Supply",
    description: "AI Logistics & Supply is one of the best AI Logistics & Supply is one of the best",
    rating: 0,
  },
  {
    id: 5,
    title: "Logistics & Supply",
    description: "AI Logistics & Supply is one of the best AI Logistics & Supply is one of the best",
    rating: 0,
  },
  

];


export default function Ideas() {

  const[Ideas,setIdeas] = useState(displayCardData)
  const[currentPage,setCurrentPage] = useState(2);
  const[totalPages,setTotalPages] = useState(10)

  const handleNext = (e)=>{
      e.preventDefault();

  }

  const handlePrevious = (e)=>{
    e.preventDefault();
    
  }
  return (
    <div className={styles.container}>
      {/* Display Idea on cards */}

      {Ideas.map((card) => (
        <Card key={card.id} title={card.title} description={card.description} />
      ))}

      {/* Pagination component className={styles.bottomComponent}*/}
      <div style={{height:"45px", display: "flex",backgroundColor:"#EFEFEF"}}>
        <div style={{flexGrow:1}}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </div>
      
        <button className={styles.feedbackButton}>Submit Your Feedback</button>
      </div>
    </div>
  );
}
