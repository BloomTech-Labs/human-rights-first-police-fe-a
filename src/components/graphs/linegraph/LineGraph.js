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
      let lineDataPoints = [];

      months.forEach(month => {
        lineDataPoints.push(data[month]);
      });

      setLineData(lineDataPoints);
    }
  }, [data, labels]);

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
              borderColor: '#f7f7f7',
              backgroundColor: '#ededed',
              pointBackgroundColor: '#e63946',
              pointBorderColor: '#95363d',
            },
          ],
        }}
        options={options}
      />
    </div>
  );
};

export default LineGraph;
