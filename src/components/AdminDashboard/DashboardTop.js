import React from 'react';
import { useSelector } from 'react-redux';

const DashboardTop = props => {
  const {
    toggleAddIncident,
    listType,
  } = props;

  const pendingCount = useSelector(state => state.allIncidents.pendingIncidents.length);

  return (
    <div>
      {listType === 'pending' && (
        <h2 id="admin-dashboard-title">
          {' '}
          Pending Incidents: {pendingCount}
        </h2>
      )}
      {listType === 'approved' && (
        <h2 id="admin-dashboard-title"> Approved Incidents</h2>
      )}
      {listType === 'form-responses' && (
        <h2 id="admin-dashboard-title">Form Responses</h2>
      )}

      <div className="confirmation-message-div">
        <div className="incidents-wrap">
          {listType !== 'form-responses' && (
            <button id="create-incident-button" onClick={toggleAddIncident}>
              Create New Incident
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardTop;
