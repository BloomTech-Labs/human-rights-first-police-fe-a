import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/HRF white-01.png';
import lambdaLogo from '../../assets/LambdaAssets/Built by lambda.png';
import IncidentFocus from '../Home/Map/IncidentFocus';
// import { useOktaAuth } from '@okta/okta-react';
import { Layout, Menu, Sider, Input, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './nav.css';
const { Search } = Input;

const { SubMenu } = Menu;
const { Title, Paragraph } = Typography;
const NavBar = () => {
  const [navState, setNavState] = useState(false);

  let handleClick = () => {
    setNavState(!navState);
  };

  return (
    <div
      style={{
        display: 'flex',
        background: '#2f54eb',
        textAlign: 'center',
        justifyContent: 'space-around',
      }}
    >
      <div>
        <img
          className="hrf-logo"
          alt="hrf-logo"
          src={logo}
          style={{ width: '20rem', paddingLeft: '1rem' }}
        />
        <span style={{ color: 'white', paddingTop: '10rem' }}>|</span>
        <Input
          prefix={<SearchOutlined style={{ color: 'white' }} />}
          size="small"
          style={{ width: '10rem', background: 'transparent', border: 'none' }}
          placeholder="Search incidents"
        />
      </div>

      <Menu
        mode="horizontal"
        style={{ background: '#2f54eb', paddingTop: '1rem' }}
      >
        <Space></Space>
        <Menu.Item key="1">
          <Link to="/" style={{ color: 'white' }}>
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/incidents" style={{ color: 'white' }}>
            Incidents
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/graph" style={{ color: 'white' }}>
            Graph
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/about" style={{ color: 'white' }}>
            About
          </Link>
        </Menu.Item>
      </Menu>
    </div>
    // <nav className="NavbarItems">
    //   <img className="hrf-logo" alt="hrf-logo" src={logo}></img>
    //   <div className="menu-icon" onClick={handleClick}>
    //     <i className={navState ? 'fas fa-times' : 'fas fa-bars'}></i>
    //   </div>
    //   <ul className={navState ? 'nav-menu active' : 'nav-menu'}>
    //     <NavLink onClick={handleClick} className="nav-link" exact to="/">
    //       Home
    //     </NavLink>
    //     <NavLink onClick={handleClick} className="nav-link" to="/incidents">
    //       Incidents
    //     </NavLink>
    //     <NavLink onClick={handleClick} className="nav-link" to="/graph">
    //       Graphs
    //     </NavLink>
    //     <NavLink onClick={handleClick} className="nav-link" to="/about">
    //       About
    //     </NavLink>
    //     {localStorage.getItem('okta-token-storage') ? (
    //       <NavLink
    //         onClick={handleClick}
    //         className="nav-link"
    //         to="/admin-dashboard"
    //       >
    //         Admin
    //       </NavLink>
    //     ) : (
    //       <div></div>
    //     )}
    //     <img className="lambda-logo" src={lambdaLogo} alt="lambda-logo" />
    //   </ul>
    // </nav>
  );
};
export default NavBar;
