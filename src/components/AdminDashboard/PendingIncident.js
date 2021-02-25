import React, { useState } from 'react';

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
    confirmApprove,
  } = props;

  const toggleMoreInfo = () => {
    setMoreInfo(!moreInfo);
  };

  const toggleCheck = () => {
    changeSelected(incident);
  };

  const isSelected = selected.includes(incident.server_id);

  //   changing the date into a more readable format
  const [year, month, day] = incident.date.split('-');
  const formattedDate = `${month}/${day.slice(0, 2)}/${year}`;

  return (
    <div>
      <div
        className={moreInfo ? 'pending-incident toggled' : 'pending-incident'}
      >
        <input
          className="incident-info"
          type="checkbox"
          checked={isSelected}
          onChange={confirmApprove ? () => {} : toggleCheck}
        />
        <div className="incident-info-text-wrap">
          <p className="incident-info" id="incident-title">
            {incident.title}
          </p>

          <p className="incident-info">
            {incident.city}, {incident.state}
          </p>

          <p className="incident-info">{formattedDate}</p>

          <p className="incident-info more-info" onClick={toggleMoreInfo}>
            {moreInfo ? 'Less Info' : 'More Info'}
          </p>
        </div>
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
