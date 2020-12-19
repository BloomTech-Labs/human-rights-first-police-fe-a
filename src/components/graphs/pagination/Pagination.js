import React, { useState } from 'react';
import './Pagination.css';

// Search Bar
import SearchBar from '../searchbar/SearchBar';

// Menu
import { Menu } from 'antd';
import {
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const Pagination = ({ setGraph, setUsState }) => {
  const [names] = useState(['Line', 'Bar', 'Pie']);

  const onClick = e => {
    setGraph(e.key);
  };

  return (
    <Menu
      className="link-container"
      onClick={onClick}
      selectedKeys={names}
      mode="horizontal"
    >
      <Menu.Item key="Line" icon={<LineChartOutlined />}>
        Line Graph
      </Menu.Item>
      <Menu.Item key="Bar" icon={<BarChartOutlined />}>
        Bar Graph
      </Menu.Item>
      <Menu.Item key="Pie" icon={<PieChartOutlined />}>
        Pie Graph
      </Menu.Item>

      <SearchBar setUsState={setUsState} className="search-bar" />
    </Menu>
  );
};

export default Pagination;
