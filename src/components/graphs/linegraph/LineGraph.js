import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { options, createData, defaultData } from './assets';

const LineGraph = ({ monthlyData }) => {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    setData(createData(monthlyData));
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
