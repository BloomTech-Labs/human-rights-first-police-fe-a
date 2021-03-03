import React, { useEffect, useState } from 'react';
import { useIncidents } from '../../hooks/legacy/useIncidents';

// Graphs
import LineGraph from './linegraph/LineGraph';
import BarGraph from './bargraph/BarGraph';
import PieGraph from './piegraph/PieGraph';

// Time Libraries
import { DateTime } from 'luxon';

// Navigation
import Pagination from './pagination/Pagination';

// Assets
import { stateData } from './assets/bargraphAssets';

const filterDataByState = (state, data) => {
  return data.filter(incident => incident.state === state);
};

const changeDataDatesToMillis = data => {
  return data.map(incident => ({
    ...incident,
    date: new Date(incident.date).getTime(),
  }));
};

// The Graph Container only needs to know a few things, the selected US State, the number of incidents per month, and the type of incidents per month. The latter two, will be influenced by the selected State.

const GraphContainer = () => {
  const query = useIncidents();
  const incidents =
    query.data && !query.isError ? changeDataDatesToMillis(query.data) : [];
  const [dateIsMilli, setDateIsMilli] = useState(false);

  // Check if is loading:
  useEffect(() => {
    if (query.isLoading && !query.isSuccess) {
      setDateIsMilli(false);
    }
  }, [query.isLoading]);

  // State Management
  const [usState, setUsState] = useState(null);
  const [today] = useState(DateTime.local());
  // const [elevenMonths] = useState(28927182167); // Milliseconds
  const [graph, setGraph] = useState('Incidents Per Month');
  const [filtered, setFiltered] = useState([]); // Data filtered by user
  const [counts, setCounts] = useState({});
  const [barCounts, setBarCounts] = useState({});
  const [months, setmonths] = useState([]);

  //Filter Data if user selects state:
  useEffect(() => {
    if (!query.isLoading && query.isSuccess) {
      const filteredStateData = filterDataByState(usState, incidents);
      usState ? setFiltered(filteredStateData) : setFiltered(incidents);
    }
  }, [usState, query.isLoading, query.isSuccess]);

  useEffect(() => {
    let months = [];
    let end = today.minus({ months: 12 });

    let currentMonth = end;
    let i = 1;

    while (i < 13) {
      months.push(currentMonth.monthShort);
      currentMonth = currentMonth.plus({ months: 1 });
      i++;
    }

    setmonths(months);
  }, [today]);

  // Create the counts state:
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

  if (graph === 'Incidents Per Month') {
    return (
      <section className="graph-container">
        <header>
          <Pagination setGraph={setGraph} setUsState={setUsState} />
          <div>
            <h2>
              Incidents identified by our data collection methods per month
            </h2>
            <h4>April 2020 - Present</h4>
          </div>
        </header>
        <LineGraph data={counts} months={months} />
      </section>
    );
  } else if (graph === 'Incidents Per State') {
    return (
      <section className="graph-container">
        <header>
          <Pagination setGraph={setGraph} setUsState={setUsState} />
          <div>
            <h2>
              Total incidents identified by our data collection methods by state
            </h2>
            <h4>April 2020 - Present</h4>
          </div>
        </header>
        <BarGraph count={barCounts} />
      </section>
    );
  } else if (graph === 'Incident Categories') {
    return (
      <section className="graph-container">
        <header>
          <Pagination setGraph={setGraph} setUsState={setUsState} />
          <div>
            <h2>
              Prevalence of Force Ranks as identified by our data collection
              methods
            </h2>
            <h4>April 2020 - Present</h4>
          </div>
        </header>
        <PieGraph data={filtered} />
      </section>
    );
  }
};

export default GraphContainer;
