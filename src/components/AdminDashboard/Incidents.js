import React from 'react';

import PendingIncident from './PendingIncident';
import AdminTable from './AdminTable';
import AntTable from './AntTableComponents/AntTable';
import Incidents from '../incidents/Incidents';

const DashboardIncidents = props => {
  const {
    confirmApprove,
    confirmReject,
    confirmApproveHandler,
    confirmRejectHandler,
    approveAndRejectHandler,
    confirmCancel,
    selected,
    selectAll,
    allSelected,
    handlePerPageChange,
    currentSet,
    setUnapprovedIncidents,
    setPageNumber,
    unapprovedIncidents,
    setSelected,
    formResponses,
    setCurrList,
  } = props;

  return (
    <>
      <div className="incidents">
        <AntTable
          unapprovedIncidents={unapprovedIncidents}
          setUnapprovedIncidents={setUnapprovedIncidents}
          formResponses={formResponses}
          selected={selected}
          setSelected={setSelected}
          setCurrList={setCurrList}
        />
      </div>
    </>
  );
};

export default DashboardIncidents;
