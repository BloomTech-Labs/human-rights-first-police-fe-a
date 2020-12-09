import React, { useEffect, useState } from 'react';
import { useIncidents } from './DataQueryHook';
import LineGraph from './linegraph/LineGraph';

const getIncidentCount = (data, state) => {
  let sortedByYear = {};

  let count = {
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

  // Some incidents do not have dates, filter those out
  const filtered = data.filter(incident => incident.date);

  // If the state is not selected:
  if (!state) {
    filtered.forEach(incident => {
      const year = incident.date.slice(0, 4);
      const month = incident.date.slice(5, 7);

      // If the year doesn't exist create it, if it does, increment the total for the month of that year
      if (!(year in sortedByYear)) {
        sortedByYear[year] = count;
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

  // Incident Data
  const incidents = useIncidents();

  useEffect(() => {
    if (incidents.data && !incidents.isError) {
      setData(incidents.data);
    }
  }, [incidents]);

  useEffect(() => {
    let count = getIncidentCount(data, usState);
    setIncidentCount(count);
  }, [data, setIncidentCount]);

  return (
    <section>
      <LineGraph monthlyData={incidentCount} selectedYear={selectedYear} />
    </section>
  );
};

export default GraphContainer;
