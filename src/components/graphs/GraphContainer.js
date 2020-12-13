import React, { useEffect, useState } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';

// Graphs
import LineGraph from './linegraph/LineGraph';
import BarGraph from './bargraph/BarGraph';
import PieGraph from './piegraph/PieGraph';

// CSS
import './GraphContainer.css';

// Time Libraries
import { DateTime } from 'luxon';
import Pagination from './pagination/Pagination';

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
  } else {
    data.forEach(incident => {
      if (incident.state === state) {
        const date = DateTime.fromMillis(incident.date);
        const month = date.toFormat('MMM');

        sortedByYear[month]++;
      }
    });
  }

  return sortedByYear;
};

const filterData = (data, today, elevenMonths, state) => {
  // Only grab events that have occurred in the last 12 months and filter out any that do not have dates:
  let oneYearData = data.filter(incident => {
    let date = Date.parse(incident.date);
    const start = today - elevenMonths;

    if (date >= start && date <= today) {
      incident.date = date;
      return incident;
    }
  });

  if (state) {
    oneYearData = oneYearData.filter(incident => incident.state === state);
  }

  console.log(oneYearData);
  return oneYearData;
};

// The Graph Container only needs to know a few things, the selected US State, the number of incidents per month, and the type of incidents per month. The latter two, will be influenced by the selected State.

const GraphContainer = () => {
  // State Management
  const [usState, setUsState] = useState('New York');
  const [incidentCount, setIncidentCount] = useState({});
  const [data, setData] = useState([]);
  const [today] = useState(new Date().getTime());
  const [elevenMonths] = useState(28927182167); // Milliseconds
  const [graph, setGraph] = useState('Pie');

  // Incident Data
  const incidents = useIncidents();

  useEffect(() => {
    if (incidents.data && !incidents.isError) {
      // Filter Data
      const filtered = filterData(incidents.data, today, elevenMonths, usState);
      setData(filtered);
    }
  }, [incidents, elevenMonths, today, usState]);

  useEffect(() => {
    let count = getIncidentCount(data, usState, today, elevenMonths);
    setIncidentCount(count);
  }, [data, setIncidentCount, today, usState, elevenMonths]);

  if (graph === 'Line') {
    return (
      <section className="graph-container">
        <Pagination setGraph={setGraph} />
        <LineGraph monthlyData={incidentCount} today={today} />
      </section>
    );
  } else if (graph === 'Bar') {
    return (
      <section className="graph-container">
        <Pagination setGraph={setGraph} />
        <BarGraph data={data} usState={usState} />
      </section>
    );
  } else if (graph === 'Pie') {
    return (
      <section className="graph-container">
        <Pagination setGraph={setGraph} />
        <PieGraph data={data} usState={usState} />
      </section>
    );
  }
};

export default GraphContainer;
