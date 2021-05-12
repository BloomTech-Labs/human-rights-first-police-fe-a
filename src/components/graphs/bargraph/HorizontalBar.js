import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

import Legend from '../assets/Legend';

const Horizontalbar = () => {
  // const [noPresence, setNoPresence] = useState();
  const [policePresence, setPolicePresence] = useState();
  const [emptyHand, setEmptyHand] = useState();
  const [bluntForce, setBluntForce] = useState();
  const [chemicalElectric, setChemicalElectric] = useState();
  const [lethalForce, setLethalForce] = useState();

  const dataList = useSelector(state => Object.values(state.incident.data));

  const data = {
    labels: [
      'Rank 2 - Empty-hand',
      'Rank 3 - Blunt Force',
      'Rank 4 - Chemical & Electric',
      'Rank 5 - Lethal Force',
    ],
    datasets: [
      {
        label: 'Number of Incident Reports',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [emptyHand, bluntForce, chemicalElectric, lethalForce],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      xAxes: [
        {
          //stacked and begin at zero must be 'true' for bar graph to start at 0
          stacked: true,
          beginAtZero: true,
        },
      ],
    },
  };

  useEffect(() => {
    const emptyHandTotal = dataList.filter((x, index) => {
      return x.force_rank === 'Rank 2 - Empty-hand';
    }).length;
    setEmptyHand(emptyHandTotal);

    const bluntForceTotal = dataList.filter((x, index) => {
      return x.force_rank === 'Rank 3 - Blunt Force';
    }).length;
    setBluntForce(bluntForceTotal);

    const chemicalElectricTotal = dataList.filter((x, index) => {
      return x.force_rank === 'Rank 4 - Chemical & Electric';
    }).length;
    setChemicalElectric(chemicalElectricTotal);

    const lethalforceMethodsTotal = dataList.filter((x, index) => {
      return x.force_rank === 'Rank 5 - Lethal Force';
    }).length;
    setLethalForce(lethalforceMethodsTotal);
  }, [dataList]);

  return (
    <div>
      <div className="home-bar-graph">
        <h1>Incident Reports Grouped by Level of Police Force</h1>
        <p>
          This graph is intended to provide an at-a-glance understanding of the
          types and volume of incident reports that are being cataloged.
        </p>
        <Legend />
        <HorizontalBar
          style={{ width: '100%', height: '450px' }}
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};

export default Horizontalbar;
