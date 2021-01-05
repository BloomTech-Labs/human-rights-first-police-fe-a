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
      <Menu.ItemGroup className="links">
        <Menu.Item
          key="Line"
          icon={<LineChartOutlined />}
          className="graph-menu-item"
        >
          Line Graph
        </Menu.Item>
        <Menu.Item
          key="Bar"
          icon={<BarChartOutlined />}
          className="graph-menu-item"
        >
          Bar Graph
        </Menu.Item>
        <Menu.Item
          key="Pie"
          icon={<PieChartOutlined />}
          className="graph-menu-item"
        >
          Pie Graph
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup>
        <SearchBar setUsState={setUsState} className="search-bar" />
      </Menu.ItemGroup>
    </Menu>
  );
};

export default Pagination;
