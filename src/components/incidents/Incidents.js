import React, { useEffect, useState } from 'react';
import './Incidents.css';
import sourceListHelper from '../../utils/sourceListHelper';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  falsiesRemoved,
  filterDataByState,
  filterDataByDate,
  createRange,
  filterByTags,
} from '../incidents/IncidentFilter';
import FilterForm from './FilterForm';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import { Empty, Button, Collapse, Tag, Checkbox, Popover, Select } from 'antd';

// Time Imports
import { DateTime } from 'luxon';

// Search Bar
import SearchBar from '../graphs/searchbar/SearchBar';

// Ant Design Imports:
import { AutoComplete, Pagination, DatePicker } from 'antd';
import { CSVLink } from 'react-csv'; // helper for export CSV from current State
import { ConsoleSqlOutlined } from '@ant-design/icons';

let ranks = ['Rank 1', 'Rank 2', 'Rank 3', 'Rank 4', 'Rank 5'];

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const { Option } = Select;
const { CheckableTag } = Tag;

const Incidents = () => {
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Data State
  const [usState, setUsState] = useState(null);
  const [dates, setDates] = useState(null);
  const [data, setData] = useState([]); // State for User Searches
  const [selectedTags, setSelectedTags] = useState(['All']);
  const [queryString, setQueryString] = useState('');
  const [selectedIncidents, setSelectedIncidents] = useLocalStorage(
    'marked',
    []
  ); // all marked incidents saved in local storage
  const [added, setAdded] = useState([]); // data where all checked cases stored(from checkboxes)
  const [rank, setRank] = useState('All');

  // Get incident data from Redux
  const incidents = useSelector(state => Object.values(state.incident.data));
  const tagIndex = useSelector(state => Object.keys(state.incident.tagIndex));
  const fetchStatus = useSelector(
    state => state.api.incidents.getincidents.status
  );

  const [value, setValue] = useState('');
  const [activeCategories, setActiveCategories] = useState([]);

  const categoriesData = [];

  const allObj = {
    value: 'All',
  };

  categoriesData.push(allObj);

  for (let tag of tagIndex) {
    if (tag.length < 3) {
      continue;
    } else {
      const item = {
        value: tag,
      };
      categoriesData.push(item);
    }
  }

  const header = incident => {
    return (
      <div className="header-top">
        <div className="title-container">
          {/* title-text is used instead of title since ant design form items
           * with name="title" get the id "title" from ant design, so there's
           * some namespace clashes in the css */}
          <p id="title-text">{incident.title}</p>
        </div>
        <div className="extra">
          <div className="incident-rank">
            <Tag className="panel-tags">{incident.force_rank.slice(0, 6)}</Tag>
          </div>
          <div className="incident-location">
            <div className="location">
              {incident.city}, {incident.state}
            </div>
          </div>
          <div className="incident-date">
            <div className="panel-date">
              {DateTime.fromISO(incident.incident_date)
                .plus({ days: 1 })
                .toLocaleString(DateTime.DATE_MED)}
            </div>
          </div>
          <div className="header-checkbox">
            <div className="checkbox">
              <Checkbox
                checked={selectedIncidents.indexOf(incident.incident_id) > -1}
                onChange={checked => onSelect(incident.incident_id, checked)}
              >
                Add To List
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const range = dates && createRange(dates);
    let filtered = [...incidents];
    if (
      activeCategories.length !== 0 &&
      activeCategories.indexOf('All') === -1
    ) {
      filtered = filterByTags(filtered, activeCategories);
    }
    if (usState) {
      filtered = filterDataByState(filtered, usState);
    }
    if (dates) {
      const startDate = `${dates[0].c.year}-${dates[0].c.month}-${dates[0].c.day}`;
      const endDate = `${dates[1].c.year}-${dates[1].c.month}-${dates[1].c.day}`;
      setQueryString(`&state=${usState}&start=${startDate}&end=${endDate}`);
      filtered = filterDataByDate(filtered, range);
    }
    if (rank !== 'All') {
      filtered = filtered.filter(incident => {
        return incident.force_rank.trim() === ranks[parseInt(rank) - 1].trim();
      });
    }
    setData(falsiesRemoved(filtered));
    setCurrentPage(1);
    // setAdded([]); // it cleans checked data when we change the filtered data
    // setSelectedIncidents([]);
  }, [usState, dates, activeCategories, rank]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const onSelect = id => {
    let newSelectedIncidents = [];
    if (selectedIncidents.indexOf(id) > -1) {
      newSelectedIncidents = selectedIncidents.filter(i => i !== id);
    } else {
      newSelectedIncidents = [...selectedIncidents, id];
    }
    setSelectedIncidents(newSelectedIncidents);
  };

  const onChange = page => {
    setCurrentPage(page);
  };

  const onToggle = (tag, checked) => {
    let nextSelectedTags = checked
      ? [...activeCategories, tag]
      : activeCategories.filter(t => t !== tag || t === 'All');
    if (tag === 'All') {
      setActiveCategories([]);
      return;
    }
    if (nextSelectedTags[0] === 'All') {
      setActiveCategories(nextSelectedTags.slice(1));
      return;
    }
    setActiveCategories(nextSelectedTags);
  };

  const onRank = e => {
    setRank(e);
  };

  let rec = [...data]; // copies the current data to avoid manipulating with the main state
  rec.forEach(i => {
    // makes the current data prettier
    i.description = i.description.split('"').join("'"); //  replaces double quotes with single quotes to avoid error with description in CSV tables
    i.incident_date = i.incident_date.slice(0, 10); // removes unreadable timestamps
  });

  const headers = [
    { label: 'Incident ID', key: 'incident_id' },
    { label: 'Date', key: 'incident_date' },
    { label: 'Title', key: 'title' },
    { label: 'Force Rank', key: 'force_rank' },
    { label: 'Tags', key: 'tags' },
    { label: 'City', key: 'city' },
    { label: 'State', key: 'state' },
    { label: 'Source', key: 'src' },
    { label: 'Description', key: 'description' },
    { label: 'Latitude', key: 'lat' },
    { label: 'Longitude', key: 'long' },
  ];

  useEffect(() => {
    // handles any changes with checked/unchecked incidents
    let k = [];
    let f = [];
    if (selectedIncidents.length !== 0) {
      selectedIncidents.forEach(i => {
        [f] = incidents.filter(inc => inc.incident_id === i);
        let cl = JSON.parse(JSON.stringify(f)); // deep copy of read-only file to make data prettier
        cl.description = cl.description.split('"').join("'"); //  replaces double quotes with single quotes to avoid error with description in CSV tables
        cl.incident_date = cl.incident_date.slice(0, 10); // removes unreadable timestamps
        k.push(cl);
      });
    }
    setAdded(k);
  }, [selectedIncidents]);

  const csvReport = {
    // stores all data for CSV report
    data: rec, // uploads filtered data
    headers: headers,
    filename: 'report.csv',
  };

  const markedReport = {
    // stores marked data for CSV report
    data: added, // uploads marked data
    headers: headers,
    filename: 'marked_report.csv',
  };

  const clearList = () => {
    setSelectedIncidents([]);
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
              <span style={{ color: '#003767' }}>{usState}</span>
            </span>
          }
        />
      </div>
    );
  };

  const onCategoryChange = data => {
    setValue(data);
  };
  const onCategorySelect = data => {
    if (activeCategories.includes(data)) {
      setValue('');
      return;
    } else {
      setActiveCategories([...activeCategories, data]);
      setValue('');
    }
  };
  const filterOption = (inputValue, option) => {
    return inputValue.slice(0, inputValue.length).toLowerCase() ===
      option.value.slice(0, inputValue.length).toLowerCase()
      ? option
      : null;
  };

  return (
    <div className="incident-reports-page">
      <div className="form-container">
        <h1>Filter Incident Reports</h1>
        <FilterForm />
        <form className="export-form">
          <label htmlFor="ranks" className="labels">
            Rank
            <br></br>
            <Select
              onChange={onRank}
              showSearch
              defaultValue="All"
              className="form-inputs"
              id="ranks"
              value={rank}
            >
              <Option value="All">All</Option>
              <Option value="1">Rank: 1</Option>
              <Option value="2">Rank: 2</Option>
              <Option value="3">Rank: 3</Option>
              <Option value="4">Rank: 4</Option>
              <Option value="5">Rank: 5</Option>
            </Select>
          </label>
          <label htmlFor="locations" className="labels">
            Location
            <br></br>
            <SearchBar className="form-inputs" setUsState={setUsState} />{' '}
          </label>
          <label htmlFor="categories" className="labels">
            Category
            <br></br>
            <AutoComplete
              value={value}
              options={categoriesData}
              onSelect={onCategorySelect}
              onChange={onCategoryChange}
              allowClear={true}
              filterOption={filterOption}
              placeholder="Browse Categories"
              notFoundContent="Category Not Found"
              id="categories"
              className="form-inputs"
            />
            {activeCategories &&
              activeCategories.map(tag => {
                return (
                  <CheckableTag
                    style={{
                      marginTop: 3,
                      backgroundColor: '#003767',
                    }}
                    key={tag}
                    checked={activeCategories.indexOf(tag) > -1}
                    onChange={checked => onToggle(tag, checked)}
                  >
                    {tag}
                  </CheckableTag>
                );
              })}
          </label>
          <label htmlFor="dates" className="labels">
            Date
            <br></br>
            <RangePicker
              onCalendarChange={onDateSelection}
              className="form-inputs"
            />
          </label>
        </form>
        <div className="buttonbutton">
          <div className="export-button">
            <div className="list-items-count">
              <br />
              <label>Items in the main list: {rec.length}</label>
            </div>
            <Button
              type="primary"
              style={{
                backgroundColor: '#003767',
                border: 'none',
                marginTop: 5,
              }}
            >
              <CSVLink {...csvReport} target="_blank">
                {/* exports CSV file */}
                Export List
              </CSVLink>
            </Button>
          </div>
          <br />
          <div className="additional-list">
            <label>Items in the secondary list: {added.length}</label>
            <Button
              type="primary"
              disabled={added.length === 0}
              style={{
                backgroundColor: added.length === 0 ? '#F5F5F5' : '#003767',
                border: 'none',
                marginTop: 5,
              }}
            >
              <CSVLink {...markedReport} target="_blank">
                Export Secondary List
              </CSVLink>
            </Button>
            <Button
              onClick={clearList}
              disabled={added.length === 0}
              className="clear-button"
              style={{
                backgroundColor: added.length === 0 ?? 'transparent',
                border: 'none',
              }}
            >
              Clear List
            </Button>
          </div>
        </div>
      </div>

      <div className="incidents-container">
        <h1>Report Results</h1>
        {data.length ? (
          <Collapse key={nanoid()} className="collapse">
            {currentPosts.map(incident => {
              return (
                <Panel
                  header={header(incident)}
                  className="panel"
                  expandIconPosition="left"
                  key={incident.incident_id}
                >
                  <div className="collapse-content">
                    <p className="collapse-content-p">{incident.description}</p>
                    <div className="bottom-container">
                      <Popover
                        content={sourceListHelper(incident?.src)}
                        placement="rightTop"
                      >
                        <Button
                          type="primary"
                          style={{
                            backgroundColor: '#003767',
                            border: 'none',
                          }}
                        >
                          Sources
                        </Button>
                      </Popover>
                      <div className="tags-container">
                        {incident.tags.map(i => {
                          return <Tag key={i}>{i}</Tag>;
                        })}
                      </div>
                    </div>
                  </div>
                </Panel>
              );
            })}
          </Collapse>
        ) : (
          noDataDisplay()
        )}

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
    </div>
  );
};

export default Incidents;
