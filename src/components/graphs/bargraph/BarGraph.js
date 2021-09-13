import React, { useState, useEffect } from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';

import './BarGraph.less';

const graphOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const def = {
  labels: ['Loading Data'],
  datasets: [
    {
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
  const [horizBarData, setHorizBarData] = useState(def);
  const [horizShowing, setHorizShowing] = useState(false);

  useEffect(() => {
    const below1100px = window.matchMedia('(max-width: 1100px)');
    const callback = ({ matches }) => {
      setHorizShowing(matches);
      console.log(matches);
    };
    below1100px.addListener(callback);
    return () => {
      below1100px.removeListener(callback);
    };
  }, []);

  useEffect(() => {
    const data = {
      datasets: [
        {
          ...def.datasets[0],
          data: Object.values(count).map(elem => elem.count),
        },
      ],
    };
    setBarData({
      ...data,
      labels: Object.keys(count),
    });
    setHorizBarData({
      ...data,
      labels: Object.values(count).map(elem => elem.abbreviation),
    });
  }, [count]);

  return (
    <>
      <div className="bar-container">
        {horizShowing ? (
          <HorizontalBar data={horizBarData} options={graphOptions} />
        ) : (
          <Bar data={barData} options={graphOptions} />
        )}
      </div>
      <p className="graph-disclaimer">
        Note: This graph relies on open source data from multiple sources and a
        machine learning model that is still in beta. These categories may not
        accurately represent the circumstances of each incident.{' '}
      </p>
    </>
  );
};

export default BarGraph;
