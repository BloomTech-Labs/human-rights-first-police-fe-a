import React from 'react';
import './Pagination.css';

// Search Bar
import SearchBar from '../searchbar/SearchBar';

import {
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { nanoid } from 'nanoid';

const names = ['Line', 'Bar', 'Pie'];

const generateButtons = onClick => {
  const buttons = names.map(name => {
    let icon;
    if (name === 'Line') {
      icon = <LineChartOutlined className="line icon" />;
    } else if (name === 'Bar') {
      icon = <BarChartOutlined className="bar icon" />;
    } else {
      icon = <PieChartOutlined className="pie icon" />;
    }

    return (
      <li
        className="link-item"
        data-key={`${name}`}
        onClick={e => onClick(e)}
        key={nanoid()}
      >
        {icon}
        <span className="text">{name}</span>
      </li>
    );
  });

  return buttons;
};

const Pagination = ({ setGraph, setUsState }) => {
  const onClick = e => {
    e.persist();
    setGraph(e.currentTarget.dataset.key);
  };

  return (
    <nav className="link-container">
      <ul className="graph-buttons">{generateButtons(onClick)}</ul>
      <div className="search-bar-container">
        <SearchBar setUsState={setUsState} className="search-bar" />
      </div>
    </nav>
  );
};

export default Pagination;
