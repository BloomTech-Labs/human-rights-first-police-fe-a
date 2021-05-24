import React, { useState } from 'react';
import { TimelineItem } from 'vertical-timeline-component-for-react';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { Card, Tag, Popover, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import sourceListHelper from '../../utils/sourceListHelper';

export default function TimelineItems({ details }) {
  // the urlDomain function pulls the website name from the string we are getting back from the API, this one cuts off the .com part as well (not currently in use)
  const urlDomain = url => {
    let re = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/gim;
    let newUrl = url.split(re)[1].replace('.com', '');
    return newUrl;
  };

  const [isInfoVisible, setIsInfoVisible] = useState(false);

  return (
    <TimelineItem
      key={nanoid()}
      description={details.desc}
      dateText={DateTime.fromISO(details.date)
        .plus({ days: 1 })
        .toLocaleString(DateTime.DATE_FULL)}
      style={{ color: '#e63946' }}
      dateInnerStyle={{
        color: 'white',
        backgroundColor: '#2f54eb',
      }}
    >
      <div className="timeline-box">
        <Card>
          <h4 className="cityState">
            {details.city}, {details.state}
          </h4>
          <h3>{details.title}</h3>
          {isInfoVisible ? (
            <div>
              <h5>{details.force_rank}</h5>
              <div>
                {details.categories.map(element => (
                  <Tag key={nanoid()}>
                    {element.charAt(0).toUpperCase() + element.slice(1)}
                  </Tag>
                ))}
              </div>
              <p>{details.desc}</p>
              <Popover content={sourceListHelper(details)} placement="rightTop">
                <Button
                  type="primary"
                  style={{ backgroundColor: '#2f54eb', border: 'none' }}
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
