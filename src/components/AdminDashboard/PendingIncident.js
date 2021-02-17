import React, { useState } from 'react';

import './PendingIncident.scss';

import CompleteIncident from './CompleteIncident';

const PendingIncident = props => {
  // using local state to determine whether the "complete incident" information is toggled
  const [moreInfo, setMoreInfo] = useState(false);

  const {
    incident,
    selected,
    changeSelected,
    unapprovedIncidents,
    setUnapprovedIncidents,
  } = props;

  const toggleMoreInfo = () => {
    setMoreInfo(!moreInfo);
  };

  const toggleCheck = () => {
    changeSelected(incident);
  };

  const isSelected = selected.includes(incident.incident_id);

  const formattedDate = `${incident.date.split('-')[1]}/${incident.date
    .split('-')[2]
    .slice(0, 2)}/${incident.date.split('-')[0]}`;

  return (
    <div>
      <div
        className={moreInfo ? 'pending-incident toggled' : 'pending-incident'}
      >
        <input
          className="incident-info"
          type="checkbox"
          checked={isSelected}
          onChange={toggleCheck}
        />

        <p className="incident-info">{incident.title}</p>

        <p className="incident-info">
          {incident.city}, {incident.state}
        </p>

        <p className="incident-info">{formattedDate}</p>

        <p className="incident-info more-info" onClick={toggleMoreInfo}>
          {moreInfo ? 'Less Info' : 'More Info'}
        </p>
      </div>
      {moreInfo && (
        <CompleteIncident
          unapprovedIncidents={unapprovedIncidents}
          setUnapprovedIncidents={setUnapprovedIncidents}
          incident={incident}
          formattedDate={formattedDate}
        />
      )}
    </div>
  );
};

export default PendingIncident;
