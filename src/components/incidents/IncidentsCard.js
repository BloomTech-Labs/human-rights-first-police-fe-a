import React from 'react';
import { DateTime } from 'luxon';

const IncidentsCard = props => {
  return (
    <div>
      <p>{props.incident.state}</p>
      <p>
        {DateTime.fromISO(props.incident.date).toLocaleString(
          DateTime.DATE_FULL
        )}
      </p>
      <p>{props.incident.city}</p>
      <p>{props.incident.title}</p>
      <p>{props.incident.desc}</p>
    </div>
  );
};

export default IncidentsCard;
