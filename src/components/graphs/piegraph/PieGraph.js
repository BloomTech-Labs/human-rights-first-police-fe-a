import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

import Key from './Key';

// Colors
// import randomColor from 'randomcolor'; // https://github.com/davidmerfield/randomColor
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
    switch (true) {
      case incident.verbalization:
        incrementor(incident, 'verbalization', types);
        break;

      case incident.empty_hand_soft:
        incrementor(incident, 'empty_hand_soft', types);
        break;

      case incident.empty_hand_hard:
        incrementor(incident, 'empty_hand_hard', types);
        break;

      case incident.less_lethal_methods:
        incrementor(incident, 'less_lethal_methods', types);
        break;

      case incident.lethal_force:
        incrementor(incident, 'lethal_force', types);
        break;

      case incident.uncategorized:
        incrementor(incident, 'uncategorized', types);
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
      percent: ((num / policeData.length) * 100).toPrecision(3),
    };
  });
  return types;
};

const createDataPoints = data => {
  let d = {
    labels: Object.keys(data).map(key => `${key}`),
    datasets: [
      {
        data: Object.keys(data).map(key => data[key]['percent']),
        backgroundColor: [
          '#8067dc',
          '#dc6967',
          '#67b7dc',
          '#dcaf67',
          '#6771dc',
          '#dc67ab',
        ],
        hoverBackgroundColor: [],
        borderColor: [],
        hoverBorderWidth: 5,
        borderAlign: 'inner',
      },
    ],
  };

  for (let i = 0; i < d.datasets[0].data.length; i++) {
    d.datasets[0].backgroundColor.forEach(color =>
      d.datasets[0].borderColor.push(colorShader(color, -1))
    );
  }

  return d;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [types]);

  return (
    <>
      <Pie data={graphData} />
      <Key />
    </>
  );
};

export default PieGraph;
