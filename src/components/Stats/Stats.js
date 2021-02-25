import React, { useEffect, useState } from 'react';

import { useIncidents } from '../../hooks/legacy/useIncidents';
import { newData } from '../../components/map/GetFunctions';
import { CountUpAnimation } from './StatsFunction';
import { Carousel } from 'antd';

const Stats = () => {
  const [gasAndSpray, setGasAndSpray] = useState(0);
  const [arrests, setArrests] = useState(0);
  const [numCities, setNumCities] = useState(0);

  const incidentsQuery = useIncidents();

  const contentStyle = {
    height: '10vh',
    color: '#fff',
    lineHeight: '10vh',
    textAlign: 'center',
    background: '#003767',
  };

  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];
  const dataList = newData(incidents);

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
          We have identified &nbsp;
          <CountUpAnimation duration={1000}>{dataList.length}</CountUpAnimation>
          &nbsp; incidents of police use of force
        </h2>
      </div>
      <div className="stat spray-gas">
        <h2 style={contentStyle}>
          Including &nbsp;
          <CountUpAnimation duration={1000}>{gasAndSpray}</CountUpAnimation>
          &nbsp; uses of pepper-spray or tear-gas
        </h2>
      </div>
      <div className="stat arrests">
        <h2 style={contentStyle}>
          Resulting in &nbsp;
          <CountUpAnimation duration={1000}>{arrests}</CountUpAnimation>&nbsp;
          total arrests
        </h2>
      </div>
      <div className="stat cities">
        <h2 style={contentStyle}>
          In &nbsp;
          <CountUpAnimation duration={1000}>{numCities}</CountUpAnimation>&nbsp;
          cities across the United States
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
