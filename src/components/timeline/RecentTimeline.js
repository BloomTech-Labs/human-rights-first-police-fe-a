import React from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { useTimeline } from '../../state/query_hooks/useTimeline';
import './RecentTimeline.css';

export function RecentTimeline() {
  const timelineQuery = useTimeline();

  const urlDomain = url => {
    let re = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/gim;
    let newUrl = url.split(re)[1].replace('.com', '');
    return newUrl;
  };

  return timelineQuery.isSuccess ? (
    <div className="timeline-container">
      <h1> Timeline of Recent Events </h1>
      <Timeline lineColor={'#</Timeline>ddd'}>
        {timelineQuery.data.map(details => {
          return (
            <TimelineItem
              key={nanoid()}
              dateText={DateTime.fromISO(details.date).toLocaleString(
                DateTime.DATE_FULL
              )}
              style={{ color: '#BC541E' }}
              dateInnerStyle={{ color: 'white', backgroundColor: '#003767' }}
            >
              <h3>{details.title}</h3>
              <h4>
                {details.city}, {details.state}
              </h4>
              <div className="categories">
                {details.categories.map(element => (
                  <span className="category-item" key={nanoid()}>
                    {element}
                  </span>
                ))}
              </div>
              <div className="timeline-links">
                {details.src.map(element => (
                  <a
                    href={element}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-button"
                    key={nanoid()}
                  >
                    {urlDomain(element)}
                  </a>
                ))}
              </div>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  ) : null;
}

export default RecentTimeline;
