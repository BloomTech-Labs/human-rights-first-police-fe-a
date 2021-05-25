import React from 'react';
import { NavLink } from 'react-router-dom';
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
              rel="noreferrer"
            >
              Human Rights First
            </a>
            <br />
            <a
              href="https://www.humanrightsfirst.org"
              target="_blank"
              rel="noreferrer"
              alt="Twitter Bot"
            >
              Twitter Bot
            </a>
            <br />
            <NavLink to="/admin-dashboard" activeClassName="active-nav-link">
              Admin Dashboard
            </NavLink>
            {authState.isAuthenticated && (
              <div className="logout" onClick={logout}>
                <NavLink to="/" activeClassName="active-nav-link">
                  Log out
                </NavLink>
              </div>
            )}
            <br />
          </div>
          <div className="right-links">
            <h3>Lambda School</h3>
            <a
              href="https://lambdaschool.com/"
              target="_blank"
              alt="Lambda School"
              rel="noreferrer"
            >
              Lambda School
            </a>
            <br />
            {/* Do we want to include the Labs GitHub? */}
            {/* <a
              href="https://github.com/Lambda-School-Labs"
              target="_blank"
              alt="Lambda Labs GitHub"
              rel="noreferrer"
            >
              Lambda Labs GitHub
            </a> */}
            <br />
          </div>
        </div>
        <div className="built-by-lambda-container">
          <a href="https://lambdaschool.com/" target="_blank" rel="noreferrer">
            <img
              className="built-by-lambda"
              src={builtByLambda}
              alt="built by lambda logo"
            />
          </a>
        </div>
      </div>
      <div className="copyright-container">
        <p>Human Rights First &copy;2021</p>
      </div>
    </div>
  );
};

export default Footer;
