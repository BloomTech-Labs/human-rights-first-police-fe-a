import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { options } from '../assets';

const LineGraph = ({ data, months }) => {
  const [inCategories, setInCategories] = useState({});
  const [labels, setLabels] = useState([]);
  const [incidentID, setIncidentID] = useState('all');
  const [label, setLabel] = useState('All');
  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    setLabels(months);
  }, [data, months]);

  useEffect(() => {
    if (
      !(Object.keys(data).length === 0 && inCategories.constructor === Object)
    ) {
      let d = [];

      months.forEach(month => {
        d.push(data[month]);
      });

      setLineData(d);
    }
  }, [data, labels]);

  // useEffect(() => {
  //   // Test to see if data is empty, if it's not, then do stuff
  //   if (!(Object.keys(data).length === 0 && data.constructor === Object)) {
  //     // Create the template for the data to be stored in:
  //     // Dynamically create labels denoting every month in my dataset:

  //   const lineData = {
  //   labels: months,
  //   datasets: [
  //     {
  //       incidentId: 'all',
  //       label: 'All',
  //       data: [],
  //       borderColor: '#c0ba17',
  //       backgroundColor: 'rgba(0,0,0,0)',
  //     },
  //   ],
  // }

  //     months.forEach(month => {
  //       inCategories.datasets[0].data.push(data[month]);
  //     });
  //   }
  // }, [data]);

  return (
    <div
      style={{
        backgroundColor: '#191A1A',
        margin: '0 auto',
        maxWidth: '1550px',
      }}
    >
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              incidentId: incidentID,
              label: label,
              data: lineData,
              borderColor: '#c0ba17',
              backgroundColor: 'rgba(0,0,0,0)',
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default LineGraph;
