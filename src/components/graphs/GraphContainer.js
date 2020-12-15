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

// Navigation
import Pagination from './pagination/Pagination';

// Assets
import { stateData } from './assets/bargraphAssets';

const filterData = (data, today, elevenMonths, state) => {
  // Only grab events that have occurred in the last 12 months and filter out any that do not have dates:
  const start = today - elevenMonths;

  const dateFilter = data.map(incident => {
    incident.date = Date.parse(incident.date);
    return incident;
  });

  let oneYearData = dateFilter.filter(
    incident => incident.date >= start && incident.date <= today
  );

  if (state) {
    oneYearData = oneYearData.filter(incident => incident.state === state);
  }

  return oneYearData;
};

// The Graph Container only needs to know a few things, the selected US State, the number of incidents per month, and the type of incidents per month. The latter two, will be influenced by the selected State.

const GraphContainer = () => {
  const query = useIncidents();
  const incidents = query.data && !query.isError ? query.data : [];

  // State Management
  const [usState, setUsState] = useState('New York');
  const [today] = useState(new Date().getTime());
  const [elevenMonths] = useState(28927182167); // Milliseconds
  const [graph, setGraph] = useState('Line');
  const [filtered, setFiltered] = useState([]);
  const [counts, setCounts] = useState({});
  const [barCounts, setBarCounts] = useState({});
  const [months, setmonths] = useState([]);

  useEffect(() => {
    // Incident Data
    setFiltered(filterData(incidents, today, elevenMonths, usState));
  }, [query.isLoading, usState]);

  // Create keys for months object dynamically
  useEffect(() => {
    let months = [];
    let start = today - elevenMonths;
    let firstMonth = DateTime.fromMillis(start).toFormat('MMM');
    let month = start;
    months.push(firstMonth);

    while (month <= today - 2592000000) {
      month += 2592000000;
      months.push(DateTime.fromMillis(month).toFormat('MMM'));
    }

    setmonths(months);
  }, [elevenMonths, today]);

  useEffect(() => {
    const counts = {};
    months.forEach(month => (counts[month] = 0));

    filtered.forEach(incident => {
      let month = DateTime.fromMillis(incident?.date).toFormat('MMM');
      if (month in counts) {
        counts[month]++;
      }
    });
    setCounts(counts);
  }, [filtered, months]);

  // Bar Graph Data manipulation:
  useEffect(() => {
    const data = [...filtered];
    const barCounts = { ...stateData };
    console.log(data);
    data.forEach(incident => {
      if (incident.state in barCounts) {
        barCounts[incident.state]['count'] += 1;
      } else {
        barCounts['Unknown']['count'] += 1;
      }
    });

    setBarCounts(barCounts);
  }, [filtered]);

  if (graph === 'Line') {
    return (
      <section className="graph-container">
        <Pagination setGraph={setGraph} />
        <LineGraph data={counts} months={months} />
      </section>
    );
  } else if (graph === 'Bar') {
    return (
      <section className="graph-container">
        <Pagination setGraph={setGraph} />
        <BarGraph count={barCounts} />
      </section>
    );
  } else if (graph === 'Pie') {
    return (
      <section className="graph-container">
        <Pagination setGraph={setGraph} />
        <PieGraph data={filtered} />
      </section>
    );
  }
};

export default GraphContainer;
