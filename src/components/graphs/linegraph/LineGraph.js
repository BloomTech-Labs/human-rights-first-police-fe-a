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

const graphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        stacked: false,
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
        stacked: false,
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
  const [dataObj, setDataObj] = useState(initData);
  const [inCategories] = useState({});
  const [labels, setLabels] = useState([]);
  const [lineData, setLineData] = useState([]);

  console.log(months);
  useEffect(() => {
    setDataObj({
      ...dataObj,
      labels: months,
    });
    setLabels(months);
  }, [data, months]);

  useEffect(() => {
    if (
      !(Object.keys(data).length === 0 && inCategories.constructor === Object)
    ) {
      let lineDataPoints = [];

      months.forEach(month => {
        lineDataPoints.push(data[month]);
      });

      setLineData(lineDataPoints);
    }
  }, [data, labels]);

  console.log(dataObj);
  return (
    <>
      <div className="line-container">
        <Line
          data={{
            labels: labels,
            datasets: [
              {
                data: lineData,
                borderColor: '#2f54eb',
                backgroundColor: '#597ef7',
                pointBackgroundColor: '#e63946',
                pointBorderColor: '#95363d',
              },
            ],
          }}
          options={graphOptions}
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
