import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { DatePicker } from 'antd';

// component imports
import SearchBar from '../graphs/searchbar/SearchBar';

const DataExportForm = () => {
  const [usState, setUsState] = useState(null);
  const [dates, setDates] = useState(null);
  const [queryString, setQueryString] = useState('');

  const { RangePicker } = DatePicker;

  const onDateSelection = (dates, dateStrings) => {
    setDates(
      dateStrings[0] && dateStrings[1]
        ? [DateTime.fromISO(dateStrings[0]), DateTime.fromISO(dateStrings[1])]
        : null
    );
  };

  useEffect(() => {
    if (dates) {
      const startDate = `${dates[0].c.year}-${dates[0].c.month}-${dates[0].c.day}`;
      const endDate = `${dates[1].c.year}-${dates[1].c.month}-${dates[1].c.day}`;
      setQueryString(`?state=${usState}&start=${startDate}&end=${endDate}`);
      console.log(queryString);
    }
  }, [dates, usState]);

  const downloadCSV = () => {
    window.open(
      `${process.env.REACT_APP_BACKENDURL}/incidents/download${queryString}`
    );
  };

  //TODO: Create API calls to correct endpoints
  const viewJSON = () => {
    // replace with API call
    console.log(queryString);
  };

  return (
    <div>
      <RangePicker onCalendarChange={onDateSelection} />
      <SearchBar setUsState={setUsState} />
      <button onClick={downloadCSV}>Download CSV</button>
      {/* Button is hidden pending functionality */}
      <button onClick={viewJSON} style={{ display: 'none' }}>
        View as JSON
      </button>
      {/* Create a container that displays conditionally based on a returned query */}
    </div>
  );
};

export default DataExportForm;
