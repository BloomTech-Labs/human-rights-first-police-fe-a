import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

import colorShader from './colorShader';

const incrementor = (incident, type, types) => {
  if (type in types) {
    types[type] += 1;
  } else {
    types[type] = 1;
  }
};

const getTypesOfForce = data => {
  let types = {};

  data.forEach(incident => {
    switch (incident.force_rank) {
      // case 'Rank 0 - No Police Presence':
      //   incrementor(incident, 'Uncategorized', types);
      //   break;

      case 'Rank 1 - Officer Presence':
        incrementor(incident, 'Officer Presence', types);
        break;

      case 'Rank 2 - Empty-hand':
        incrementor(incident, 'Empty Hand', types);
        break;

      case 'Rank 3 - Blunt Force':
        incrementor(incident, 'Blunt Force', types);
        break;

      case 'Rank 4 - Chemical & Electric':
        incrementor(incident, 'Chemical & Electric', types);
        break;

      case 'Rank 5 - Lethal Force':
        incrementor(incident, 'Lethal Force', types);
        break;

      default:
        break;
    }
  });

  return types;
};

const getPercentages = (types, policeData) => {
  Object.keys(types).forEach(key => {
    const num = types[key];
    types[key] = {
      num,
      percent: Math.ceil((num / policeData.length) * 100).toPrecision(3),
    };
  });
  return types;
};

const createDataPoints = data => {
  let pieData = {
    labels: Object.keys(data).map(key => `${key}`),
    datasets: [
      {
        data: Object.keys(data).map(key => data[key]['percent']),
        backgroundColor: [
          '#3ca9a6',
          '#ae53bc',
          '#4a9c4f',
          '#6771dc',
          '#dc67ab',
        ],
        hoverBackgroundColor: [],
        borderColor: [],
        hoverBorderWidth: 0,
        borderAlign: 'inner',
      },
    ],
  };

  for (let i = 0; i < pieData.datasets[0].data.length; i++) {
    pieData.datasets[0].backgroundColor.forEach(color =>
      pieData.datasets[0].borderColor.push(colorShader(color, -1))
    );
  }

  return pieData;
};

const PieGraph = ({ data, usState }) => {
  const [graphData, setGraphData] = useState({
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  });
  const [types, setTypes] = useState(null);

  useEffect(() => {
    setTypes(getTypesOfForce(data, usState));
  }, [data, usState]);

  useEffect(() => {
    if (types) {
      setTypes(getPercentages(types, data));
      setGraphData(createDataPoints(types));
    }
  }, [types]);

  return (
    <div>
      <Pie data={graphData} />
      {/* <br />
      <p className="graph-disclaimer">
        Note: This graph relies on open source data from multiple sources and a
        machine learning model that is still in beta. These categories may not
        accurately represent the circumstances of each incident.{' '}
      </p> */}
      {/* <Key /> */}
    </div>
  );
};

export default PieGraph;
