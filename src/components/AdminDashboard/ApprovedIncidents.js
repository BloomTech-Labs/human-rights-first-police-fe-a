import React, { useState } from 'react';
import ApprovedIncident from './ApprovedIncident';
import { DoubleRightOutlined } from '@ant-design/icons';
import { DoubleLeftOutlined } from '@ant-design/icons';
import SearchBar from '../graphs/searchbar/SearchBar';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

const ApprovedIncidents = ({ incidents }) => {
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(5);
  const [page, setPage] = useState(1);
  const [usState, setUsState] = useState(null);

  const handleForwardClick = () => {
    setPageStart(pageStart + 5);
    setPageEnd(pageEnd + 5);
    setPage(page + 1);
  };

  const handleBackClick = () => {
    if (page === 1) {
      setPage(page);
      setPageStart(0);
      setPageEnd(5);
    } else {
      setPageStart(pageStart - 5);
      setPageEnd(pageEnd - 5);
      setPage(page - 1);
    }
  };
  const onDateSelection = (dates, dateStrings) => {};

  return (
    <>
      <SearchBar setUsState={setUsState} />
      <RangePicker onCalendarChange={onDateSelection} />
      <div style={{ marginTop: 20 }} className="column-headers">
        <input className="hidden-input" type="checkbox" />
        <div className="column-headers-flex">
          <h4 className="description">Description</h4>
          <h4 className="location">Location</h4>
          <h4 className="date">Date</h4>
        </div>
      </div>

      {incidents.slice(pageStart, pageEnd).map(item => {
        return <ApprovedIncident item={item} />;
      })}
      <div className="pagination">
        <DoubleLeftOutlined
          className={page === 1 ? 'prev-arrow shaded-arrow' : 'prev-arrow'}
          onClick={handleBackClick}
        >
          Previous Page
        </DoubleLeftOutlined>
        <p className="page-number-display">{`Page ${page} of ${Math.ceil(
          incidents.length / 5
        )}`}</p>
        <DoubleRightOutlined
          className="next-arrow"
          onClick={handleForwardClick}
        >
          Next Page
        </DoubleRightOutlined>
      </div>
    </>
  );
};

export default ApprovedIncidents;
