import React from 'react';
import 'antd/dist/antd.css';
import '../styles/nav.css';
import { Link } from 'react-router-dom';

import logo from '../assets/hrflogo.png';

import { Layout, Menu } from 'antd';

const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Human Rights First" className="logo" />
        </Link>
      </div>
      <nav>
        <Layout className="layout">
          <Menu mode="horizontal">
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/incidents">Incidents </Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="/graph">Graphs</Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to="/about">About </Link>
            </Menu.Item>
          </Menu>
        </Layout>
      </nav>
    </div>
  );
};
export default NavBar;
