import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CountUpAnimation } from './StatsFunction';
import { Layout, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;
const { Content } = Layout;

const Stats = () => {
  const [gasAndSpray, setGasAndSpray] = useState(0);
  const [arrests, setArrests] = useState(0);
  const [numCities, setNumCities] = useState(0);
  // Banner Style settings
  const contentStyle = {
    padding: '6rem',
    color: 'white',
    textAlign: 'center',
    background: '#2f54eb',
  };
  // Documents the reports of incidents and sores them in a state in which it can be displayed on the Banner
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
    <Content Dark="On" type="Primary">
      <div className="site-layout-background" style={contentStyle}>
        <Title style={{ color: 'white', fontWeight: 'normal' }}>
          Blue Witness Statistics
        </Title>
        <Paragraph style={{ color: 'white' }}>
          {dataList.length} incidents of police use of force. {gasAndSpray} uses
          of pepper-spray or tear-gas. {numCities} cities across the United
          States.
        </Paragraph>
        <Button style={{ margin: '.5rem' }} shape="round" ghost>
          <Link to="/incident-reports">Incident Reports</Link>
        </Button>
        <Button style={{ margin: '.5rem' }} shape="round" ghost>
          <Link to="/about">About</Link>
        </Button>
      </div>
    </Content>
  );
};

export default Stats;
