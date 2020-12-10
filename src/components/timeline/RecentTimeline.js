import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import Moment from 'react-moment';
import { useTimeline } from '../../state/query_hooks/useTimeline';

export function RecentTimeline() {
  const timelineQuery = useTimeline();
  return timelineQuery.isSuccess ? (
    <div>
      Timeline
      <ul>
        {timelineQuery.data.map(details => {
          return (
            <div>
              <div>{details.city}</div>
              <div>{details.state}</div>
            </div>
          );
        })}
      </ul>
    </div>
  ) : null;
}

export default RecentTimeline;
