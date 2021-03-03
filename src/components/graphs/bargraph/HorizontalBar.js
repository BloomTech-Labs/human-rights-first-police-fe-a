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
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sit amet consectetur
        adipiscing elit pellentesque. Nisi scelerisque eu ultrices vitae auctor.
        Pellentesque id nibh tortor id aliquet. Sed odio morbi quis commodo.
        Cursus eget nunc scelerisque viverra mauris in aliquam. Eget arcu dictum
        varius duis at consectetur lorem. Non blandit massa enim nec dui nunc.
        In vitae turpis massa sed. Cursus turpis massa tincidunt dui ut ornare.
        Faucibus in ornare quam viverra orci sagittis eu volutpat odio. Sed
        viverra ipsum nunc aliquet bibendum. Sit amet dictum sit amet justo.
        Maecenas ultricies mi eget mauris pharetra. Pulvinar proin gravida
        hendrerit lectus a. Tempus quam pellentesque nec nam aliquam sem et
        tortor consequat. Consectetur a erat nam at lectus urna duis.
      </p>
      <h2>Data Science Stuff Below</h2>
      <p>
        <li>Important disclaimer 1</li>
        <li>Important disclaimer 2</li>
        <li>Important disclaimer 3</li>
      </p>
      <HorizontalBar style={{ width: '100%', height: '450px' }} data={data} />
    </div>
  );
};

export default Horizontalbar;
