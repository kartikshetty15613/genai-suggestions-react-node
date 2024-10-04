import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import styles from "../Stylesheet/Header.module.css"


const Feedback = ({CheckedItems}) => {

   const[FeedbackData , setFeedbackData] = useState([])
   const [allRatingsFilled, setAllRatingsFilled] = useState(false);
   const navigate = useNavigate()

   //console.log(CheckedItems)
   console.log(FeedbackData)

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


   const handleRatingChange = (catIndex,subIndex,newRating)=>{
          const newFeedback_Rating  = [...FeedbackData]
          newFeedback_Rating[catIndex].subcategories[subIndex].rating = newRating;
          setFeedbackData(newFeedback_Rating)
   }

   const handleCommentChange = (catIndex,subIndex,newComment)=>{
          const newFeedback_Comment = [...FeedbackData]
          newFeedback_Comment[catIndex].subcategories[subIndex].comment=newComment
          setFeedbackData(newFeedback_Comment)
   }
   
   const handleSubmitFeedback = (e) => {
     e.preventDefault()
    if(allRatingsFilled)
    {
        console.log(FeedbackData)
        // localStorage.setItem("UserFeedback", JSON.stringify(FeedbackData));
        navigate("/graph")
    }
    
    // alert("Feedback submitted");
  };

  const checkAllRatingsFilled = (FeedbackData) => {
    let allFilled = true;
    FeedbackData.forEach(category => {
       category.subcategories.forEach(subcategory => {
          if (subcategory.rating === 0) {
             allFilled = false;
          }
       });
    });
    setAllRatingsFilled(allFilled);
 };
   

   useEffect(()=>{
    // const storedCheckedItems = localStorage.getItem("checkedItems");
    const storedCheckedItems = CheckedItems
    if (storedCheckedItems) {
        let dataFromLocal =   storedCheckedItems// Array format
        const updatedData = dataFromLocal.map(category => ({
            id: category.id,
            name: category.name,
            subcategories: category.subCategories.map(subcategory => ({
              id:subcategory.id,
              name: subcategory.name,
              comment: "",
              rating: 0
            }))
          }));  

          setFeedbackData(updatedData)
      }
   },[])

   //console.log(FeedbackData)

   useEffect(() => {
    checkAllRatingsFilled(FeedbackData);  // Check if all ratings are filled whenever FeedbackData changes
 }, [FeedbackData]);

  return (
     <div>
    <Box className = {styles.box} sx={{ flexGrow: "1" }}>
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
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell sx={{fontSize:"20px",fontWeight:200}}>Category</TableCell>
            <TableCell sx={{fontSize:"20px",fontWeight:200}}>SubCategory</TableCell>
            <TableCell sx={{fontSize:"20px",fontWeight:200}}>Comment</TableCell>
            <TableCell sx={{fontSize:"20px",fontWeight:200}}>Rating</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {FeedbackData.map((category, catIndex) =>
            category.subcategories.map((subCat, subIndex) => (
              <TableRow
                key={`${catIndex}-${subIndex}`}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="">{subCat.name}</TableCell>

                <TableCell align="">
                  <TextField
                    label={`Comments for ${subCat.name}`}
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    onChange={(e)=> handleCommentChange(catIndex,subIndex,e.target.value)}

                  />
                </TableCell>

                <TableCell align="">
                     <Rating name="simple-controlled" value={subCat.rating} onChange={(e) => handleRatingChange(catIndex,subIndex,e.target.value)}/>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
    

    </div>
  );
  
}

export default Feedback

// {/* <TableCell component="th" scope="row">{index === 0 ? row.name : ''}</TableCell>
//               <TableCell align="right">row</TableCell>
//               <TableCell align="right">row</TableCell>
//               <TableCell align="right">abdg</TableCell> */}


//    const handleSubmitFeedback = (e) => {
//      e.preventDefault();
//      let allRatingsProvided = true;
//      FeedbackData.forEach(category => {
//        category.subcategories.forEach(subcategory => {
//          if (subcategory.rating === 0) {
//            allRatingsProvided = false;          
//          }
//        });
//      });
     
//      if (!allRatingsProvided) {
       
//        //alert("Please provide a rating for all subcategories.");
//        return;
//      }
     
     
//      localStorage.setItem("UserFeedback", JSON.stringify(FeedbackData));  //true
     
//      //alert("Feedback submitted");
//    };

           
