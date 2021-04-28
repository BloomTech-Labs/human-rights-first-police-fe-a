import React from 'react';

const DashboardTop = props => {
  const { unapprovedIncidents, toggleAddIncident, unapproved } = props;
  return (
    <div>
      {unapproved ? (
        <h2 id="admin-dashboard-title">
          {' '}
          Unapproved Incidents: {unapprovedIncidents.length}
        </h2>
      ) : (
        <h2 id="admin-dashboard-title"> 'Approved Incidents'</h2>
      )}

      <div className="confirmation-message-div">
        <div className="incidents-wrap">
          <button id="create-incident-button" onClick={toggleAddIncident}>
            Create New Incident
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardTop;
