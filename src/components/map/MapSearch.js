import React from 'react';
import { useSelector } from 'react-redux';
import { useIncidents } from '../../hooks/legacy/useIncidents';
import { Input, Collapse, Divider, List, DatePicker } from 'antd';
import LastIncident from './incidentContainer/LastIncident';
import { newData } from './GetFunctions';
import FilteredIncident from './incidentContainer/FilteredIncident';
import ClusterIncident from './incidentContainer/ClusterIncident';
import { nanoid } from 'nanoid';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const MapSearch = () => {
  const incidentsOfInterest = useSelector(
    state => state.map.incidentsOfInterest
  );
  const searchText = useSelector(state => state.map.search);

  // load incident data using custom react-query hook (see state >> query_hooks)
  const incidentsQuery = useIncidents();

  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];

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
            key="1"
          >
            <div className="incident-content">
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
