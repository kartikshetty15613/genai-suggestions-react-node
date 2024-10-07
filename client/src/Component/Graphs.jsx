import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "../Stylesheet/Header.module.css";
import Charts from "./Charts";
import Piechart from "./Piechart";

const Graphs = () => {
  return (
    <div>
      <Box className={styles.box} sx={{ flexGrow: "1" }}>
        <AppBar position="static" sx={{ backgroundColor: "#60d8af" }}>
          <Toolbar sx={{ paddingLeft: "10px" }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Enterprise AI
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <br />
      <br />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}>
        <Charts />
        <Piechart />
      </div>
    </div>
  );
};

export default Graphs;
