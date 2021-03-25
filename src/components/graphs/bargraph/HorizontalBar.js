import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

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
      // 'Rank 0 - No Police Presence',
      'Rank 1 - Police Presence',
      'Rank 2 - Empty-hand',
      'Rank 3 - Blunt Force',
      'Rank 4 - Chemical & Electric',
      'Rank 5 - Lethal Force',
    ],
    datasets: [
      {
        label: 'Number of Incidents',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [
          // noPresence,
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
    // const noPresenceTotal = dataList.filter((x, index) => {
    //   return x.force_rank === 'Rank 0 - No Police Presence';
    // }).length;
    // setNoPresence(noPresenceTotal);

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
      <div className="home-bar-graph">
        <h1>Incidents Grouped by Level of Police Force</h1>
        <p>
          This graph is intended to provide an at-a-glance understanding of the
          types and volume of incidents that are being cataloged.
        </p>
        <h3>Graph Legend</h3>
        <p className="graph-legend-wrap">
          <li>
            Rank I Officer Presence — Police are present, but no force detected.
          </li>
          <li>
            Rank II Empty-Hand — Officers use bodily force to gain control of a
            situation. Officers may use grabs, holds, joint locks, punches and
            kicks to restrain an individual.
          </li>
          <li>
            Rank III Blunt Force Methods — Officers use less-lethal technologies
            to gain control of a situation. Baton or projectile may be used to
            immobilize a combative person for example.
          </li>
          <li>
            Rank IV Chemical & Electric - Officers use less-lethal technologies
            to gain control of a situation, such as chemical sprays, projectiles
            embedded with chemicals, or tasers to restrain an individual.
          </li>
          <li>
            Rank V Lethal Force — Officers use lethal weapons to gain control of
            a situation.
          </li>
        </p>
        <HorizontalBar style={{ width: '100%', height: '450px' }} data={data} />
        <p className="graph-disclaimer">
          Note: This graph relies on open source data from multiple sources and
          a machine learning model that is still in beta. These categories may
          not accurately represent the circumstances of each incident.{' '}
        </p>
      </div>
    </div>
  );
};

export default Horizontalbar;
