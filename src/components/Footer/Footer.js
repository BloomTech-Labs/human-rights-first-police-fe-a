import React from 'react';
import 'antd/dist/antd.css';
import { Link, NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import lambda from '../../assets/LambdaAssets/Built by lambda.png';

const Footer = () => {

  const logout = () => {
    localStorage.removeItem('okta-token-storage', 'okta-cache-storage');
    window.location.reload();
  };

  return (
    <div className="footer-container">
      <div className="nav-footer">
        <nav>
          <Layout className="layout">
            <div className="copyright-container">
              <Menu mode="horizontal" className="override">
                <Menu.Item key="1">
                  <a
                    href="https://www.humanrightsfirst.org"
                    target="_blank"
                    exact
                    className="nav-link"
                    activeClassName="active-nav-link"
                  >
                    Human Rights First
                  </a>
                </Menu.Item>

                <Menu.Item key="2">
                  <NavLink
                    to="/admin-dashboard"
                    activeClassName="active-nav-link"
                  >
                    Administration
                  </NavLink>
                </Menu.Item>

                <Menu.Item key="3" className="logout" onClick={logout}>
                  <NavLink
                    to="/"
                    activeClassName="active-nav-link"
                  >
                    Log out
                  </NavLink>
                </Menu.Item>

                <a href="https://www.lambdaschool.com" target="Lambda School">
                  <img className="lambda-logo" alt="lambda-logo" src={lambda} />
                </a>

              </Menu>

              <p>Human Rights First &copy;2021</p>
            </div>
          </Layout>
        </nav>
      </div>
      {/* <Layout className="layout"> */}
      {/* <div className="hrf-container">
          <a href="https://www.humanrightsfirst.org" target="_blank">Human Rights First</a>
        </div>
        <div className="admin-dash-container">
          <Link to="/admin-dashboard">Administration</Link>
        </div> */}

      {/* </Layout> */}
    </div>
  );
};

export default Footer;
