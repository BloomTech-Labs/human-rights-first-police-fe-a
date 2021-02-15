import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { useIncidents } from '../../../hooks/legacy/useIncidents';
import { newData } from '../../map/GetFunctions';

const Horizontalbar = () => {
  const [emptyHandSoft, setEmptyHandSoft] = useState();
  const [emptyHandHard, setEmptyHandHard] = useState();
  const [officerPresence, setOfficerPresence] = useState();
  const [verbalization, setVerbalization] = useState();
  const [lessLethalMethods, setLessLethalMethods] = useState();
  const [lethalForce, setLethalForce] = useState();

  const incidentsQuery = useIncidents();

  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];
  const dataList = newData(incidents);

  const data = {
    labels: [
      'Empty-Hand-Soft',
      'Empty-Hand-Hard',
      'Officer Presence',
      'Verbalization',
      'Less-Lethal Methods',
      'Lethal-force',
    ],
    datasets: [
      {
        label: 'Incidents',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [emptyHandSoft, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  useEffect(() => {
    const emptyhandsoftTotal = dataList.filter((x, index) => {
      return x.empty_hand_soft === true;
    }).length;
    //   const emptyhandsoftLength = emptyhandsoftTotal.length;
    setEmptyHandSoft(emptyhandsoftTotal);

    const emptyHandHardTotal = dataList.filter((x, index) => {
      return x.empty_hand_soft === true;
    }).length;

    setEmptyHandHard(emptyHandHardTotal);

    const officerPresenceTotal = dataList.filter((x, index) => {
      return x.empty_hand_soft === true;
    }).length;
    setOfficerPresence(officerPresenceTotal);

    const verbalizationTotal = dataList.filter((x, index) => {
      return x.empty_hand_soft === true;
    }).length;
    setVerbalization(verbalizationTotal);

    const lessLethalMethodsTotal = dataList.filter((x, index) => {
      return x.empty_hand_soft === true;
    }).length;
    setLessLethalMethods(lessLethalMethodsTotal);

    const lethalforceMethodsTotal = dataList.filter((x, index) => {
      return x.empty_hand_soft === true;
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
