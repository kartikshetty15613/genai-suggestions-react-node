import { useState, useEffect } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import BreadCrumbsContainer from "../components/BreadCrumbsContainer";
import Container from "../components/Container";
import PieChart from "../components/PieChart";
import Graph from "../components/Graph";

import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchGraphsData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/graphs`
        );
        const { data } = await response.json();
        setGraphData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGraphsData();
  }, []);

  return (
    <>
      <BreadCrumbsContainer>
        <BreadCrumbs crumbs={["Home", "Dashboard"]} />
      </BreadCrumbsContainer>

      <Container>
        <div className={styles.chartsContainer}>
          <div>
            <PieChart data={graphData} />
          </div>
          <div>
            <Graph data={graphData} />
          </div>
        </div>
      </Container>
    </>
  );
}
