import React, { useState, useContext, useRef, useCallback } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import { FlyToInterpolator } from 'react-map-gl';
import {
  ContextState,
  ContextView,
  ContextSearchText,
  ContextActiveFilters,
  ContextLong,
  ContextLat,
  ContextIncidents,
} from '../Store';
import { Input, Collapse, Divider, List } from 'antd';

import { SearchOutlined } from '@ant-design/icons';
import './MapSearch.css';

const { Search } = Input;
const { Panel } = Collapse;

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
function callback(key) {
  console.log(key);
}

const MapSearch = () => {
  const mapRef = useRef();
  
  const handleViewportChange = useCallback(
    newViewport => setViewport(newViewport),
    []
  );
  const [filterDataList, setFilterDataList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [long, setLong] = useContext(ContextLong);;
  const [lat, setLat] = useContext(ContextLat);
  const [viewport, setViewport] = useContext(ContextView);
  const [state, setState] = useContext(ContextState);
  const [activeFilters, setActiveFilters] = useContext(ContextActiveFilters);
  const [incidentsOfInterest, setIncidentsOfInterest] = useContext(ContextIncidents)
  const onSearch = value => console.log(value);

  console.log(incidentsOfInterest)
  // load incident data using custom react-query hook (see state >> query_hooks)
  const incidentsQuery = useIncidents();
 
  // save data to an incidents variable
  // --> make sure incident data is present & no errors fetching that data
  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];

  const newData = data => {
    const newCurrentData = incidents.map(obj =>
      Object.keys(obj)
        .filter(x => obj[x] !== null)
        .reduce((o, e) => {
          o[e] = obj[e];
          return o;
        }, {})
    );
    const noUnderfined = newCurrentData.map(obj =>
      Object.keys(obj)
        .filter(x => obj[x] !== undefined)
        .reduce((o, e) => {
          o[e] = obj[e];
          return o;
        }, {})
    );
    return noUnderfined;
  };

  const dataList = newData();
  console.log(dataList);
  //List everything to exclude with filtering
  const exclude = ['incident_id'];

  //filter function for filtering search data out of dataList
  const filterData = value => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === '') setFilterDataList([]);
    else {
      const filteredData = dataList.filter(item => {
        return Object.keys(item).some(key =>
          exclude.includes(key)
            ? false
            : item[key]
                .toString()
                .toLowerCase()
                .includes(lowercasedValue)
        );
      });
      setFilterDataList(filteredData);
    }
  };

  //Handle change for search box
  const handleChange = value => {
    setSearchText(value);
    filterData(value);
  };

  const FlyTo = () => {
    const flyViewport = {
      latitude: lat,
      longitude: long,
      zoom: 14,
      transitionDuration: 5000,
      transitionInterpolator: new FlyToInterpolator(),
    };
    setViewport(flyViewport);
  };

  const setCoord = (lat, long) => {
    setLat(lat);
    setLong(long);
  };

  const addFilter = filter => {
    let newState = [...activeFilters, filter];
    setActiveFilters(newState);
  };
  console.log(dataList);
  return (
    <div className="map-menu">
      <Input
        className="map-search"
        placeholder="Search"
        allowClear
        onChange={e => handleChange(e.target.value)}
        suffix={suffix}
        bordered={false}
      />
      <Divider style={{ margin: '0px' }} />
      <Collapse
        style={{ color: 'white' }}
        defaultActiveKey={['1']}
        onChange={callback}
        bordered={false}
        expandIconPosition="right"
        ghost
      >
        <Panel
          bordered={false}
          style={{ color: 'white', padding: '0px' }}
          header="More Info"
          key="1"
        >
          <Divider style={{ margin: '0px' }} />
          <div>
            <List>
              {filterDataList.map((data, index) => {
                return (
                  <div
                    className="incident-card"
                    key={index}
                    onMouseEnter={() => setCoord(data.lat, data.long)}
                    onClick={() => {
                      FlyTo();
                    }}
                  >
                    <h3>Ttile:{data.title}</h3>
                    <h3>State:{data.state}</h3>
                    <h3>City:{data.city}</h3>
                    <h3>Discription:{data.desc}</h3>
                    {/* <h3>City:{data.city}</h3>
                        <h3>City:{data.city}</h3>
                        <h3>City:{data.city}</h3> */}
                  </div>
                );
              })}
            </List>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default MapSearch;
