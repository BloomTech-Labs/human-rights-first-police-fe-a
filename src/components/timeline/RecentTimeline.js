import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import Moment from 'react-moment';

export function RecentTimeline() {
  useQuery('timeline', async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDURL}/incidents/getincidents`
    );

    return data;
  });

  return (
    <div>
      Timeline
      <ul></ul>
    </div>
  );
}

export default RecentTimeline;
