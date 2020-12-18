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

const filterData = (
  data,
  today,
  elevenMonths,
  state,
  dateIsMilli,
  setDateIsMilli
) => {
  // Only grab events that have occurred in the last 12 months and filter out any that do not have dates:
  const start = today - elevenMonths;
  let dateFilter;

  !dateIsMilli
    ? (dateFilter = data.map(incident => {
        incident.date = DateTime.fromISO(incident.date).toMillis();
        return incident;
      }))
    : (dateFilter = data);

  setDateIsMilli(true);

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
  const [dateIsMilli, setDateIsMilli] = useState(false);

  // Check if is loading:
  useEffect(() => {
    if (query.isLoading && !query.isSuccess) {
      setDateIsMilli(false);
    }
  }, [query.isLoading]);

  // State Management
  const [usState, setUsState] = useState();
  const [today] = useState(new Date().getTime());
  const [elevenMonths] = useState(28927182167); // Milliseconds
  const [graph, setGraph] = useState('Line');
  const [filtered, setFiltered] = useState([]);
  const [counts, setCounts] = useState({});
  const [barCounts, setBarCounts] = useState({});
  const [months, setmonths] = useState([]);

  useEffect(() => {
    // Incident Data
    if (!query.isLoading) {
      setFiltered(
        filterData(
          incidents,
          today,
          elevenMonths,
          usState,
          dateIsMilli,
          setDateIsMilli
        )
      );
    }
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
  }, [elevenMonths, today, usState]);

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
  }, [filtered, months, usState]);

  // Bar Graph Data manipulation:
  useEffect(() => {
    setBarCounts({});
    const data = [...filtered];
    const newBarCounts = {};

    for (let state in stateData) {
      newBarCounts[state] = { ...stateData[state] };
    }

    data.forEach(incident => {
      if (incident.state in newBarCounts) {
        newBarCounts[incident.state]['count'] += 1;
      } else {
        newBarCounts['Unknown']['count'] += 1;
      }
    });

    setBarCounts(newBarCounts);
  }, [filtered, usState]);

  if (graph === 'Line') {
    return (
      <section className="graph-container">
        <Pagination setGraph={setGraph} setUsState={setUsState} />
        <LineGraph data={counts} months={months} />
      </section>
    );
  } else if (graph === 'Bar') {
    return (
      <section className="graph-container">
        <Pagination setGraph={setGraph} setUsState={setUsState} />
        <BarGraph count={barCounts} />
      </section>
    );
  } else if (graph === 'Pie') {
    return (
      <section className="graph-container">
        <Pagination setGraph={setGraph} setUsState={setUsState} />
        <PieGraph data={filtered} />
      </section>
    );
  }
};

export default GraphContainer;
