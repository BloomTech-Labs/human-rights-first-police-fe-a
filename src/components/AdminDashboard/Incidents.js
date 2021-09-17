import React from 'react';

import AntTable from './AntTableComponents/AntTable';

const DashboardIncidents = props => {
  const {
    selected,
    setSelected,
    setUnapprovedIncidents,
    incidents,
  } = props;

  return (
    <>
      <div className="incidents">
        <AntTable
          setUnapprovedIncidents={setUnapprovedIncidents}
          selectedIds={selected}
          setSelected={setSelected}
          incidents={incidents}
        />
      </div>
    </>
  );
};

export default DashboardIncidents;
