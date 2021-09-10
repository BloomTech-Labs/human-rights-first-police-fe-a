import React from 'react';
import { Layout } from 'antd';
import './Stats.css';

const { Content } = Layout;

const Stats = () => {
  return (
    <Content className="BW-container" Dark="On" type="Primary">
      <div className="site-layout-background">
        <p className="more-info">Click arrows for more information</p>
        <a href="#bw-title" className="arrow-container">
          <div className="arrow"></div>
          <div className="arrow"></div>
          <div className="arrow"></div>
        </a>
        <div className="line-break"></div>
        <h2 className="blue-witness-title" id="bw-title">
          Blue Witness Statistics
        </h2>
      </div>
    </Content>
  );
};

export default Stats;
