import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

import logo from '../../assets/hrf-logo.png';
import lambda from '../../assets/LambdaAssets/Built by lambda.png';

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
              <Link to="/incidents">Incidents</Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link to="/graph">Graphs</Link>
            </Menu.Item>

            <Menu.Item key="4">
              <Link to="/about">About </Link>
            </Menu.Item>

            <Menu.Item key="5">
              <Link to="/admin-dashboard">Admin Dashboard</Link>
            </Menu.Item>

            <Menu.Item key="6">
              <div className="lambda-container">
                <img src={lambda} alt="Built By Lambda" className="lambda" />
              </div>
            </Menu.Item>
          </Menu>
        </Layout>
      </nav>
    </div>
  );
};
export default NavBar;
