import React, { useState } from 'react';
// import ApprovedIncident from './ApprovedIncident';
import { DoubleRightOutlined } from '@ant-design/icons';
import { DoubleLeftOutlined } from '@ant-design/icons';
import SearchBar from '../graphs/searchbar/SearchBar';
import AntTable from './AntTableComponents/AntTable';
import { DatePicker } from 'antd';
import { putIncidents } from '../../utils/DashboardHelperFunctions';
import useOktaAxios from '../../hooks/useOktaAxios';
const { RangePicker } = DatePicker;

const ApprovedIncidents = (props) => {
  const {
    setSelected,
    selected,
    allSelected,
    incidents,
    disapproveIncidents,
    setCurrList,
    formResponses
  } = props;

  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(5);
  const [page, setPage] = useState(1);
  const [usState, setUsState] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  const onDateSelection = (dates, dateStrings) => { };

  const oktaAxios = useOktaAxios();

  const disapproveOnClick = (e) => {
    e.preventDefault();
    setIsConfirming(true);
  };

  const cancelOnClick = (e) => {
    e.preventDefault();
    setIsConfirming(false);
  };

  return (
    <>
      <SearchBar setUsState={setUsState} />
      <RangePicker onCalendarChange={onDateSelection} />
      <AntTable
        approvedIncidents={incidents}
        formResponses={formResponses}
        selected={selected}
        setSelected={setSelected}
        setCurrList={setCurrList} />
    </>
  );
};

export default ApprovedIncidents;
