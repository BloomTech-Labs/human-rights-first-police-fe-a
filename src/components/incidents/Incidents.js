import React, { useEffect, useState } from 'react';
import './Incidents.css';
import sourceListHelper from '../../utils/sourceListHelper';
import {
  falsiesRemoved,
  filterDataByState,
  filterDataByDate,
  createRange,
  filterByTags,
} from '../incidents/IncidentFilter';
import { nanoid } from 'nanoid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Empty, Button, Collapse, Tag, Checkbox, Popover, Select } from 'antd';

// Time Imports
import { DateTime } from 'luxon';

// Search Bar
import SearchBar from '../graphs/searchbar/SearchBar';

// Ant Design Imports:
import { Pagination, DatePicker } from 'antd';

let ranks = [
  'Rank 1 - Police Presence',
  'Rank 2 - Empty-hand',
  'Rank 3 - Blunt Force',
  'Rank 4 - Chemical & Electric',
  'Rank 5 - Lethal Force',
];

const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const { Option } = Select;
const { CheckableTag } = Tag;

const Incidents = () => {
  const [itemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  // Data State
  const [usState, setUsState] = useState(null);
  const [dates, setDates] = useState(null);
  const [data, setData] = useState([]); // State for User Searches
  const [selectedTags, setSelectedTags] = useState(['All']);
  const [queryString, setQueryString] = useState('');
  const [selectedIncidents, setSelectedIncidents] = useState([]);
  const [rank, setRank] = useState('Any');
  // Get incident data from Redux
  const incidents = useSelector(state => Object.values(state.incident.data));
  const tagIndex = useSelector(state => Object.keys(state.incident.tagIndex));
  const fetchStatus = useSelector(
    state => state.api.incidents.getincidents.status
  );

  const header = incident => {
    return (
      <div className="header-top">
        <p>{incident.title}</p>
        <div className="extra">
          <div className="tag-group">
            <Tag>{incident.categories[0]}</Tag>
            <Tag>{incident.categories[1]}</Tag>
            <Tag>{incident.categories[2]}</Tag>
          </div>
          <div>
            <Tag>{incident.force_rank.slice(0, 6)}</Tag>
          </div>

          <div className="incidentDate">
            <p>{incident.city}, </p>
            <p className="panel-date">
              {DateTime.fromISO(incident.date)
                .plus({ days: 1 })
                .toLocaleString(DateTime.DATE_MED)}
            </p>
          </div>

          <Checkbox
            checked={selectedIncidents.indexOf(incident.id) > -1}
            onChange={checked => onSelect(incident.id, checked)}
          >
            Add To List
          </Checkbox>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const range = dates && createRange(dates);
    let filtered = [...incidents];

    if (selectedTags.indexOf('All') === -1) {
      console.log('test');
      filtered = filterByTags(filtered, selectedTags);
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
    if (rank !== 'Any') {
      console.log(rank);
      filtered = incidents.filter(incident => {
        return incident.force_rank.trim() === ranks[parseInt(rank) - 1].trim();
      });
    }
    setData(falsiesRemoved(filtered));
  }, [usState, dates, selectedTags, rank]);

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
      ? [...selectedTags, tag]
      : selectedTags.filter(t => t !== tag || t === 'All');
    if (tag === 'All') {
      setSelectedTags(['All']);
      return;
    }
    if (nextSelectedTags[0] === 'All') {
      setSelectedTags(nextSelectedTags.slice(1));
      return;
    }
    setSelectedTags(nextSelectedTags);
  };

  const onRank = e => {
    setRank(e);
  };
  const downloadCSV = () => {
    console.log(
      `${
        process.env.REACT_APP_BACKENDURL
      }/incidents/download?rank=${rank}${queryString}${`&ids=${selectedIncidents.join(
        ','
      )}`}`
    );
    axios
      .get(
        `${
          process.env.REACT_APP_BACKENDURL
        }/incidents/download?rank=${rank}${queryString}${`&ids=${selectedIncidents.join(
          ','
        )}`}`
      )
      .then(response => {
        console.log(response);
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(
          new Blob([response.data], { type: 'application/octet-stream' })
        );
        link.download = 'reports.csv';

        document.body.appendChild(link);

        link.click();
        setTimeout(function() {
          window.URL.revokeObjectURL(link);
        }, 200);
      })
      .catch(error => {});
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
          <form className="export-form">
            <fieldset className="form-top">
              <label>
                Rank:
                <Select
                  onChange={onRank}
                  showSearch
                  defaultValue="All"
                  className="rank-select"
                  style={{ width: 120 }}
                >
                  <Option value="All">All</Option>
                  <Option value="1">Rank: 1</Option>
                  <Option value="2">Rank: 2</Option>
                  <Option value="3">Rank: 3</Option>
                  <Option value="4">Rank: 4</Option>
                  <Option value="5">Rank: 5</Option>
                </Select>
              </label>

              <label>
                Location: <SearchBar setUsState={setUsState} />{' '}
              </label>

              <label>
                Date: <RangePicker onCalendarChange={onDateSelection} />
              </label>

              <Button onClick={downloadCSV} type="primary">
                Export List
              </Button>
            </fieldset>
            <fieldset className="form-bottom">
              <label>
                Categories:
                <Tag.CheckableTag
                  key={'All'}
                  checked={selectedTags.indexOf('All') > -1}
                  onChange={checked => onToggle('All', checked)}
                >
                  All
                </Tag.CheckableTag>
                {tagIndex.map(tag => {
                  return (
                    <CheckableTag
                      key={tag}
                      checked={selectedTags.indexOf(tag) > -1}
                      onChange={checked => onToggle(tag, checked)}
                    >
                      {tag}
                    </CheckableTag>
                  );
                })}
              </label>
            </fieldset>
          </form>
        </header>
        <section>
          {data.length ? (
            <Collapse key={nanoid()} className="collapse">
              {currentPosts.map(incident => {
                return (
                  <Panel
                    header={header(incident)}
                    className="panel"
                    expandIconPosition="left"
                    key={incident.id}
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
