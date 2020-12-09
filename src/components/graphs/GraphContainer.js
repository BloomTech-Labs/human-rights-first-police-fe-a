import React, { useEffect, useState } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';

const getIncidentCount = (data, state, setIncidentCount) => {
  let count = 0;
  if (!state) {
    data.forEach(incident => {
      count++;
    });
  }

  return setIncidentCount(count);
};

const LineGraph = props => {
  const incidents = useIncidents();
  const data = incidents.data && !incidents.isError ? incidents.data : [];
  const [usState, setUsState] = useState(null);
  const [incidentCount, setIncidentCount] = useState(0);

  useEffect(() => {
    getIncidentCount(data, usState, setIncidentCount);
  }, [usState, data]);

  console.log(data);
  return <div></div>;
};

export default LineGraph;
