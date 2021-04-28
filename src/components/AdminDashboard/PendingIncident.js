import React, { useState } from 'react';

import CompleteIncident from './CompleteIncident';

import { getData } from '../../utils/DashboardHelperFunctions';

const PendingIncident = props => {
  // using local state to determine whether the "complete incident" information is toggled
  const [moreInfo, setMoreInfo] = useState(false);

  const {
    incident,
    selected,
    changeSelected,
    confirmApprove,
    setPageNumber,
    setUnapprovedIncidents,
  } = props;

  const toggleMoreInfo = () => {
    setMoreInfo(!moreInfo);
  };
  const toggleCheck = () => {
    changeSelected(incident);
  };

  const isSelected = selected.includes(incident.id);

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
        <div className="incident-info-text-wrap" onClick={toggleMoreInfo}>
          <p className="incident-info" id="incident-description">
            {incident.desc.split('http')[0]}
          </p>

          <p className="incident-info">
            {incident.city}, {incident.state}
          </p>

          <p className="incident-info">{formattedDate}</p>
          {/* placeholder below for accuracy estimate 
          <p className="incident-info">{incident.est_acc}</p>*/}

          <p className="incident-info more-info">{moreInfo ? '-' : '+'}</p>
        </div>
      </div>
      {moreInfo && (
        <CompleteIncident
          incident={incident}
          formattedDate={formattedDate}
          setMoreInfo={setMoreInfo}
          getData={getData}
          setPageNumber={setPageNumber}
          setUnapprovedIncidents={setUnapprovedIncidents}
        />
      )}
    </div>
  );
};

export default PendingIncident;
