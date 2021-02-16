import React from 'react';

const CompleteIncident = props => {
  const { incident } = props;
  return (
    <div>
      <p>{incident.date}</p>
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
