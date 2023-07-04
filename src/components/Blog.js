import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
var demo_data = require("../assets/dashboard_demo_data.json")

const Blog = () => {
  // Extract data for ZHVI chart
  const zhvi_data = demo_data.map(item => ({
    x: new Date(item.Date).getTime(),
    y: item.zhvi === 'NULL' ? null : parseInt(item.zhvi),
  }));

  // Extract data for Median List Price chart
  const list_data = demo_data.map(item => ({
    x: new Date(item.Date).getTime(),
    y: item.MedianListPrice === 'NULL' ? null : parseInt(item.MedianListPrice),
  }));

  // Extract data for Median Sale Price chart
  const sale_data = demo_data.map(item => ({
    x: new Date(item.Date).getTime(),
    y: item.MedianSalePrice === 'NULL' ? null : parseInt(item.MedianSalePrice),
  }));

  // Extract data for Inventory chart
  const inventory_data = demo_data.map(item => ({
    x: new Date(item.Date).getTime(),
    y: item.Inventory === 'NULL' ? null : parseInt(item.Inventory),
  }));

  // Extract data for New Listings chart
  const new_listings_data = demo_data.map(item => ({
    x: new Date(item.Date).getTime(),
    y: item.NewListings === 'NULL' ? null : parseInt(item.NewListings),
  }));

  // Extract data for Homes Sold chart
  const homes_data = demo_data.map(item => ({
    x: new Date(item.Date).getTime(),
    y: item.HomesSold === 'NULL' ? null : parseInt(item.HomesSold),
  }));

  const [chart1Options, setChart1Options] = useState({
    series: [
      {
        name: 'ZHVI',
        data: zhvi_data,
      }
    ],
    title: {
      text: "Zillow Home Value Index",
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
    labels: {
      formatter: function (value) {
        return '$' + value.toLocaleString('en-US');
      },
    },
    title: {
      text: 'Price',
      style: {
        fontSize: '14px',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
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

  const [chart2Options, setChart2Options] = useState({
    series: [
      {
        name: 'Median List',
        data: list_data.slice(-100), // Selecting the last 100 elements
      },
      {
        name: 'Median Sale',
        data: sale_data.slice(-100), // Selecting the last 100 elements
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
    },
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return '$' + value.toLocaleString('en-US');
      },
    },
    title: {
      text: 'Price',
      style: {
        fontSize: '14px',
        fontWeight: 600,
        cssClass: 'apexcharts-yaxis-title',
      },
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
        data: inventory_data.slice(-100), // Selecting the last 100 elements
      },
      {
        name: 'New Listings',
        data: new_listings_data.slice(-100), // Selecting the last 100 elements
      },
      {
        name: 'Homes Sold',
        data: homes_data.slice(-100), // Selecting the last 100 elements
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

  useEffect(() => {
  }, []); // series data in brackets for prod?

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
          height={350}
          width={500}
        />
        </div>
        <div id="MarketChart"> 
        <Chart
          options={chart3Options}
          series={chart3Options.series}
          type="line"
          height={350}
          width={500}
        />
        </div>
      </div>
    </div>
  );
};

export default Blog;

