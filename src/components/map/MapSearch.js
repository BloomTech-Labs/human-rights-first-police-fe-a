import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import { FlyToInterpolator } from 'react-map-gl';
import {
  ContextState,
  ContextView,
  ContextActiveFilters,
  ContextLong,
  ContextLat,
  ContextIncidents,
  ContextFilterData,
} from '../Store';
import { Input, Collapse, Divider, List, Tooltip, Row, Col } from 'antd';
import { DateTime } from 'luxon';
import LastIncident from './incidentContainer/LastIncident';

import { SearchOutlined } from '@ant-design/icons';
import './MapSearch.css';
import wrestling from './iconImg/wrestling.png';
import warning from './iconImg/warning.png';
import siren from './iconImg/siren.png';
import punch from './iconImg/question-mark.png';
import danger from './iconImg/punch.png';
import bullHorn from './iconImg/bull-horn.png';
import questionMark from './iconImg/question-mark.png';
import FilteredIncident from './incidentContainer/FilteredIncident';
import ClusterIncident from './incidentContainer/ClusterIncident';

const { Panel } = Collapse;
const { Search } = Input;
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
  const [filterDataList, setFilterDataList] = useContext(ContextFilterData);
  const [searchText, setSearchText] = useState('');
  const [long, setLong] = useContext(ContextLong);
  const [lat, setLat] = useContext(ContextLat);
  const [viewport, setViewport] = useContext(ContextView);
  const [state, setState] = useContext(ContextState);
  const [activeFilters, setActiveFilters] = useContext(ContextActiveFilters);
  const [incidentsOfInterest, setIncidentsOfInterest] = useContext(
    ContextIncidents
  );
  const [search, setSearch] = useState('');
  // load incident data using custom react-query hook (see state >> query_hooks)
  const incidentsQuery = useIncidents();

  // save data to an incidents variable
  // --> make sure incident data is present & no errors fetching that data
  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];

  //Function removes null and undefinded data
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
  const lastIncident = dataList.shift();
  const findthem = dataList.filter(x => x.empty_hand_soft === true);

  //List everything to exclude with filtering
  const exclude = ['incident_id'];

  const filterData = useMemo(() => {
    if (!search) return dataList;
    const lowercasedValue = search.toLowerCase().trim();
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
      return filteredData;
    }
  }, [dataList, search]);

  console.log(filterData);

  const handleChange = value => {
    setSearchText(value);
    setSearch(value);
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

  const onSearch = value => {
    setSearch(value);
    setIncidentsOfInterest(undefined);
  };

  return (
    <div className="map-menu">
      <Search
        style={{ color: 'white' }}
        placeholder="Location, Type, etc..."
        enterButton="Search"
        onSearch={onSearch}
      />

      <Collapse
        style={{ color: 'white' }}
        defaultActiveKey={['1']}
        onChange={callback}
        bordered={false}
        expandIconPosition="right"
        ghost
        accordion={true}
      >
        <Panel
          bordered={false}
          style={{ color: 'white', padding: '0px' }}
          header="More Info"
          key="1"
        >
          <div className="incident-content">
            <Divider style={{ margin: '0px' }} />
            <List>
              {!incidentsOfInterest && search === '' ? (
                <LastIncident lastIncident={lastIncident} />
              ) : !incidentsOfInterest ? (
                filterData.map((data, index) => {
                  return <FilteredIncident data={data} index={index} />;
                })
              ) : (
                incidentsOfInterest.map((incidents, i) => {
                  return <ClusterIncident incidents={incidents} i={i} />;
                })
              )}
            </List>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default MapSearch;
