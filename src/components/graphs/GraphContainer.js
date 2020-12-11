import React, { useEffect, useState } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import LineGraph from './linegraph/LineGraph';

// Time Libraries
import { DateTime } from 'luxon';

// Helper Data
const twentyOne = {
  categories: ['baton', 'beat', 'strike'],
  city: 'Minneapolis',
  date: '2021-05-26T00:00:00.000Z',
  desc: `A group of cops start to approach a group of press taking photos and video. One press member repeats "we have our hands up and we have press passes". An officer walking by points in the direction of a photographer and says something indiscernable. The camera pans to show a cop hitting the photographer in the neck and head with a wooden baton.`,
  empty_hand_hard: false,
  empty_hand_soft: false,
  incident_id: 'mn-minneapolis-21',
  lat: 44.947865,
  less_lethal_methods: true,
  lethal_force: false,
  long: -93.234886,
  src: ['https://youtu.be/XAa5xb6JitI?t=5982'],
  state: 'Minnesota',
  title: 'Police hit press in neck and head with wooden baton',
  uncategorized: false,
  verbalization: false,
};

const getIncidentCount = (data, state, today, elevenMonths) => {
  let start = today - elevenMonths;
  let sortedByYear = {};

  while (start < today) {
    sortedByYear[DateTime.fromMillis(start).toFormat('MMM')] = 0;
    start += 2592000000;
  }

  // If the state is not selected:
  if (!state) {
    data.forEach(incident => {
      const date = DateTime.fromMillis(incident.date);
      const month = date.toFormat('MMM');

      sortedByYear[month]++;
    });
  }

  return sortedByYear;
};

const filterData = (data, today, elevenMonths) => {
  // Only grab events that have occurred in the last 12 months and filter out any that do not have dates:
  const oneYearData = data.filter(incident => {
    let date = Date.parse(incident.date);
    const start = today - elevenMonths;

    if (date >= start && date <= today) {
      incident.date = date;
      return incident;
    }
  });

  return oneYearData;
};

// The Graph Container only needs to know a few things, the selected US State, the number of incidents per month, and the type of incidents per month. The latter two, will be influenced by the selected State.

const GraphContainer = () => {
  // State Management
  const [usState, setUsState] = useState(null);
  const [incidentCount, setIncidentCount] = useState({});
  const [data, setData] = useState([]);
  const [today] = useState(new Date().getTime());
  const [elevenMonths] = useState(28927182167); // Milliseconds

  // Incident Data
  const incidents = useIncidents();

  useEffect(() => {
    if (incidents.data && !incidents.isError) {
      // Filter Data
      const filtered = filterData(incidents.data, today, elevenMonths);
      setData(filtered);
    }
  }, [incidents, elevenMonths, today]);

  useEffect(() => {
    let count = getIncidentCount(data, usState, today, elevenMonths);
    setIncidentCount(count);
  }, [data, setIncidentCount, today, usState]);

  return (
    <section>
      <LineGraph monthlyData={incidentCount} today={today} />
    </section>
  );
};

export default GraphContainer;
