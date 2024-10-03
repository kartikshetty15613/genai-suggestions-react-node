import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

 const CanvasJSChart = CanvasJSReact.CanvasJSChart;



const Charts = () => {
  const [categoriesData, setCategoriesData] = useState([])
  

  const calculateCategoryRatings = ()=>{
        return categoriesData.map((category)=>{
            const totalRating = category.subcategories.reduce((sum,subcategory)=>sum+ Number(subcategory.rating),0)
            //console.log({label:category.name , y:totalRating})
            return {label:category.name , y:totalRating}
    })
  }
  
  //console.log(calculateCategoryRatings())

  // Chart prepration function 

  const chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Category Ratings",
      fontColor: "#4F81BC",  // Custom title color
      fontSize: 20,          // Larger font size
      fontFamily: "Arial"    // Font style
    },
    axisX: {
      title: "Category",
      labelFontSize: 13,  // Font size for X-axis labels
      titleFontSize: 18,  // Font size for X-axis title
      labelFontColor: "#333", // Custom label color
      titleFontColor: "#4F81BC"  // Custom axis title color
    },
    axisY: {
      title: "Total Rating",
      labelFontSize: 15,  // Font size for Y-axis labels
      titleFontSize: 18,  // Font size for Y-axis title
      labelFontColor: "#333", // Custom label color
      titleFontColor: "#4F81BC", // Custom axis title color
      gridColor: "#E2E2E2",  // Gridline color
      interval: 1            // Set interval between ticks
    },
    data: [{
      type: "column",
      indexLabel: "{y}",   // Display rating value above the column
      indexLabelFontSize: 15,  // Font size for the labels on top of columns
      indexLabelFontColor: "black",
      dataPointWidth:50,
      //color: "#4CAF50",   // Column color
      dataPoints: calculateCategoryRatings()
    }],
    height: 400,  // Adjust chart height
    width: 600    // Adjust chart width
  };
 


  useEffect(()=>{
    const storedCheckedItems = localStorage.getItem("UserFeedback");
    if (storedCheckedItems) {
        setCategoriesData(JSON.parse(storedCheckedItems));
    }
  },[])

  //console.log(categoriesData)


  return (
    <div style={{padding:"20px"}}>
         <CanvasJSChart options={chartOptions} />
    </div>
  )
}

export default Charts