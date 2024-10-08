import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import styles from "../Stylesheet/Header.module.css";


const Header = () => {
  return (
    <Box className={styles.box} sx={{ flexGrow: "1" }}>
      <AppBar position="static" sx={{ backgroundColor: "#60d8af" }}>
        <Toolbar sx={{ paddingLeft: "10px" }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Enterprise AI
          </Typography>

          <Link to={"/feedback"}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1a4d2e" }}
              endIcon={<SendIcon />}
            >
              Next
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
