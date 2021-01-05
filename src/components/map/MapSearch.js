import React, { useState, useContext, useMemo } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import { ContextIncidents, ContextFilterData } from '../Store';
import { Input, Collapse, Divider, List } from 'antd';

import LastIncident from './incidentContainer/LastIncident';

import './MapSearch.css';

import FilteredIncident from './incidentContainer/FilteredIncident';
import ClusterIncident from './incidentContainer/ClusterIncident';
import { nanoid } from 'nanoid';

const { Panel } = Collapse;
const { Search } = Input;

function callback(key) {
  console.log(key);
}

const MapSearch = () => {
  const [filterDataList, setFilterDataList] = useContext(ContextFilterData);

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
          style={{ color: 'white', padding: '6px' }}
          header="More Info"
          key="1"
        >
          <div className="incident-content">
            <Divider style={{ margin: '0px' }} />
            <List>
              {!incidentsOfInterest && search === '' ? (
                <LastIncident lastIncident={lastIncident} key={nanoid()} />
              ) : !incidentsOfInterest ? (
                filterData.map((data, index) => {
                  return (
                    <FilteredIncident
                      data={data}
                      key={nanoid()}
                      filterData={filterData}
                    />
                  );
                })
              ) : (
                incidentsOfInterest.map((incidents, i) => {
                  return (
                    <ClusterIncident
                      incidents={incidents}
                      i={i}
                      key={nanoid()}
                    />
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
