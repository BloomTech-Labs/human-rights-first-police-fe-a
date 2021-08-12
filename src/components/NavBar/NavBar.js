import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link, NavLink } from 'react-router-dom';

import bwlogo from '../../assets/blue-witness1.png';
import hrflogo from '../../assets/hrf-logo1.3.png';
import lambdaLogo from '../../assets/LambdaAssets/Built by lambda.png';
import IncidentFocus from '../Home/Map/IncidentFocus';
// import { useOktaAuth } from '@okta/okta-react';
import { Layout, Menu, Sider, Input, Space, Typography } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './nav.css';
const { Search } = Input;

const { SubMenu } = Menu;
const { Title, Paragraph } = Typography;
const NavBar = () => {
  const [navState, setNavState] = useState(false);

  let handleClick = () => {
    setNavState(!navState);
  };

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Link to="/">
          <img className="bw-logo" alt="blue-witness-logo" src={bwlogo} />
        </Link>
        <a href="https://www.humanrightsfirst.org">
          <img src={hrflogo} className="hrf-logo" alt="HRF logo" />
        </a>
      </div>
      <Menu
        className="menu"
        mode="horizontal"
        overflowedIndicator={
          <MenuOutlined
            style={{ margin: '0', fontSize: '1.5rem', paddingTop: '14px' }}
          />
        }
      >
        <Space></Space>
        <Menu.Item key="1">
          <Link className="menu-link" to="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link className="menu-link" to="/incident-reports">
            Incident Reports
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link className="menu-link" to="/graph">
            Graph
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link className="menu-link" to="/about">
            About
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default NavBar;
