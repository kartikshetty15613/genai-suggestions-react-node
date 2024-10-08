import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Piechart = () => {
  const [categoriesData, setCategoriesData] = useState([]);

  const fetchGraphsData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/graphs`
      );
      const res = await response.json();
      //console.log(res);
      setCategoriesData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGraphsData();
  }, []);

  // Calculate total ratings for each category (Y-Axis labels)
  const calculateCategoryRatings = () => {
    return categoriesData.map((category) => {
      // Ensure subcategories is defined before reducing
      if (category.subCategories && category.subCategories.length > 0) {
        const totalRating = category.subCategories.reduce(
          (sum, subcategory) => sum + (subcategory.ratingAvg || 0), // Use 0 if rating is undefined
          0
        );
        return totalRating;
      }
      return 0; // Default to 0 if subcategories is undefined or empty
    });
  };
  //console.log(calculateCategoryRatings())

  // Get category names for X-Axis labels
  const categoryLabels = categoriesData.map(
    (category) => category.category || ""
  );

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
    colors: ["#4CAF50", "#FFA726", "#FF6384", "#36A2EB", "#FFCE56"], // Custom colors for pie slices
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
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
