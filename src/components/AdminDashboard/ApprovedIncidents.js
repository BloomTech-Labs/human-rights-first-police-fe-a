import React, { useState } from 'react';
// import ApprovedIncident from './ApprovedIncident';
import { DoubleRightOutlined } from '@ant-design/icons';
import { DoubleLeftOutlined } from '@ant-design/icons';
import SearchBar from '../graphs/searchbar/SearchBar';
import AntTable from './AntTableComponents/AntTable';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const ApprovedIncidents = ({ incidents }) => {
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(5);
  const [page, setPage] = useState(1);
  const [usState, setUsState] = useState(null);

  const onDateSelection = (dates, dateStrings) => {};

  return (
    <>
      <SearchBar setUsState={setUsState} />
      <RangePicker onCalendarChange={onDateSelection} />
      <AntTable approvedIncidents={incidents} />
    </>
  );
};

export default ApprovedIncidents;
