import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import { createDataSet } from '../assets/bargraphAssets';

const def = {
  labels: ['Loading Data'],
  datasets: [
    {
      label: 'Number of incidents',
      backgroundColor: 'rgb(103,183,220)',
      borderColor: 'rgb(103,183,220)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [0],
    },
  ],
};

const BarGraph = ({ count }) => {
  const [barData, setBarData] = useState(def);
  const [incidentCount, setIncidentCount] = useState(null);

  useEffect(() => {
    setIncidentCount(count);
  }, [count]);

  useEffect(() => {
    if (incidentCount) {
      const dataset = createDataSet(incidentCount);
      setBarData(dataset);
    }
  }, [incidentCount]);

  return <Bar data={barData} />;
};

export default BarGraph;
