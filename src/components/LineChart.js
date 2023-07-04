import React, { useContext } from 'react';
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

import { timeseries } from './Home';






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


/*
for (const obj of cs) {
  labels.push(obj.Date);
  zhvi.push(obj.ZHVI)
}
*/

/*
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
*/

export function LineChart() {
  const ts = useContext(timeseries);
  labels = ts.labels;
  zhvi = ts.zhvi;
  console.log(labels);
  
  console.log(ts.name);
  const data = {
    labels,
    datasets: [
      {
        data: zhvi,
        borderColor: 'rgba(52, 68, 160,0.5)',
        backgroundColor: 'rgba(52, 68, 160,0.2)',
      },
    ],
  };

  const options = {
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
        display: false,
      },
      title: {
        display: true,
        text: 'Zillow Home Value Index for ' + ts.name,
      },
    },
  };

  return <Line options={options} data={data} />;
}

export default LineChart;