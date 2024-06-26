import React, { useContext, useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import { timeseries } from './Home';
var demo_data = require("../assets/dashboard_demo_data.json");

export function Dashboard() {

  const ts = useContext(timeseries);

  // demo predictions for ZHVI chart
  const test_preds = [
    { x: new Date(2023, 5, 10).getTime(), y: 635000},
    { x: new Date(2023, 7, 10).getTime(), y: 650000},
    { x: new Date(2024, 4, 10).getTime(), y: 690000},
  ];

  const [chart1Options, setChart1Options] = useState({
    series: [
      {
        name: 'ZHVI',
        data: ts.zhvi,
      }
    ],
    title: {
      text: "Zillow Home Value Index (ZHVI)",
      align: "center",
    },
    legend: {
      horizontalAlign: 'left',
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-title',
        },
    },
  },
  yaxis: {
    labels: {
      formatter: function(value) {
        if (value >= 1000000) {
          return `$${(value / 1000000).toFixed(0)}M`;
        } else if (value >= 1000) {
          return `$${(value / 1000).toFixed(0)}K`;
        } else {
          return `$${value}`;
        }
      }
    },
    title: {
      text: 'Price',
      style: {
        fontSize: '14px',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
      offsetX: 3,
    },
  },
    tooltip: {
      x: {
        format: 'yyyy-MM',
      },
      y: {
        formatter: function (value) {
          return '$' + value.toLocaleString('en-US');
        },
      },
    },
    chart: {
      toolbar: {
        show: false,
        tools: {
          download: false,
          zoom: false,
        },
      },
      theme: {
        mode: 'light',
        palette: 'palette3'
      },
    },
  });

  console.log("Null values in median list:", typeof(ts.list.slice(-1)[0].y));

  const [chart2Options, setChart2Options] = useState({
    series: [
      {
        name: 'Median List',
        data: ts.list.slice(-100), // Selecting the last 100 elements
      },
      {
        name: 'Median Sale',
        data: ts.sale.slice(-100), // Selecting the last 100 elements
      },
    ],
    title: {
      text: "Price Activity",
      align: "center",
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-title',
        },
        labels: {
          style: {
            colors: '#000000',
          }
        },
    },
  },
  yaxis: {
    labels: {
      formatter: function(value) {
        if (value >= 1000000) {
          return `$${(value / 1000000).toFixed(0)}M`;
        } else if (value >= 1000) {
          return `$${(value / 1000).toFixed(0)}K`;
        } else {
          return `$${value}`;
        }
      }
    },
    title: {
      text: 'Price',
      style: {
        fontSize: '14px',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
      offsetX: 3,
    },
  },
    tooltip: {
      x: {
        format: 'yyyy-MM',
      },
      y: {
        formatter: function (value) {
          return '$' + value.toLocaleString('en-US');
        },
      },
    },
    chart: {
      toolbar: {
        show: false,
        tools: {
          download: false,
          zoom: false,
        },
      },
    },
  });

  const [chart3Options, setChart3Options] = useState({
    series: [
      {
        name: 'Inventory',
        data: ts.inventory.slice(-100), // Selecting the last 100 elements
      },
      {
        name: 'New Listings',
        data: ts.listings.slice(-100), // Selecting the last 100 elements
      },
      {
        name: 'Homes Sold',
        data: ts.homes.slice(-100), // Selecting the last 100 elements
      },
    ],
    title: {
      text: "Market Activity",
      align: "center",
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Date',
        style: {
          fontSize: '14px',
          fontWeight: 600,
          cssClass: 'apexcharts-xaxis-title',
        },
    },
  },
  yaxis: {
    title: {
      text: 'Number of Homes',
      style: {
        fontSize: '14px',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
      offsetX: 3,
    },
  },
    tooltip: {
      x: {
        format: 'yyyy-MM',
      },
    },
    chart: {
      toolbar: {
        show: false,
        tools: {
          download: false,
          zoom: false,
        },
      },
    },
  });

  console.log(ts.zhvi.slice(-2)[0].y / (ts.zhvi.slice(-1)[0].y - ts.zhvi.slice(-2)[0].y));

  return (
    <div id="ChartDashboard">
      <div id="ZillowChart">
        <Chart
          options={chart1Options}
          series={chart1Options.series}
          type="line"
        />
      </div>
      <div id="RedfinCharts">
        <div id="PriceChart">
        <Chart
          options={chart2Options}
          series={chart2Options.series}
          type="line"
        />
        </div>
        <div id="MarketChart"> 
        <Chart
          options={chart3Options}
          series={chart3Options.series}
          type="line"
        />
        </div>
      </div>
      <div id="infoPane">
        <h2>Aggregate Statistics</h2>
        <br></br>
        <h3>Current ZHVI: ${ts.zhvi.slice(-1)[0].y.toLocaleString()}</h3>
        <h3>ZHVI YoY: {Math.round((ts.zhvi.slice(-1)[0].y - ts.zhvi.slice(-13)[0].y) / ts.zhvi.slice(-13)[0].y * 10000) / 100}%</h3>
        <h3>ZHVI MoM: {Math.round((ts.zhvi.slice(-1)[0].y - ts.zhvi.slice(-2)[0].y) / ts.zhvi.slice(-2)[0].y * 10000) / 100}%</h3></div>
    </div>
  );
}

export default Dashboard;