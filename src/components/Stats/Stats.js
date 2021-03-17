import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CountUpAnimation } from './StatsFunction';
import { Carousel } from 'antd';

const Stats = () => {
  const [gasAndSpray, setGasAndSpray] = useState(0);
  const [arrests, setArrests] = useState(0);
  const [numCities, setNumCities] = useState(0);

  const contentStyle = {
    height: '13vh',
    color: '#fff',
    lineHeight: '12vh',
    textAlign: 'center',
    background: '#003767',
  };

  const dataList = useSelector(state => Object.values(state.incident.data));

  useEffect(() => {
    let newCat = [];

    const newCategories = dataList.map((gas, index) => {
      return newCat.push(gas.categories.flat());
    });
    let pepperSpray = newCat.flat().filter((filters, index) => {
      return filters === 'pepper-spray';
    });
    let tearGas = newCat.flat().filter((filters, index) => {
      return filters === 'tear-gas';
    });
    let totalCities = dataList.map(city => {
      return city.city;
    });
    let reducedCities = [...new Set(totalCities)];
    let totalArrests = newCat.flat().filter((filters, index) => {
      return filters === 'arrest';
    });

    setGasAndSpray(pepperSpray.length + tearGas.length);
    setArrests(totalArrests.length);
    setNumCities(reducedCities.length);
  }, [dataList]);

  return (
    <Carousel autoplay>
      <div className="stat incidents">
        <h2 style={contentStyle}>
          We have identified {dataList.length} incidents of police use of force
        </h2>
      </div>
      <div className="stat spray-gas">
        <h2 style={contentStyle}>
          Including {gasAndSpray} uses of pepper-spray or tear-gas
        </h2>
      </div>
      <div className="stat arrests">
        <h2 style={contentStyle}>Resulting in {arrests} total arrests</h2>
      </div>
      <div className="stat cities">
        <h2 style={contentStyle}>
          In {numCities} cities across the United States
        </h2>
      </div>
      <div className="stat description">
        <h2 style={contentStyle}>
          By collecting and processing crowdsourced data from Reddit and Twitter
        </h2>
      </div>
    </Carousel>
  );
};

export default Stats;
