import React from 'react';
import { Timeline } from 'vertical-timeline-component-for-react';
import { useTimeline } from '../../state/query_hooks/useTimeline';
import { nanoid } from 'nanoid';
import './RecentTimeline.css';
import TimelineItems from './TimelineItems';

export function RecentTimeline() {
  const timelineQuery = useTimeline();

  return timelineQuery.isSuccess ? (
    <div className="timeline-container">
      <h1 style={{ marginTop: '55px' }}> Timeline of Recent Events </h1>
      <Timeline lineColor={'#</Timeline>ddd'}>
        {timelineQuery.data.map(details => {
          return <TimelineItems details={details} key={nanoid()} />;
        })}
      </Timeline>
    </div>
  ) : null;
}

export default RecentTimeline;
