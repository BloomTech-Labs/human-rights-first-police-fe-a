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
    <Timeline lineColor={'#</Timeline>ddd'}>
      {timeline.map(details => {
        return <TimelineItems details={details} key={nanoid()} />;
      })}
    </Timeline>
  );
}

export default RecentTimeline;
