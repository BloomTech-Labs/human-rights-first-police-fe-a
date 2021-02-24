import React, { useState } from 'react';
import { TimelineItem } from 'vertical-timeline-component-for-react';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { Card, Tag, Popover, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

export default function TimelineItems({ details }) {
  // the urlDomain function pulls the website name from the string we are getting back from the API, this one cuts off the .com part as well
  const urlDomain = url => {
    let re = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/gim;
    let newUrl = url.split(re)[1].replace('.com', '');
    return newUrl;
  };

  // Popover helpers
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
      {!details.src || details.src === [] ? (
        <p>No sources listed</p>
      ) : (
        details.src.map(source => {
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

  const [isInfoVisible, setIsInfoVisible] = useState(false);

  return (
    <TimelineItem
      key={nanoid()}
      description={details.desc}
      dateText={DateTime.fromISO(details.date).toLocaleString(
        DateTime.DATE_FULL
      )}
      style={{ color: '#BC541E' }}
      dateInnerStyle={{ color: 'white', backgroundColor: '#003767' }}
    >
      <div className="timeline-box">
        <Card>
          <h4 className="cityState">
            {details.city}, {details.state}
          </h4>
          <h3>{details.title}</h3>
          {isInfoVisible ? (
            <div>
              <div>
                {details.categories.map(element => (
                  <Tag key={nanoid()}>
                    {element.charAt(0).toUpperCase() + element.slice(1)}
                  </Tag>
                ))}
              </div>
              <p>{details.desc}</p>
              <Popover content={popoverContent} placement="rightTop">
                <Button
                  type="primary"
                  style={{ backgroundColor: '#003767', border: 'none' }}
                >
                  Sources
                </Button>
              </Popover>
              <br /> <br />
              <UpOutlined
                className="timeline-button"
                onClick={() => setIsInfoVisible(false)}
              />
            </div>
          ) : (
            <DownOutlined
              className="timeline-button"
              onClick={() => setIsInfoVisible(true)}
            />
          )}
        </Card>
      </div>
    </TimelineItem>
  );
}
