import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/HRF white-01.png';
import lambdaLogo from '../../assets/LambdaAssets/Built by lambda.png';
import IncidentFocus from '../Home/Map/IncidentFocus';
// import { useOktaAuth } from '@okta/okta-react';
import { Layout, Menu, Sider, Input, Space, Typography, notification, Button } from 'antd';
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

  const close = () => {
    console.log(
      'Notification was closed. Either the close button was clicked or duration time elapsed.',
    );
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => notification.close(key)}>
        Confirm
      </Button>
    );
    notification.open({
      message: 'WARNING',
      description:
        'Website currently not optimized for mobile device. Website currently optimized for desktop only. New features coming soon optimizing for mobile devices ',
      btn,
      key,
      onClose: close,
    });
  };

  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Link to="/">
          <img className="hrf-logo" alt="hrf-logo" src={logo} />
        </Link>
      </div>
      <Menu className="menu" mode="horizontal">
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
      <Button type="primary" onClick={openNotification}>
        Check Notifications
      </Button>,
    </div>
  );
};
export default NavBar;
