import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { options, createData, defaultData, months } from '../assets';

const LineGraph = ({ monthlyData, selectedYear }) => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    // Test to see if monthlyData is empty, if it's not, then do stuff
    if (
      !(
        Object.keys(monthlyData).length === 0 &&
        monthlyData.constructor === Object
      )
    ) {
      // Create the template for the data to be stored in:
      const incidentCategories = {
        labels: months,
        datasets: [],
      };

      for (let year in monthlyData) {
        console.log(createData(monthlyData[year], year));
        incidentCategories.datasets.push(createData(monthlyData[year], year));
      }

      setData(incidentCategories);
    }
  }, [monthlyData, setData]);

  return (
    <div
      style={{
        backgroundColor: '#191A1A',
        margin: '0 auto',
        maxWidth: '1550px',
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
