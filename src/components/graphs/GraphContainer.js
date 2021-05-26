import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Empty } from 'antd';

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
import Legend from './assets/Legend';

import './GraphContainer.css';

const filterDataByState = (state, data) => {
  return data.filter(incident => incident.state === state);
};

//not being used
const changeDataDatesToMillis = data => {
  return data.map(incident => ({
    ...incident,
    date: new Date(incident.date).getTime(),
  }));
};

// The Graph Container only needs to know a few things, the selected US State, the number of incidents per month, and the type of incidents per month. The latter two, will be influenced by the selected State.

const GraphContainer = () => {
  const incidents = useSelector(state => Object.values(state.incident.data));
  const fetchStatus = useSelector(
    state => state.api.incidents.getincidents.status
  );

  const [dateIsMilli, setDateIsMilli] = useState(false);

  // Check if is loading:
  useEffect(() => {
    if (fetchStatus === 'pending') {
      setDateIsMilli(false);
    }
  }, [fetchStatus]);

  // State Management
  const [usState, setUsState] = useState(null);
  const [today] = useState(DateTime.local());
  // const [elevenMonths] = useState(28927182167); // Milliseconds
  const [graph, setGraph] = useState('Incidents Per Month');
  const [filtered, setFiltered] = useState([]); // Data filtered by user
  console.log('>>>>', filtered);
  const [counts, setCounts] = useState({});
  const [barCounts, setBarCounts] = useState({});
  const [months, setmonths] = useState([]);

  //Filter Data if user selects state:
  useEffect(() => {
    if (fetchStatus === 'success') {
      const filteredStateData = filterDataByState(usState, incidents);
      usState ? setFiltered(filteredStateData) : setFiltered(incidents);
    }
  }, [usState, fetchStatus]);

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
      let month = DateTime.fromISO(incident?.date).toFormat('MMM');
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

  const noDataDisplay = () => {
    return (
      <div className="no-data-container">
        <Empty
          className="no-data"
          imageStyle={{
            height: 200,
          }}
          description={
            <span>
              Our database has no data for{' '}
              <span style={{ color: '#1890ff' }}>{usState}</span>
            </span>
          }
        />
      </div>
    );
  };

  return (
    <div className="mobile-issue">
      <header>
        <Pagination
          setGraph={setGraph}
          setUsState={setUsState}
          filtered={filtered}
        />
      </header>

      <div className="all-graphs-container">
        <section id="lineGraph" className="graph-container">
          {filtered.length > 0 ? (
            <div className="all-graphs">
              <h2 style={{ marginTop: '2rem' }}>
                Incident reports identified by our data collection methods per
                month
              </h2>
              <p>
                <h4>April 2020 - Present</h4>
              </p>
            </div>
          ) : null}

          {filtered.length > 0 ? (
            <LineGraph data={counts} months={months} />
          ) : (
            noDataDisplay()
          )}
        </section>
        {filtered.length > 0 ? (
          <div>
            <section id="barGraph" className="graph-container">
              <div>
                <h2 style={{ marginTop: '5rem' }}>
                  Total incident reports identified by our data collection
                  methods by state
                </h2>
              </div>
              <BarGraph count={barCounts} />
            </section>
            <section id="pieGraph" className="graph-container">
              <h2 style={{ marginTop: '5rem' }}>
                Prevalence of Force Ranks as identified by our data collection
                methods
              </h2>
              <div className="pie-holder">
                <div className="pie">
                  <PieGraph data={filtered} />
                </div>
                <div className="pie-legend">
                  <Legend />
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GraphContainer;
