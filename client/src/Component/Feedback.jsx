import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import styles from "../Stylesheet/Header.module.css";

const Feedback = ({ CheckedItems }) => {
  const [FeedbackData, setFeedbackData] = useState([]);
  const [allRatingsFilled, setAllRatingsFilled] = useState(false);
  const navigate = useNavigate();

  console.log(CheckedItems);
  console.log(FeedbackData);

  // const data = [{id:"1", name: "Finance & Accountability",
  //                 subcategories: [
  //                   {id:"1-1", name: "Revenue & Profitability", comment: "", rating: 0 },
  //                   {id:"1-2", name: "Cash Flow", comment: "", rating: 0 },
  //                   {id:"1-3", name: "Liquidity & Solvency", comment: "", rating: 0 }
  //                 ]
  //               },

  //               {id:"2", name: "Customer Service",
  //                 subcategories: [
  //                   {id:"2-1", name: "Customer Satisfaction (CSAT)", comment: "", rating: 0 },
  //                   {id:"2-2", name: "Revenue Generation", comment: "", rating: 0 },
  //                   {id:"2-3", name: "Net Promoter Score (NPS)", comment: "", rating: 0 }
  //                 ]
  //               }
  //         ]

  const handleRatingChange = (index, newRating) => {
    const updatedFeedback = [...FeedbackData];
    updatedFeedback[index].rating = newRating;
    setFeedbackData(updatedFeedback);
  };

  const handleCommentChange = (index, newComment) => {
    const updatedFeedback = [...FeedbackData];
    updatedFeedback[index].comment = newComment;
    setFeedbackData(updatedFeedback);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    //console.log(FeedbackData)
    // const filteredFeedbackData = FeedbackData.map(({name,subCategoryName,...rest})=>rest)
    // console.log(typeof filteredFeedbackData[0].category)

    if (allRatingsFilled) {
      try {
        //sending feedback data to the server
        const filteredFeedbackData = FeedbackData.map(
          ({ name, subCategoryName, ...rest }) => ({
            ...rest,
            rating: Number(rest.rating),
          })
        );
        const payload = {
          feedbacks: filteredFeedbackData,
        };

        //console.log(filteredFeedbackData)
        const response = await fetch("http://localhost:3000/api/v1/feedbacks", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        // if (!response.ok) {
        //   throw new Error("Failed to submit feedback")
        // }
        const res = await response.json();
        console.log(res);
        navigate("/graph");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const checkAllRatingsFilled = (data) => {
    let allFilled = true;
    data.forEach((item) => {
      if (item.rating === 0) {
        allFilled = false;
      }
    });
    setAllRatingsFilled(allFilled);
  };

  useEffect(() => {
    // const storedCheckedItems = localStorage.getItem("checkedItems");
    const storedCheckedItems = CheckedItems;
    if (storedCheckedItems) {
      let dataFromLocal = storedCheckedItems; // Array format
      const updatedData = dataFromLocal.flatMap((category) =>
        category.subCategories.map((subcategory) => ({
          name: category.name,
          category: category.id,
          subCategory: subcategory.id,
          subCategoryName: subcategory.name,
          comment: "",
          rating: 0,
          submittedBy: "Shritesh Bucche",
          role: "Sales",
        }))
      );

      setFeedbackData(updatedData);
    }
  }, []);

  //console.log(FeedbackData)

  useEffect(() => {
    checkAllRatingsFilled(FeedbackData); // Check if all ratings are filled whenever FeedbackData changes
  }, [FeedbackData]);

  return (
    <div>
      <Box className={styles.box} sx={{ flexGrow: "1" }}>
        <AppBar position="static" sx={{ backgroundColor: "#60d8af" }}>
          <Toolbar sx={{ paddingLeft: "10px" }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Enterprise AI
            </Typography>

            <Button
              disabled={!allRatingsFilled}
              variant="contained"
              sx={{ backgroundColor: "#1a4d2e" }}
              endIcon={<SendIcon />}
              onClick={handleSubmitFeedback}
            >
              Submit Feedback
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* sx={{ width: "100%" }} */}

      <TableContainer className={styles.tableContainer} component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "20px", fontWeight: 200 }}>
                Category
              </TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: 200 }}>
                SubCategory
              </TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: 200 }}>
                Comment
              </TableCell>
              <TableCell sx={{ fontSize: "20px", fontWeight: 200 }}>
                Rating
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {FeedbackData.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="">{item.subCategoryName}</TableCell>
                <TableCell align="">
                  <TextField
                    label={`Comments for ${item.subCategoryName}`}
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => handleCommentChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell align="">
                  <Rating
                    name="simple-controlled"
                    value={item.rating}
                    onChange={(e) => handleRatingChange(index, e.target.value)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Feedback;
