import ReactApexChart from "react-apexcharts";

export default function Chart({ data }) {
  const calculateCategoryRatings = () => {
    return data.map((category) => {
      // Check if subCategories is defined and has length
      if (category.subCategories && category.subCategories.length > 0) {
        const totalRating = category.subCategories.reduce(
          (sum, subcategory) => sum + (subcategory.ratingAvg || 0), // Use 0 if ratingAvg is undefined
          0
        );
        return totalRating;
      }
      return 0;
    });
  };

  // Get category names for X-Axis labels
  const categoryLabels = data.map((category) => category.category || "");
  //   const columnColors = ["#4CAF50", "#FFA726", "#FF6384", "#36A2EB", "#FFCE56"];
  const columnColors = [
    "#B9D6EB",
    "#FFC58A",
    "#7EDD7B",
    "#EC9C9E",
    "#A6D6D6",
    "#BDAED6",
    "#CBA39E",
    "#FF8EFF",
    "#D3DEA3",
  ];

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
        columnWidth: "40%",
        endingShape: "rounded",
        distributed: true,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: categoryLabels, // Use category names as labels on the X-axis
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Open Sans",
        },
        offsetY: -5,
      },
      //   title: {
      //     text: "Categories",
      //     style: {
      //       fontSize: "16px",
      //       fontFamily: "Open Sans",
      //     },
      //   },
    },
    yaxis: {
      title: {
        text: "Total Rating",
        style: {
          fontSize: "16px",
          fontFamily: "Open Sans",
        },
      },
      min: 0,
      max: 15, // Adjust Y-axis max value based on total possible ratings
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#000"], // Set the font color to black
      },
    },
    colors: columnColors, // Column color
    title: {
      text: "Category Ratings",
      align: "center",
      style: {
        fontSize: "20px",
        fontFamily: "Open Sans",
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
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type="bar"
      height={450}
    />
  );
}
