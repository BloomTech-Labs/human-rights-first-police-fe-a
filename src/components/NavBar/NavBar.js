import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link, NavLink } from 'react-router-dom';

import bwlogo from '../../assets/blue-witness1.png';
import hrflogo from '../../assets/hrf-logo1.3.png';
import lambdaLogo from '../../assets/LambdaAssets/Built by lambda.png';
import IncidentFocus from '../Home/Map/IncidentFocus';
import { useOktaAuth } from '@okta/okta-react';
import { Layout, Menu, Sider, Input, Space, Typography } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './NavBar.less';
const { Search } = Input;

const { SubMenu } = Menu;
const { Title, Paragraph } = Typography;
const NavBar = () => {
  const [navState, setNavState] = useState(false);

  let handleClick = () => {
    setNavState(!navState);
  };

  const { oktaAuth, authState } = useOktaAuth();

  const logout = () => {
    oktaAuth.signOut('/');
  };

  return (
    <div className="navbar-container">
      <a
        href="https://humanrightsfirst.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="logo-container">
          <img className="bw-logo" alt="blue-witness-logo" src={bwlogo} />
          <img src={hrflogo} className="hrf-logo" alt="HRF logo" />
        </div>
      </a>
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
        {authState.isAuthenticated && (
          <>
            <Menu.Item key="5">
              <Link className="menu-link" to="/admin-dashboard">
                Admin Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <div className="menu-link" onClick={logout}>
                Log out
              </div>
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  );
};
export default NavBar;
