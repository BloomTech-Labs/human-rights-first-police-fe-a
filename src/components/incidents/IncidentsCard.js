import React from 'react';
import { DateTime } from 'luxon';
import { Card, Popover, Button } from 'antd';
// import '../NavBar/node_modules/antd/dist/antd.css';

const IncidentsCard = props => {
  let cityState = `${props.incident.city}, ${props.incident.state}`;

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
            <div>
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

  console.log(props.incident);

  return (
    <div className="card-box">
      {/* for states, I was thinking we could import the abbreviations from the bargraphAssets file */}

      <Card
        title={
          <p>
            {DateTime.fromISO(props.incident.date)
              .plus({ days: 1 })
              .toLocaleString(DateTime.DATE_MED)}
          </p>
        }
        extra={cityState}
      >
        <h4>{props.incident.title}</h4>
        <p>{props.incident.categories.join(' | ')}</p>
        <p>{props.incident.desc}</p>
        <Popover content={popoverContent} placement="rightTop">
          <Button type="primary">Sources</Button>
        </Popover>
      </Card>
    </div>
  );
};

export default IncidentsCard;
