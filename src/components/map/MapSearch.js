import React, { useState } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import { FlyToInterpolator } from 'react-map-gl';
import { Input, Collapse, Divider } from 'antd';
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
  const [filterDataList, setFilterDataList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [viewport, setViewport] = useState();
  const [activeFilters, setActiveFilters] = useState ();
  const onSearch = value => console.log(value);
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
  return <div>

<div className='map-menu'>
      <Input  
      className='map-search' 
      placeholder="Search" 
      allowClear onSearch={onSearch} 
      suffix={suffix}
      bordered={false}  />
      <Divider style={{margin: '0px'}} />
      <Collapse
       style={{color: 'white'}}
        defaultActiveKey={['1']}
         onChange={callback}
          bordered={false}
          expandIconPosition='right'
          ghost
          >
          
    <Panel bordered={false} 
    style={{color: 'white', padding:'0px'}} 
     header="More Info"
      key="1"
      >
        <Divider style={{margin: '0px'}} />
        <p>text</p>
      
    </Panel>
    </Collapse>
    </div>
  </div>;
};

export default MapSearch;
