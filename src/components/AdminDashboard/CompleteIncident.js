import React from 'react';

import './CompleteIncident.scss';

const CompleteIncident = props => {
  const { incident, formattedDate } = props;

  return (
    <div className="complete-incident">
      <p>{formattedDate}</p>
      <p>
        {incident.city}, {incident.state}
      </p>
      <p>{incident.title}</p>
      <p>{incident.categories.join(' ')}</p>
      <p>{incident.description}</p>
      Sources
      <p>{incident.src.join(' ')}</p>
    </div>
  );
};

export default CompleteIncident;
