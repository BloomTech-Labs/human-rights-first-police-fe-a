import React from 'react';

// Search Bar
import SearchBar from '../searchbar/SearchBar';

import "./Pagination.css";

import {
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  FilterFilled,
} from '@ant-design/icons';
import { nanoid } from 'nanoid';

const names = [
  'Incidents Per Month',
  'Incidents Per State',
  'Incident Categories',
];

const generateButtons = onClick => {
  const buttons = names.map(name => {
    let icon;
    if (name === 'Incidents Per Month') {
      icon = <LineChartOutlined className="line icon" />;
    } else if (name === 'Incidents Per State') {
      icon = <BarChartOutlined className="bar icon" />;
    } else {
      icon = <PieChartOutlined className="pie icon" />;
    }

    return (
      <div className="container">
        <li
          className="link-item"
          data-key={`${name}`}
          onClick={e => onClick(e)}
          key={nanoid()}
        >
          {icon}
          <span className="text">{name}</span>
        </li>
      </div>
    );
  });

  return buttons;
};

const Pagination = ({ setGraph, setUsState, filtered }) => {
  const onClick = e => {
    e.persist();
    setGraph(e.currentTarget.dataset.key);
    if (e.currentTarget.dataset.key === 'Incidents Per Month') {
      document.getElementById('lineGraph').scrollIntoView();
    }
    if (e.currentTarget.dataset.key === 'Incidents Per State') {
      document.getElementById('barGraph').scrollIntoView();
    }
    if (e.currentTarget.dataset.key === 'Incident Categories') {
      document.getElementById('pieGraph').scrollIntoView();
    }
  };

  return (
    <nav style={{ marginTop: '1rem' }} className="link-container">
      <ul className="graph-buttons">
        {filtered.length > 0 ? generateButtons(onClick) : null}
      </ul>
      <div className="search-bar-container">
        <SearchBar setUsState={setUsState} className="search-bar" />
      </div>
    </nav>
  );
};

export default Pagination;
