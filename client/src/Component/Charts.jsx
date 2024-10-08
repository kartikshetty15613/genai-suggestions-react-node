import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

const Charts = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  const fetchGraphsData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/graphs`
      );
      const res = await response.json();
      console.log(res.data);
      setCategoriesData(res.data);
      //  setCategoriesData(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGraphsData();
  }, []);

  //console.log(categoriesData)
  // Calculate total ratings for each category that is Y-Axis labels
  const calculateCategoryRatings = () => {
    return categoriesData.map((category) => {
      // Check if subCategories is defined and has length
      if (category.subCategories && category.subCategories.length > 0) {
        const totalRating = category.subCategories.reduce(
          (sum, subcategory) => sum + (subcategory.ratingAvg || 0), // Use 0 if ratingAvg is undefined
          0
        );
        return totalRating;
      }
      return 0; // Default to 0 if subCategories is undefined or empty
    });
  };

  // Get category names for X-Axis labels
  const categoryLabels = categoriesData.map(
    (category) => category.category || ""
  );
  const columnColors = ["#4CAF50", "#FFA726", "#FF6384", "#36A2EB", "#FFCE56"];

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
        distributed: true,
      },
    },
    xaxis: {
      categories: categoryLabels, // Use category names as labels on the X-axis
      labels: {
        style: {
          fontSize: "9px",
        },
      },
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
    colors: columnColors, // Column color
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

  return (
    <div style={{ padding: "30px" }}>
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
