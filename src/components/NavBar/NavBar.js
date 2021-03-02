import React from 'react';
import 'antd/dist/antd.css';
import { Link, NavLink } from 'react-router-dom';

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
              <NavLink
                to="/"
                exact
                className="nav-link"
                activeClassName="active-nav-link"
              >
                Home
              </NavLink>
            </Menu.Item>

            <Menu.Item key="2">
              <NavLink to="/incidents" activeClassName="active-nav-link">
                Incidents
              </NavLink>
            </Menu.Item>

            <Menu.Item key="3">
              <NavLink to="/graph" activeClassName="active-nav-link">
                Graphs
              </NavLink>
            </Menu.Item>

            <Menu.Item key="4">
              <NavLink to="/about" activeClassName="active-nav-link">
                About{' '}
              </NavLink>
            </Menu.Item>

            <Menu.Item key="5">
              <NavLink to="/admin-dashboard" activeClassName="active-nav-link">
                Admin Dashboard
              </NavLink>
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
