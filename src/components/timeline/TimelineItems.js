import React, { useState } from 'react';
import { TimelineItem } from 'vertical-timeline-component-for-react';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { Card, Tag, Popover, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import sourceListHelper from '../../utils/sourceListHelper';
import './TimelineItems.css';
import TimelineDetailsExpander from './TimelineDetailsExpander';
import { getDescriptiveRank } from '../../utils/forceRankHelper';

export default function TimelineItems(props) {
  const { description, incident_date, city, state, force_rank, tags, src } = props.details;
  const displayDate = DateTime.fromISO(incident_date).plus({ days: 1 }).toLocaleString(DateTime.DATE_FULL);

  return (
    <TimelineItem
      key={nanoid()}
      description={description}
      dateText={displayDate}
      style={{ color: '#e63946' }}
      dateInnerStyle={{
        color: 'white',
        backgroundColor: '#003767',
      }}
    >
      <div className="timeline-box">
        <Card>
          <h4 className="cityState">
            {city}, {state}
          </h4>
          <p className="card-desc">{description}</p>
          <TimelineDetailsExpander>
            <p className="card-desc">{getDescriptiveRank(force_rank)}</p>
            <div className="card-tags-container">
              {tags.map(element => (
                <Tag key={nanoid()}>
                  {element.charAt(0).toUpperCase() + element.slice(1)}
                </Tag>
              ))}
            </div>
            <Popover content={sourceListHelper(src)} placement="rightTop">
              <Button
                type="primary"
                style={{ backgroundColor: '#003767', border: 'none' }}
              >
                Sources
              </Button>
            </Popover>
          </TimelineDetailsExpander>

        </Card>
      </div>
    </TimelineItem>
  );
}
