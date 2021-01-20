import React, { useState, useContext, useEffect } from 'react';
import { useIncidents } from '../../../state/query_hooks/useIncidents';
import {
  ContextFilterData,
  ContextDates,
  ContextSearchText,
} from '../../Store';
import {
  filterDataByState,
  filterDataByDate,
  createRange,
} from '../../incidents/IncidentFilter';
import { Input, DatePicker } from 'antd';
import { newData } from '../GetFunctions';

import { DateTime } from 'luxon';

const { Search } = Input;
const { RangePicker } = DatePicker;

const SearchHeader = () => {
  const [filterDataList, setFilterDataList] = useContext(ContextFilterData);

  const [search, setSearch] = useState('');
  const [dates, setDates] = useContext(ContextDates);
  const [searchText, setSearchText] = useContext(ContextSearchText);
  const [usState, setUsState] = useState(null);
  // load incident data using custom react-query hook (see state >> query_hooks)
  const incidentsQuery = useIncidents();

  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];
  // console.log(incidentsQuery)

  const dataList = newData(incidents);

  //List everything to exclude with filtering
  const exclude = ['incident_id'];
  //////////// Set up Search Filter
  const filterData = value => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === '') setFilterDataList([]);
    else {
      const filteredData = dataList.filter(item => {
        return Object.keys(item).some(key =>
          exclude.includes(key)
            ? false
            : item[key]
                .toString()
                .toLowerCase()
                .includes(lowercasedValue)
        );
      });

      setFilterDataList(filteredData);
    }
  };

  const onSearch = value => {
    setSearchText(value);
    filterData(value);
  };
  ///////// Set up Date Selector

  // const range = dates && createRange(dates);

  useEffect(() => {
    const range = dates && createRange(dates);

    if (usState && dates) {
      const copyOfData = [...incidents];
      let filteredData = filterDataByState(copyOfData, usState);
      let dateAndStateFilteredData = filterDataByDate(filteredData, range);

      setFilterDataList(dateAndStateFilteredData);
    } else if (usState && !dates) {
      const copyOfData = [...incidents];
      let filteredByState = filterDataByState(copyOfData, usState);
      setFilterDataList(filteredByState);
    } else if (!usState && dates) {
      const copyOfData = [...incidents];

      let filteredByDate = filterDataByDate(copyOfData, range);
      setFilterDataList(filteredByDate);
    } else {
      setFilterDataList(dataList);
    }
  }, [usState, dates]);

  const onDateSelection = (dates, dateStrings) => {
    setDates(
      dateStrings[0] && dateStrings[1]
        ? [DateTime.fromISO(dateStrings[0]), DateTime.fromISO(dateStrings[1])]
        : null
    );
  };

  return (
    <div>
      <div className="search-header">
        <Search
          style={{ color: 'white' }}
          placeholder="Location, Type, etc..."
          enterButton="Search"
          onSearch={onSearch}
        />
        <RangePicker onCalendarChange={onDateSelection} />
      </div>
    </div>
  );
};

export default SearchHeader;
