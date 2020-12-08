import React from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';

const LineGraph = props => {
  const incidents = useIncidents();
  const data = incidents.data;

  console.log(data);
  return <div></div>;
};

export default LineGraph;
