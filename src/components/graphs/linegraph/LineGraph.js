import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import './LineGraph.less';

const initData = {
  labels: ['Loading Data'],
  datasets: [
    {
      data: [0],
      borderColor: '#2f54eb',
      backgroundColor: '#597ef7',
      pointBackgroundColor: '#e63946',
      pointBorderColor: '#95363d',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        beginAtZero: true,
        scaleLabel: {
          fontSize: 20,
          lineHeight: 1,
          display: true,
          labelString: '# of incidents',
          padding: 0,
        },
      },
    ],
    xAxes: [
      {
        scaleLabel: {
          fontSize: 20,
          lineHeight: 1,
          display: true,
          labelString: 'Months',
          padding: {
            bottom: 10,
          },
        },
      },
    ],
  },
};

const LineGraph = ({ data, months }) => {
  const [lineData, setLineData] = useState(initData);

  console.log('data:', data);
  useEffect(() => {
    setLineData({
      ...lineData,
      labels: months,
      datasets: [
        {
          ...lineData.datasets[0],
          data: months.map(month => data[month]),
        },
      ],
    });
  }, [data, months]);

  return (
    <>
      <div className="line-container">
        <Line
          data={lineData}
          /* data={{ */
          /*   labels: labels, */
          /*   datasets: [ */
          /*     { */
          /*       data: lineData, */
          /*       borderColor: '#2f54eb', */
          /*       backgroundColor: '#597ef7', */
          /*       pointBackgroundColor: '#e63946', */
          /*       pointBorderColor: '#95363d', */
          /*     }, */
          /*   ], */
          /* }} */
          options={options}
        />
      </div>
      <p className="graph-disclaimer">
        Note: This graph relies on open source data from multiple sources and a
        machine learning model that is still in beta. These categories may not
        accurately represent the circumstances of each incident.{' '}
      </p>
    </>
  );
};

export default LineGraph;
