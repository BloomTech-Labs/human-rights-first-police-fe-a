import React, { useEffect, useState } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import IncidentsCard from '../incidents/IncidentsCard';
import {
  falsiesRemoved,
  filterDataByState,
  filterDataByDate,
  createRange,
} from '../incidents/IncidentFilter';
import { nanoid } from 'nanoid';
import './Incidents.css';

// Time Imports
import { DateTime } from 'luxon';

// Search Bar
import SearchBar from '../graphs/searchbar/SearchBar';

// Ant Design Imports:
import { Pagination, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const Incidents = () => {
  const [itemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Data State
  const [usState, setUsState] = useState(null);
  const [dates, setDates] = useState(null);
  const [data, setData] = useState([]);

  // Async Data Call
  const dataQuery = useIncidents();
  const incidents = dataQuery.data && !dataQuery.isError ? dataQuery.data : [];

  useEffect(() => {
    !dataQuery.isLoading &&
      !dataQuery.isError &&
      setData(falsiesRemoved(dataQuery.data));
  }, [dataQuery.isLoading, dataQuery.isError, dataQuery.data]);

  useEffect(() => {
    const range = dates && createRange(dates);

    if (usState && dates) {
      const copyOfData = [...incidents];
      let filteredData = filterDataByState(copyOfData, usState);
      let dateAndStateFilteredData = filterDataByDate(filteredData, range);

      setData(dateAndStateFilteredData);
    } else if (usState && !dates) {
      const copyOfData = [...incidents];
      let filteredByState = filterDataByState(copyOfData, usState);
      setData(filteredByState);
    } else if (!usState && dates) {
      const copyOfData = [...incidents];

      let filteredByDate = filterDataByDate(copyOfData, range);
      setData(filteredByDate);
    } else {
      setData(falsiesRemoved(incidents));
    }
  }, [usState, dates]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const onChange = page => {
    setCurrentPage(page);
  };

  const onDateSelection = (dates, dateStrings) => {
    setDates(
      dateStrings[0] && dateStrings[1]
        ? [DateTime.fromISO(dateStrings[0]), DateTime.fromISO(dateStrings[1])]
        : null
    );
  };

  return (
    <>
      <div className="incidents-page">
        <header>
          <h1 className="title"> Expanded Timeline of Events </h1>
          <section className="user-input">
            <SearchBar setUsState={setUsState} />
            <RangePicker onCalendarChange={onDateSelection} />
          </section>
        </header>
        <section>
          <ul>
            {currentPosts.map(incident => {
              return <IncidentsCard key={nanoid()} incident={incident} />;
            })}
          </ul>
        </section>
      </div>
      <section className="pagination">
        <Pagination
          onChange={onChange}
          current={currentPage}
          pageSize={itemsPerPage}
          total={data.length}
          showSizeChanger={false}
        />
      </section>
    </>
  );
};

export default Incidents;
