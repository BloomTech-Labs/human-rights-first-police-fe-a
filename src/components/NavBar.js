import React from 'react';
import 'antd/dist/antd.css';
import '../styles/nav.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// import logo from '../assets/humanRightsLogo.svg';

import { Layout, Menu } from 'antd';

const { Header } = Layout;

const NavBar = () => {
  return (
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
  );
};
export default NavBar;
