import React from 'react';

import './PendingIncident.scss';

const PendingIncident = props => {
  const { incident } = props;

  return (
    <div className="pending-incident-untoggled">
      <div className="incident-info">
        <input type="checkbox" />
      </div>

      <div className="incident-info">
        <p>{incident.title}</p>
      </div>

      <div className="incident-info">
        <p>
          {incident.city}, {incident.state}
        </p>
      </div>

      <div className="incident-info">
        <p>{incident.date}</p>
      </div>
    </div>
  );
};

export default PendingIncident;
