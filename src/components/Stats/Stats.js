import React, { useEffect, useState } from 'react';

import { useIncidents } from '../../state/query_hooks/useIncidents';
import { newData } from '../../components/map/GetFunctions';
import { CountUpAnimation } from './StatsFunction';
import { ArrowUpOutlined } from '@ant-design/icons';
import { ArrowDownOutlined } from '@ant-design/icons';

import { Divider } from 'antd';
import {DateTime} from 'luxon'

const Stats = () => {
  const [gasAndSpray, setGasAndSpray] = useState();
  const [backDays, setBackDays] =useState()
  const [currentDays, setCurrentDays] = useState()

  const incidentsQuery = useIncidents();

  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];
  const dataList = newData(incidents);



  useEffect(() => {
  
    let newCat = [];
    // console.log(incidents)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 60); 

    const endDate =  new Date()
    endDate.setDate(endDate.getDate() - 30)

    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 1)

    const backDay = dataList.filter((time, index) => {
      let date = new Date (time.date)
     return (date >= startDate && date <= endDate)
    });
    setBackDays(backDay)

    const currentDay = dataList.filter((time, index)=>{
      let date = new Date (time.date)
      return (date >= endDate && date <= currentDate)
    })
    setCurrentDays(currentDay)
  

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

    setGasAndSpray(pepperSpray.length + tearGas.length);

    let car = [];
  }, [dataList]);

  return (
    
    <div className="stats">
      
      <div className="Total-incidents">
        <h1>Total Incidents</h1>
        <h1>
          <CountUpAnimation duration={1000}>{dataList.length}</CountUpAnimation>
          &nbsp;&nbsp;{backDays?.lenght > currentDays?.length?<ArrowUpOutlined />:<ArrowDownOutlined />} 
        </h1>
      </div>
      <Divider style={{ borderWidth: '1px' }} />
      <div className="Total-spray-gas">
        <h1> Uses of Pepper-Spray & Tear-Gas </h1>
        <h1>
          <CountUpAnimation duration={1000}>{gasAndSpray}</CountUpAnimation>
          &nbsp;&nbsp; <ArrowUpOutlined />
        </h1>
      </div>
      <Divider style={{ borderWidth: '1px' }} />
    </div>
  );
};

export default Stats;
