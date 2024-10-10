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
      },
    },
    colors: ["#4CAF50", "#FFA726", "#FF6384", "#36A2EB", "#FFCE56"], // Custom colors for pie slices
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return Math.round(val * 100) / 100 + "%";
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
}
