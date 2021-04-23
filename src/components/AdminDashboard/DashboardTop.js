import React from 'react';

const DashboardTop = props => {
  const { unapprovedIncidents, toggleAddIncident, unapproved } = props;
  return (
    <div>
      <h2 id="admin-dashboard-title">
        {unapproved ? 'Unapproved Incidents' : 'Approved Incidents'}
      </h2>
      {/* <div className="statboxes">
        <div className="statbox">
          <p>
            There are currently {unapprovedIncidents.length} unapproved
            incidents are awaiting your review. 'Select All' to approve all
            incidents with the click of a button or alternatively, select 'More
            Info' to inspect, edit, approve or disapprove incidents 1 by 1.
          </p>
          <p>
            You can manually create an incident by using the 'Create New
            Incident' button
          </p>
        </div>
      </div> */}
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
