import React from 'react';
import { DateTime } from 'luxon';
import { Card } from 'antd';
import 'antd/dist/antd.css';

const IncidentsCard = props => {
  let cityState = `${props.incident.city}, ${props.incident.state}`;

  return (
    <div className="cardBox">
      {/* for states, I was thinking we could import the abbreviations from the bargraphAssets file */}

      <Card title={cityState}>
        <p style={{ color: '#bc541e', fontWeight: 'bold' }}>
          {DateTime.fromISO(props.incident.date).toLocaleString(
            DateTime.DATE_FULL
          )}
        </p>

        {/* below should be in bottom half of card */}
        <h4>{props.incident.title}</h4>
        <p>{props.incident.desc}</p>
      </Card>
    </div>
  );
};

export default IncidentsCard;
