import React, { useState, useContext } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import { ContextIncidents, ContextDates, ContextSearchText } from '../Store';

import { Input, Collapse, Divider, List, DatePicker } from 'antd';

import LastIncident from './incidentContainer/LastIncident';
import { iconPicker, newData } from './GetFunctions';
import './MapSearch.css';

import FilteredIncident from './incidentContainer/FilteredIncident';
import ClusterIncident from './incidentContainer/ClusterIncident';

import { nanoid } from 'nanoid';
import SearchHeader from './incidentContainer/SearchHeader';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const MapSearch = () => {
  const [incidentsOfInterest, setIncidentsOfInterest] = useContext(
    ContextIncidents
  );
  const [search, setSearch] = useState('');
  const [dates, setDates] = useContext(ContextDates);
  const [searchText, setSearchText] = useContext(ContextSearchText);

  // load incident data using custom react-query hook (see state >> query_hooks)
  const incidentsQuery = useIncidents();

  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];
  // console.log(incidentsQuery)

  const dataList = newData(incidents);
  const lastIncident = dataList.shift();

  return (
    <div>
      <div className="map-menu">
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
            header="Incidents of Police Use of Force "
            key="1"
          >
            <div className="incident-content">
              <Divider style={{ margin: '0px' }} />
              <List>
                {!incidentsOfInterest && searchText === '' ? (
                  <LastIncident lastIncident={lastIncident} key={nanoid()} />
                ) : !incidentsOfInterest ? (
                  <FilteredIncident />
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

        <section></section>
      </div>
    </div>
  );
};

export default MapSearch;
