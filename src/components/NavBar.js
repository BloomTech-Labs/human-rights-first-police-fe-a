import React from 'react';
import 'antd/dist/antd.css';
import '../styles/nav.css';

import { Layout, Menu } from 'antd';

const { Header } = Layout;

const NavBar = () => {
  return (
    <Layout className="layout">
      <div className="logo" />
      <Menu mode="horizontal">
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Graphs</Menu.Item>
        <Menu.Item key="3">About</Menu.Item>
      </Menu>
    </Layout>
  );
};
export default NavBar;
