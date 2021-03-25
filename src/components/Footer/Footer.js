import React from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const Footer = () => {
  return (
    <div className="footer-container">
      <Layout className="layout">
        <div className="admin-dash-container">
          <Link to="/admin-dashboard">Administration</Link>
        </div>
        <div className="copyright-container">
          <p>Human Rights First &copy;2021</p>
        </div>
      </Layout>
    </div>
  );
};

export default Footer;
