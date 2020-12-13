import React from 'react';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import Moment from 'react-moment';
import { useTimeline } from '../../state/query_hooks/useTimeline';

export function RecentTimeline() {
  const timelineQuery = useTimeline();
  return timelineQuery.isSuccess ? (
    <div className="timeline-container">
      <h1> Timeline of Recent Events </h1>
      <Timeline lineColor={'#</Timeline>ddd'}>
        {timelineQuery.data.map(details => {
          return (
            <TimelineItem
              key={details.id}
              dateText={<Moment format="LL">{details.date}</Moment>}
              style={{ color: '#BC541E' }}
              dateInnerStyle={{ color: 'white', backgroundColor: '#003767' }}
            >
              <h3>{details.title}</h3>
              <h4>
                {details.city}, {details.state}
              </h4>
              <div className="categories">
                {details.categories.map(element => (
                  <span className="category-item">{element}</span>
                ))}
              </div>
              <div className="timeline-links">
                {details.src.splice(0, 3).map(element => (
                  <a href={element} className="link-button">
                    Source
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
