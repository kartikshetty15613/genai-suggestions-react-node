import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const data = [
  {
    name: "Finance & Accountability",
    subcategories: [
      { name: "Revenue & Profitability", comment: "", rating: 1 },
      { name: "Cash Flow", comment: "", rating: 2 },
      { name: "Liquidity & Solvency", comment: "", rating: 3 },
    ],
  },
  {
    name: "Customer Service",
    subcategories: [
      { name: "Customer Satisfaction (CSAT)", comment: "", rating: 5 },
      { name: "Revenue Generation", comment: "", rating: 4 },
      { name: "Net Promoter Score (NPS)", comment: "", rating: 3 },
    ],
  },
];

const Piechart = () => {
  const [categoriesData, setCategoriesData] = useState(data);

  // const fetchGraphsData = async()=>{
  //      try {
  //          const response = await fetch("url");
  //          const res = await response.json();
  //          console.log(res);
  //          setCategoriesData(res.data)

  //      } catch (error) {
  //         console.log(error)
  //      }
  // }

  // Calculate total ratings for each category that is Y-Axis labels
  const calculateCategoryRatings = () => {
    return categoriesData.map((category) => {
      const totalRating = category.subcategories.reduce(
        (sum, subcategory) => sum + subcategory.rating,
        0
      );
      return totalRating;
    });
  };
  //console.log(calculateCategoryRatings())

  // Get category names for X-Axis labels
  const categoryLabels = categoriesData.map((category) => category.name);
  // console.log(categoryLabels)

  // Pie Chart Preparation function
  const chartOptions = {
    chart: {
      type: "pie",
      height: 350,
    },
    labels: categoryLabels, // Set the category names as labels
    title: {
      text: "Category Ratings Pie Chart",
      align: "center",
      style: {
        fontSize: "20px",
      },
    },
    colors: ["#4CAF50", "#FFA726"], // Custom colors for pie slices
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val) + "%";
      },
    },
    legend: {
      position: "bottom",
    },
  };

  // Series data for the pie chart (Y-axis data)
  const chartSeries = calculateCategoryRatings();

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default Piechart;
