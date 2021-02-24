import React, { useEffect, useState } from 'react';

import { useIncidents } from '../../hooks/legacy/useIncidents';
import { newData } from '../../components/map/GetFunctions';
import { CountUpAnimation } from './StatsFunction';
import { ArrowUpOutlined } from '@ant-design/icons';

const Stats = () => {
  const [gasAndSpray, setGasAndSpray] = useState(0);
  const [arrests, setArrests] = useState(0);

  const incidentsQuery = useIncidents();

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
    let totalArrests = newCat.flat().filter((filters, index) => {
      return filters == 'arrest';
    });

    setGasAndSpray(pepperSpray.length + tearGas.length);
    setArrests(totalArrests.length);
  }, [dataList]);

  return (
    <div className="stats">
      <div className="stat incidents">
        <h2>Total Incidents</h2>
        <h2>
          <CountUpAnimation duration={1000}>{dataList.length}</CountUpAnimation>
          &nbsp;&nbsp; <ArrowUpOutlined />
        </h2>
      </div>
      <div className="stat spray-gas">
        <h2> Uses of Pepper-Spray & Tear-Gas </h2>
        <h2>
          <CountUpAnimation duration={1000}>{gasAndSpray}</CountUpAnimation>
          &nbsp;&nbsp; <ArrowUpOutlined />
        </h2>
      </div>
      <div className="stat arrests">
        <h2> Total Arrests </h2>
        <h2>
          <CountUpAnimation duration={1000}>{arrests}</CountUpAnimation>
          &nbsp;&nbsp; <ArrowUpOutlined />
        </h2>
      </div>
    </div>
  );
};

export default Stats;
