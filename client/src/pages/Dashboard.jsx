import { useState, useEffect } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import BreadCrumbsContainer from "../components/BreadCrumbsContainer";
import Container from "../components/Container";
import PieChart from "../components/PieChart";
import Graph from "../components/Graph";
import Button from "../components/Button";

import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
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
        <div className={styles.backBtnContainer}>
          <BreadCrumbs
            crumbs={[
              { text: "Home", linkTo: window.location.origin },
              { text: "Dashboard", linkTo: "/dashboard" },
            ]}
          />
          <Button
            type="submit"
            action="button"
            className={styles.backBtn}
            onClick={() => {
              window.location.href =
                "https://www.mastek.com/products/innovation-lab";
            }}
          >
            Back to Mastek Innovation Lab
          </Button>
        </div>
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
