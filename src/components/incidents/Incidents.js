import React, { useEffect, useState } from 'react';
import IncidentsCard from '../incidents/IncidentsCard';
import {
  falsiesRemoved,
  filterDataByState,
  filterDataByDate,
  createRange,
} from '../incidents/IncidentFilter';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

import { Empty } from 'antd';

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
  const [data, setData] = useState([]); // State for User Searches

  // Get incident data from Redux
  const incidents = useSelector(state => Object.values(state.incident.data));
  const fetchStatus = useSelector(
    state => state.api.incidents.getincidents.status
  );

  useEffect(() => {
    fetchStatus === 'success' &&
      data.length === 0 &&
      setData(falsiesRemoved(incidents));
  }, [fetchStatus, data.length, incidents]);

  useEffect(() => {
    const range = dates && createRange(dates);
    let filtered = [...incidents];
    if (usState) {
      filtered = filterDataByState(filtered, usState);
    }
    if (dates) {
      filtered = filterDataByDate(filtered, range);
    }
    setData(falsiesRemoved(filtered));
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
    <div className="incidents-container">
      <div className="incidents-page">
        <header>
          <Pagination setUsState={setUsState} />
          <h2 className="incidents-title">Browse Incidents</h2>
          <section className="user-input">
            <SearchBar setUsState={setUsState} />
            <RangePicker onCalendarChange={onDateSelection} />
          </section>
        </header>
        <section>
          {data.length > 0 ? (
            <ul>
              {currentPosts.map(incident => {
                return <IncidentsCard key={nanoid()} incident={incident} />;
              })}
            </ul>
          ) : (
            noDataDisplay()
          )}
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
    </div>
  );
};

export default Incidents;
