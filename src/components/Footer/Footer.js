import React from 'react';
import 'antd/dist/antd.css';
import { Link, NavLink } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';

import './Footer.css';
import builtByLambda from '../../assets/LambdaAssets/Built by lambda.png';

const Footer = () => {
  const { push } = useHistory();

  const { authState } = useOktaAuth();

  const logout = () => {
    localStorage.removeItem('okta-token-storage', 'okta-cache-storage');
    push('/');
    window.location.reload();
  };

  // return (
  //   <div className="footer-container">
  //     <div className="nav-footer">
  //       <nav>
  //         <Layout className="layout">
  //           <div className="copyright-container">
  //             <Menu mode="horizontal" className="override">
  //               <Menu.Item key="1">
  //                 <a
  //                   href="https://www.humanrightsfirst.org"
  //                   target="_blank"
  //                   exact
  //                   className="nav-link"
  //                   activeClassName="active-nav-link"
  //                   rel="noreferrer"
  //                 >
  //                   Human Rights First
  //                 </a>
  //               </Menu.Item>

  //               <Menu.Item key="2">
  //                 <NavLink
  //                   to="/admin-dashboard"
  //                   activeClassName="active-nav-link"
  //                 >
  //                   Administration
  //                 </NavLink>
  //               </Menu.Item>
  //               {authState.isAuthenticated && (
  //                 <Menu.Item key="3" className="logout" onClick={logout}>
  //                   <NavLink to="/" activeClassName="active-nav-link">
  //                     Log out
  //                   </NavLink>
  //                 </Menu.Item>
  //               )}
  //             </Menu>
  //             <p>Human Rights First &copy;2021</p>
  //           </div>
  //         </Layout>
  //       </nav>
  //     </div>
  //     {/* <Layout className="layout"> */}
  //     {/* <div className="hrf-container">
  //         <a href="https://www.humanrightsfirst.org" target="_blank">Human Rights First</a>
  //       </div>
  //       <div className="admin-dash-container">
  //         <Link to="/admin-dashboard">Administration</Link>
  //       </div> */}

  //     {/* </Layout> */}
  //   </div>
  // );

  return (
    <div className="footer-container">
      <div className="top-container">
        <div className="footer-links-container">
          <div className="left-links">
            <h3>Blue Witness</h3>
            <a
              href="https://www.humanrightsfirst.org"
              target="_blank"
              alt="Human Rights First"
            >
              Human Rights First
            </a>
            <br />
            <a href="" target="_blank" alt="Twitter Bot">
              Twitter Bot
            </a>
            <br />
            <a
              href="https://www.humanrightsfirst.org"
              target="_blank"
              alt="Admin Dashboard"
            >
              Admin Dashboard
            </a>
            <br />
          </div>
          <div className="right-links">
            <h3>Lambda School</h3>
            <a
              href="https://lambdaschool.com/"
              target="_blank"
              alt="Lambda School"
            >
              Lambda School
            </a>
            <br />
            <a
              href="https://github.com/Lambda-School-Labs"
              target="_blank"
              alt="Lambda Labs GitHub"
            >
              Lambda Labs GitHub
            </a>
            <br />
          </div>
        </div>
        <div className="built-by-lambda-container">
          <img
            className="built-by-lambda"
            src={builtByLambda}
            alt="built by lambda logo"
          />
        </div>
      </div>
      <div className="copyright-container">
        <p>Human Rights First &copy;2021</p>
      </div>
    </div>
  );
};

export default Footer;
