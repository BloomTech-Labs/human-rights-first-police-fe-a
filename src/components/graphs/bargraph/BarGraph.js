import React, { useState, useEffect } from 'react';
import { Bar, HorizontalBar } from 'react-chartjs-2';

import './BarGraph.less';

const graphOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        scaleLabel: {
          fontSize: 20,
          display: true,
          labelString: 'U.S. State',
          padding: 20,
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          fontSize: 20,
          display: true,
          labelString: 'Number of Incidents',
        },
      },
    ],
  },
  legend: {
    display: false,
  },
};

const horizOptions = {
  ...graphOptions,
  scales: {
    xAxes: [
      {
        position: 'top',
        scaleLabel: {
          fontSize: 14,
          display: true,
          labelString: 'Number of Incidents',
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          fontSize: 14,
          display: true,
          labelString: 'U.S. State',
        },
      },
    ],
  },
};

const def = {
  labels: ['Loading Data'],
  datasets: [
    {
      label: 'Number of Incidents',
      backgroundColor: '#597ef7',
      borderColor: '#2f54eb',
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
    const queryMatcher = window.matchMedia('(max-width: 1100px)');
    setHorizShowing(queryMatcher.matches);
    const callback = ({ matches }) => {
      setHorizShowing(matches);
    };
    queryMatcher.addListener(callback);

    return () => {
      queryMatcher.removeListener(callback);
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
          <HorizontalBar data={horizBarData} options={horizOptions} />
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
