import React, { useEffect, useState } from 'react';
import './Incidents.css';
import sourceListHelper from '../../utils/sourceListHelper';
import {
  falsiesRemoved,
  filterDataByState,
  filterDataByDate,
  createRange,
  filterByStateAndDate,
} from '../incidents/IncidentFilter';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';

import { Empty, Button, Collapse, Tag, Checkbox, Popover } from 'antd';

// Time Imports
import { DateTime } from 'luxon';

// Search Bar
import SearchBar from '../graphs/searchbar/SearchBar';

// Ant Design Imports:
import { Pagination, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
const { Panel } = Collapse;

const header = incident => {
  return (
    <div className="header-top">
      <p>{incident.title}</p>
      <div className="extra">
        <div className="tag-group">
          <Tag>{incident.categories[0]}</Tag>
          <Tag>{incident.categories[1]}</Tag>
          <Tag>{incident.categories[2]}</Tag>
          <Tag>Rank 2</Tag>
        </div>

        <p>{incident.city}, </p>
        <p className="panel-date">
          {DateTime.fromISO(incident.date)
            .plus({ days: 1 })
            .toLocaleString(DateTime.DATE_MED)}
        </p>
        <Checkbox>Add To List</Checkbox>
      </div>
    </div>
  );
};

const Incidents = () => {
  const [itemsPerPage] = useState(8);
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

  const onSubmit = e => {
    e.preventDefault();
    setCurrentPage();
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
              There are no incident reports matching these search criteria.
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
          <h2 className="incidents-title">Browse Incident Reports</h2>
          <section className="user-input">
            <SearchBar setUsState={setUsState} />
            <RangePicker onCalendarChange={onDateSelection} />
            <Button onSubmit={onSubmit}>Begin Search</Button>
          </section>
        </header>
        <section>
          <Collapse key={nanoid()} className="collapse">
            {currentPosts.map(incident => {
              return (
                <Panel
                  header={header(incident)}
                  className="panel"
                  expandIconPosition="left"
                >
                  <div className="collapse-content">
                    <p>{incident.desc}</p>

                    <Popover
                      content={sourceListHelper(incident)}
                      placement="rightTop"
                    >
                      <Button
                        type="primary"
                        style={{ backgroundColor: '#003767', border: 'none' }}
                      >
                        Sources
                      </Button>
                    </Popover>
                  </div>
                </Panel>
              );
            })}
          </Collapse>
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
