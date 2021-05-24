import React from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import { useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import TimelineItems from './TimelineItems';

export function RecentTimeline() {
  const timeline = useSelector(state =>
    state.incident.timeline.map(id => state.incident.data[id])
  );

  return (
    <div className="timeline-wrapper">
      <Timeline lineColor={'#000000'}>
        {timeline.map(details => {
          return <TimelineItems details={details} key={nanoid()} />;
        })}
      </Timeline>
    </div>
  );
}

export default RecentTimeline;
