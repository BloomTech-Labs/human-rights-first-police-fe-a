import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/HRF white-01.png';
import lambdaLogo from '../../assets/LambdaAssets/Built by lambda.png';
import IncidentFocus from '../Home/Map/IncidentFocus';
// import { useOktaAuth } from '@okta/okta-react';
import { Layout, Menu, Sider, Input, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
    <div
      style={{
        display: 'flex',
        background: '#2f54eb',
        textAlign: 'center',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <img
          className="hrf-logo"
          alt="hrf-logo"
          src={logo}
          style={{ width: '20rem', paddingLeft: '1rem' }}
        />
        <span style={{ color: 'white', paddingTop: '10rem' }}>|</span>
        <Input
          prefix={<SearchOutlined style={{ color: 'white' }} />}
          size="small"
          style={{ width: '10rem', background: 'transparent', border: 'none' }}
          placeholder="Search incidents"
        />
      </div>
      <Menu
        mode="horizontal"
        style={{ background: '#2f54eb', paddingTop: '1rem' }}
      >
        <Space></Space>
        <Menu.Item key="1">
          <Link to="/" style={{ color: 'white' }}>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/incident-reports" style={{ color: 'white' }}>
            Reports
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/graph" style={{ color: 'white' }}>
            Graph
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/about" style={{ color: 'white' }}>
            About
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};
export default NavBar;
