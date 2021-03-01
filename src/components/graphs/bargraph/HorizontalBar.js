import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { useIncidents } from '../../../hooks/legacy/useIncidents';
import { newData } from '../../map/GetFunctions';

const Horizontalbar = () => {
  const [noPresence, setNoPresence] = useState();
  const [policePresence, setPolicePresence] = useState();
  const [emptyHand, setEmptyHand] = useState();
  const [bluntForce, setBluntForce] = useState();
  const [chemicalElectric, setChemicalElectric] = useState();
  const [lethalForce, setLethalForce] = useState();

  const incidentsQuery = useIncidents();

  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];
  const dataList = newData(incidents);

  const data = {
    labels: [
      'Rank 0 - No Police Presence',
      'Rank 1 - Police Presence',
      'Rank 2 - Empty-hand',
      'Rank 3 - Blunt Force',
      'Rank 4 - Chemical & Electric',
      'Rank 5 - Lethal Force',
    ],
    datasets: [
      {
        label: 'Incidents',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [
          noPresence,
          policePresence,
          emptyHand,
          bluntForce,
          chemicalElectric,
          lethalForce,
        ],
      },
    ],
  };

  useEffect(() => {
    const noPresenceTotal = dataList.filter((x, index) => {
      return x.force_rank === 'Rank 0 - No Police Presence';
    }).length;
    setNoPresence(noPresenceTotal);

    const policePresenceTotal = dataList.filter((x, index) => {
      return x.force_rank === 'Rank 1 - Police Presence';
    }).length;
    setPolicePresence(policePresenceTotal);

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
      <h1>Total Incidents By Category</h1>
      <HorizontalBar style={{ width: '100%', height: '600px' }} data={data} />
    </div>
  );
};

export default Horizontalbar;
