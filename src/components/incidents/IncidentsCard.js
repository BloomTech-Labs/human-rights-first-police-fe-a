import React from 'react';
import { DateTime } from 'luxon';
import { Card, Popover, Button, Tag } from 'antd';
import { nanoid } from 'nanoid';
// import '../NavBar/node_modules/antd/dist/antd.css';

const IncidentsCard = props => {
  let cityState = `${props.incident.city}, ${props.incident.state}`;

  // This still has a bug if the url has a . anywhere besides www. and .com
  function getDomain(url) {
    url = url.replace(/(https?:\/\/)?(www.)?/i, '');
    url = url.split('.');
    url = url.slice(url.length - 2).join('.');
    if (url.indexOf('/') !== -1) {
      return url.split('/')[0];
    }
    return url;
  }

  const popoverContent = (
    <div>
      {!props.incident.src || props.incident.src === [] ? (
        <p>No sources listed</p>
      ) : (
        props.incident.src.map(source => {
          return (
            <div key={nanoid()}>
              <a href={source} target="_blank" rel="noopener noreferrer">
                {getDomain(source)}
              </a>
              <br />
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <div className="card-box">
      {/* for states, I was thinking we could import the abbreviations from the bargraphAssets file */}

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
        {props.incident.categories.map(cat => {
          return <Tag key={nanoid()}>{cat}</Tag>;
        })}
        <p>{props.incident.desc}</p>
        <Popover content={popoverContent} placement="rightTop">
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
