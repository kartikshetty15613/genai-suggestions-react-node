import ReactApexChart from "react-apexcharts";

export default function Piechart({ data = [] }) {
  // Calculate total ratings for each category (Y-Axis labels)
  const calculateCategoryRatings = () => {
    return data.map((category) => {
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

  // Get category names for X-Axis labels
  const categoryLabels = data.map((category) => category.category || "");

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
        fontFamily: "Open Sans",
      },
    },
    colors: [
      "#B9D6EB",
      "#FFC58A",
      "#7EDD7B",
      "#EC9C9E",
      "#A6D6D6",
      "#BDAED6",
      "#CBA39E",
      "#FF8EFF",
      "#D3DEA3",
    ], // Custom colors for pie slices
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val * 100) / 100 + "%";
      },
      style: {
        colors: ["#000"], // Set the font color to black
        fontWeight: "lighter",
      },
    },
    tooltip: { style: { fontSize: "12px", fontWeight: "bold", color: "#000" } },
    legend: {
      position: "bottom",
      style: {
        colors: ["#000"], // Set the font color to black
      },
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
}
