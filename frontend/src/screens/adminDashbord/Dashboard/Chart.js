import React from "react";
import Chart from "react-apexcharts";
const DashChart = () => {
  const opt = {
    options: {
      legend: {
        show: true,
        showForSingleSeries: true,
      },
      chart: {
        id: "basic-bar",
        width: "100%",
        background: "#fff",
      },
      title: {
        text: "Orders in Last One Month",
        textAlign: "center",
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      stroke: {
        curve: "smooth",
      },
    },

    series: [
      {
        name: "Orders",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  };

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={opt.options}
            series={opt.series}
            type="area"
            width="1200"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default DashChart;
