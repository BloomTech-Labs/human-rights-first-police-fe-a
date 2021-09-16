import React from 'react';

import PendingIncident from './PendingIncident';
import AdminTable from './AdminTable';
import AntTable from './AntTableComponents/AntTable';
import Incidents from '../incidents/Incidents';

const DashboardIncidents = props => {
  const {
    selected,
    setSelected,
    setUnapprovedIncidents,
    incidents,
    // unapprovedIncidents,
    // formResponses,
    // setCurrList,
  } = props;

  return (
    <>
      <div className="incidents">
        <AntTable
          // unapprovedIncidents={unapprovedIncidents}
          setUnapprovedIncidents={setUnapprovedIncidents}
          // formResponses={formResponses}
          selected={selected}
          setSelected={setSelected}
          // setCurrList={setCurrList}
          incidents={incidents}
        />
      </div>
    </>
  );
};

export default DashboardIncidents;
