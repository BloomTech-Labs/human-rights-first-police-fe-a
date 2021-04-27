import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { createDataSet } from '../assets/bargraphAssets';

const def = {
  labels: ['Loading Data'],
  datasets: [
    {
      type: 'horizontalBar',
      label: 'Number of Incidents',
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

  return (
    <>
      <Bar data={barData} />
      <br />
      <p className="graph-disclaimer">
        Note: This graph relies on open source data from multiple sources and a
        machine learning model that is still in beta. These categories may not
        accurately represent the circumstances of each incident.{' '}
      </p>
    </>
  );
};

export default BarGraph;
