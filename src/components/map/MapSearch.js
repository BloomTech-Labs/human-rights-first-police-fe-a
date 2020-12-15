import React, { useState, useContext, useRef, useCallback } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import { FlyToInterpolator } from 'react-map-gl';
import {
  ContextState,
  ContextView,
  ContextActiveFilters,
  ContextLong,
  ContextLat,
  ContextIncidents,
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
  const [long, setLong] = useContext(ContextLong);
  const [lat, setLat] = useContext(ContextLat);
  const [viewport, setViewport] = useContext(ContextView);
  const [state, setState] = useContext(ContextState);
  const [activeFilters, setActiveFilters] = useContext(ContextActiveFilters);
  const [incidentsOfInterest, setIncidentsOfInterest] = useContext(
    ContextIncidents
  );
  const onSearch = value => console.log(value);

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

  const iconPicker = incident => {
    // return console.log(incident)
    if (incident?.empty_hand_hard) {
      return punch;
    }

    if (incident?.uncategorized) {
      return questionMark;
    }

    if (incident?.less_lethal_methods) {
      return warning;
    }

    if (incident?.lethal_force) {
      return danger;
    }

    if (incident?.empty_hand_soft) {
      return wrestling;
    }

    if (incident?.verbalization) {
      return siren;
    }
  };
  const toolTipPicker = incident => {
    // return console.log(incident)
    if (incident?.empty_hand_hard) {
      return 'Officers use bodily force to gain control of a situation';
    } else if (incident?.empty_hard_soft) {
      return 'Officers use bodily force to gain control of a situation';
    } else if (incident?.less_lethal_methods) {
      return 'Officers use less-lethal technologies to gain control of a situation';
    } else if (incident?.lethal_force) {
      return 'Officers use lethal weapons to gain control of a situation';
    } else if (incident?.uncategorized) {
      return 'uncategorized incident type';
    } else if (incident?.verbalization) {
      return 'Force is not-physical';
    }
  };
  console.log(lastIncident);
  return (
    <div className="map-menu">
      <Input
        className="map-search"
        placeholder="Search"
        allowClear
        onChange={e => {
          handleChange(e.target.value);
          setIncidentsOfInterest(undefined);
        }}
        suffix={suffix}
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
        <Divider style={{ margin: '0px' }} />
        <Panel
          bordered={false}
          style={{ color: 'white', padding: '0px' }}
          header="More Info"
          key="1"
        >
          <div className="incident-content">
            <Divider style={{ margin: '0px' }} />
            <List>
              {!incidentsOfInterest && searchText === '' ? (
                // <LastIncident  lastIncident={lastIncident} />

                <div
                  className="incident-card"
                  onMouseEnter={() =>
                    setCoord(lastIncident?.lat, lastIncident?.long)
                  }
                  onClick={() => {
                    FlyTo();
                  }}
                >
                  <Tooltip title={toolTipPicker(lastIncident)}>
                    <img
                      className="icon-img"
                      src={
                        iconPicker(lastIncident)
                        // ? iconPicker(lastIncident)
                        // : questionMark
                      }
                      alt="?"
                    />
                  </Tooltip>

                  <h4 className="incident-location">
                    {' '}
                    {lastIncident?.city}, {lastIncident?.state}
                  </h4>
                  <h2 className="incident-header">{lastIncident?.title}</h2>
                  <h4
                    className="incident-date"
                    style={{ color: 'white', fontWeight: 'lighter' }}
                  >
                    {}
                  </h4>
                  <h3 className="incident-discription">{lastIncident?.desc}</h3>
                  <h2 className="incident-category">Category:</h2>
                  {lastIncident?.categories.map((category, i) => {
                    return (
                      <div
                        className="incident-container"
                        style={{ display: 'flex', flexDirection: 'row' }}
                      >
                        <Row>
                          <Col
                            span={6}
                            className="incident-categories"
                            style={{ color: 'white', fontWeight: 'lighter' }}
                          >
                            -{' '}
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
              ) : !incidentsOfInterest ? (
                filterDataList.map((data, index) => {
                  return (
                    // <FilteredIncident data={data} index={index} />

                    <div
                      className="incident-card"
                      key={index}
                      onMouseEnter={() => setCoord(data.lat, data.long)}
                      onClick={() => {
                        FlyTo();
                      }}
                    >
                      <img
                        className="icon-img"
                        src={
                          iconPicker(data)
                          //  ? iconPicker(data) : questionMark
                        }
                        alt="?"
                      />
                      <h4 className="incident-location">
                        {' '}
                        {data.city}, {data.state}
                      </h4>
                      <h2 className="incident-header">{data.title}</h2>
                      <h3 className="incident-discription">{data.desc}</h3>
                      <h2 className="incident-category">Category:</h2>
                      {data.categories.map((category, i) => {
                        return (
                          <h3
                            className="incident-categories"
                            style={{ color: 'white', fontWeight: 'lighter' }}
                          >
                            -{' '}
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </h3>
                        );
                      })}
                      <Divider style={{ margin: '0px' }} />
                    </div>
                  );
                })
              ) : (
                incidentsOfInterest.map((incidents, i) => {
                  return (
                    // <ClusterIncident incidents={incidents} i={i} />

                    <div
                      className="incident-card"
                      key={i}
                      onMouseEnter={() =>
                        setCoord(
                          incidents.properties.incident.lat,
                          incidents.properties.incident.long
                        )
                      }
                      onClick={() => {
                        FlyTo();
                      }}
                    >
                      <img
                        className="icon-img"
                        src={
                          iconPicker(incidents.properties.incident)
                          // ? iconPicker(incidents.properties.incident)
                          // : questionMark
                        }
                        alt="?"
                      />
                      <h4 className="incident-location">
                        {incidents.properties.incident.city},{' '}
                        {incidents.properties.incident.state}{' '}
                      </h4>
                      <h2 className="incident-header">
                        {incidents.properties.incident.title}
                      </h2>

                      <h3 className="incident-discription">
                        {incidents.properties.incident.desc}
                      </h3>
                      <h2 className="incident-category">Category:</h2>
                      {incidents.properties.incident?.categories.map(
                        (category, i) => {
                          return (
                            <h3
                              className="incident-categories"
                              style={{ color: 'white', fontWeight: 'lighter' }}
                            >
                              -{' '}
                              {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                            </h3>
                          );
                        }
                      )}
                      <Divider style={{ margin: '0px' }} />
                    </div>
                  );
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
