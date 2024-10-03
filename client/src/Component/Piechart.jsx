import React, { useEffect, useState } from 'react'
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Piechart = () => {
  
const [categoriesData, setCategoriesData] = useState([])
  

  const calculateCategoryRatings = ()=>{
        return categoriesData.map((category)=>{
            const totalRating = category.subcategories.reduce((sum,subcategory)=>sum+ Number(subcategory.rating),0)
            //console.log({label:category.name , y:totalRating})
            return {label:category.name , y:totalRating}
    })
  }

  // Pie Chart prepration function 

  const pieChartOptions = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Category Ratings Distribution",
      fontColor: "#4F81BC",
      fontSize: 20,
      fontFamily: "Arial",
    },
    data: [{
      type: "pie",
      startAngle: 60,
      toolTipContent: "<b>{label}</b>: {y} ratings",
      showInLegend: true,
      legendText: "{label}",
      indexLabelFontSize: 10,
      indexLabelFontColor: "black",
      indexLabelPlacement: "inside",
      indexLabelFontWeight: "bold",
      indexLabel: "{label}-{y} ratings",
      dataPoints: calculateCategoryRatings(),
      // Add color for each slice
      colorSet: "customColorSet", // We'll define colors later
    }],
    height: 400,  // Adjust height of the chart
    width: 500,   // Adjust width of the chart
  };

  // Custom color set for the pie chart
  CanvasJSReact.CanvasJS.addColorSet("customColorSet", [
    "#4CAF50",  // Green for Finance & Accountability
    "#FF9800",  // Orange for Customer Service
    "#03A9F4",  // Light blue (can add more colors as necessary)
  ]);
  


  useEffect(()=>{
    const storedCheckedItems = localStorage.getItem("UserFeedback");
    if (storedCheckedItems) {
        setCategoriesData(JSON.parse(storedCheckedItems));
    }
  },[])

  return (
    <div>
        <CanvasJSChart options={pieChartOptions} />
  </div>
  )
}

export default Piechart