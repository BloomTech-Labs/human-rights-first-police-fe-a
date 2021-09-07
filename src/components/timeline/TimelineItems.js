import React, { useState } from 'react';
import { TimelineItem } from 'vertical-timeline-component-for-react';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { Card, Tag, Popover, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import sourceListHelper from '../../utils/sourceListHelper';
import './TimelineItems.css';
import TimelineDetailsExpander from './TimelineDetailsExpander';

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
      description={details.description}
      dateText={DateTime.fromISO(details.incident_date)
        .plus({ days: 1 })
        .toLocaleString(DateTime.DATE_FULL)}
      style={{ color: '#e63946' }}
      dateInnerStyle={{
        color: 'white',
        backgroundColor: '#003767',
      }}
    >
      <div className="timeline-box">
        <Card>
          <div className="city-state-rank-container">
            <h4 className="cityState">
              {details.city}, {details.state}
            </h4>
            <h4 className="timeline-rank">
              {details.force_rank}
            </h4>
          </div>
          <p className="card-desc">{details.description}</p>
          <TimelineDetailsExpander>
            <h5 className="card-force-rank">{details.force_rank}</h5>
            <div className="card-tags-container">
              {details.tags.map(element => (
                <Tag key={nanoid()}>
                  {element.charAt(0).toUpperCase() + element.slice(1)}
                </Tag>
              ))}
            </div>
            <p>{details.description}</p>
            <Popover content={sourceListHelper(details)} placement="rightTop">
              <Button
                type="primary"
                style={{ backgroundColor: '#003767', border: 'none' }}
              >
                Sources
              </Button>
            </Popover>
            <br /> <br />
          </TimelineDetailsExpander>
        </Card>
      </div>
    </TimelineItem>
  );
}
