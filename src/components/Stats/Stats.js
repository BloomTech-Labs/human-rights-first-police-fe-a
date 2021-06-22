import React from 'react';
import { Layout } from 'antd';
import './Stats.css';

// const { Title } = Typography;
const { Content } = Layout;

const Stats = () => {
  return (
    <Content className="BW-container" Dark="On" type="Primary">
      <div className="site-layout-background">
        <p className="more-info">Click arrows for more infomation</p>
        <a href="#title" className="arrow-container">
          <div className="arrow"></div>
          <div className="arrow"></div>
          <div className="arrow"></div>
        </a>
        <div className="line-break"></div>
        <h2 id="title">Blue Witness Statistics</h2>
      </div>
    </Content>
  );
};

export default Stats;
