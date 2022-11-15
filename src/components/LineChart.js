import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import cs from "./cs.json";




ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scaleShowValues: true,
  responsive: true,
  mainAspectRatio: false,
  aspectRatio: 1.5,
  scales: {
    xAxes: [{
      ticks: {
        autoSkip: true
      }
    }]
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Zillow Home Value Index',
    },
  },
};

//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

let labels = []
let zhvi = []


for (const obj of cs) {
  labels.push(obj.Date);
  zhvi.push(obj.ZHVI)
}

console.log(labels)

export const data = {
  labels,
  datasets: [
    {
      label: 'ZHVI',
      data: zhvi,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}

export default LineChart;