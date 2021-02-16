import React, { useState } from 'react';

import './PendingIncident.scss';

import CompleteIncident from './CompleteIncident';

const PendingIncident = props => {
  const [moreInfo, setMoreInfo] = useState(false);

  const { incident, selected, changeSelected } = props;

  const toggleMoreInfo = () => {
    setMoreInfo(!moreInfo);
  };

  const toggleCheck = () => {
    changeSelected(incident);
  };

  const isSelected = selected.includes(incident.incident_id);

  console.log(selected);

  return (
    <div>
      <div className="pending-incident-untoggled">
        <div className="incident-info">
          <input type="checkbox" checked={isSelected} onChange={toggleCheck} />
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

        <div className="incident-info more-info" onClick={toggleMoreInfo}>
          More Info
        </div>
      </div>
      {moreInfo && <CompleteIncident incident={incident} />}
    </div>
  );
};

export default PendingIncident;
