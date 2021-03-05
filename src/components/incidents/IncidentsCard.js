import React from 'react';
import { DateTime } from 'luxon';
import { Card, Popover, Button, Tag } from 'antd';
import { nanoid } from 'nanoid';
import sourceListHelper from '../../utils/sourceListHelper';

const IncidentsCard = props => {
  let cityState = `${props.incident.city}, ${props.incident.state}`;

  return (
    <div className="card-box">
      <Card bordered={false}>
        <div className="card-title">
          <h4>
            {DateTime.fromISO(props.incident.date)
              .plus({ days: 1 })
              .toLocaleString(DateTime.DATE_MED)}
          </h4>
          <h4>{cityState}</h4>
        </div>
        <h3>{props.incident.title}</h3>
        <h5 className="card-force">{props.incident.force_rank}</h5>
        {props.incident.categories.map(cat => {
          return <Tag key={nanoid()}>{cat}</Tag>;
        })}
        <p>{props.incident.desc}</p>
        <Popover
          content={sourceListHelper(props.incident)}
          placement="rightTop"
        >
          <Button
            type="primary"
            style={{ backgroundColor: '#003767', border: 'none' }}
          >
            Sources
          </Button>
        </Popover>
      </Card>
    </div>
  );
};

export default IncidentsCard;
