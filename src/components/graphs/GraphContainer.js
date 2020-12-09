import React, { useEffect, useState } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import LineGraph from './linegraph/LineGraph';

// Time Libraries
import Moment from 'react-moment';
import 'moment-timezone';

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

const getIncidentCount = (data, state, today) => {
  let sortedByYear = {};

  // Dates
  const yearInMilliseconds = 31556952000;

  // Only grab events that have occurred in the last 12 months and filter out any that do not have dates:
  const oneYearData = data.filter(incident => {
    const date = Date.parse(incident.date);
    const start = new Date(today - yearInMilliseconds);

    if (incident.date && date >= start && date <= today) {
      return incident;
    }
  });

  // If the state is not selected:
  if (!state) {
    oneYearData.forEach(incident => {
      const year = incident.date.slice(0, 4);
      const month = incident.date.slice(5, 7);

      // If the year doesn't exist create it, if it does, increment the total for the month of that year
      if (!(year in sortedByYear)) {
        sortedByYear[year] = {
          '01': 0,
          '02': 0,
          '03': 0,
          '04': 0,
          '05': 0,
          '06': 0,
          '07': 0,
          '08': 0,
          '09': 0,
          '10': 0,
          '11': 0,
          '12': 0,
        };
        sortedByYear[year][month]++;
      } else {
        sortedByYear[year][month]++;
      }
    });
  }

  return sortedByYear;
};

// The Graph Container only needs to know a few things, the selected US State, the number of incidents per month, and the type of incidents per month. The latter two, will be influenced by the selected State.

const GraphContainer = props => {
  // State Management
  const [usState, setUsState] = useState(null);
  const [incidentCount, setIncidentCount] = useState({});
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [today, setToday] = useState(new Date().getTime());

  // Incident Data
  const incidents = useIncidents();

  useEffect(() => {
    if (incidents.data && !incidents.isError) {
      setData(incidents.data);
    }
  }, [incidents]);

  useEffect(() => {
    let count = getIncidentCount(data, usState, today);
    setIncidentCount(count);
  }, [data, setIncidentCount]);

  return (
    <section>
      <LineGraph monthlyData={incidentCount} selectedYear={selectedYear} />
    </section>
  );
};

export default GraphContainer;
