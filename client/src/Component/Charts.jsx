import React, { useState, useEffect } from "react";
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

const Charts = () => {
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

  //Chart preparation method
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "40%", // Reduce the gap between columns
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: categoryLabels, // Use category names as labels on the X-axis
      title: {
        text: "Categories",
        style: {
          fontSize: "16px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Total Rating",
        style: {
          fontSize: "16px",
        },
      },
      min: 0,
      max: 15, // Adjust Y-axis max value based on total possible ratings
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#4CAF50"], // Column color
    title: {
      text: "Category Ratings",
      align: "center",
      style: {
        fontSize: "20px",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Ratings";
        },
      },
    },
  };

  // Series data for the chart (Y-axis)
  const chartSeries = [
    {
      name: "Total Rating",
      data: calculateCategoryRatings(),
    },
  ];

  // useEffect(()=>{
  //     fetchGraphsData()
  // },[])

  return (
    <div style={{ padding: "20px" }}>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Charts;
