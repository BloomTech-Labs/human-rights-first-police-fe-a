import React from 'react';
import { DateTime } from 'luxon';
import { Card } from 'antd';
// import '../NavBar/node_modules/antd/dist/antd.css';

const IncidentsCard = props => {
  let cityState = `${props.incident.city}, ${props.incident.state}`;

  return (
    <div className="card-box">
      {/* for states, I was thinking we could import the abbreviations from the bargraphAssets file */}

      <Card title={cityState}>
        <p style={{ color: '#bc541e', fontWeight: 'bold' }}>
          {DateTime.fromISO(props.incident.date)
            .plus({ days: 1 })
            .toLocaleString(DateTime.DATE_MED)}
        </p>

        {/* below should be in bottom half of card */}
        <h4>{props.incident.title}</h4>
        <p>{props.incident.desc}</p>
      </Card>
    </div>
  );
};

export default IncidentsCard;
