import React, { useState } from 'react';
import ApprovedIncident from './ApprovedIncident';
import { DoubleRightOutlined } from '@ant-design/icons';
import { DoubleLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

const ApprovedIncidents = ({ incidents }) => {
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(5);
  const [page, setPage] = useState(1);

  const handleForwardClick = () => {
    setPageStart(pageStart + 5);
    setPageEnd(pageEnd + 5);
    setPage(page + 1);
  };

  const handleBackClick = () => {
    setPageStart(pageStart - 5);
    setPageEnd(pageEnd - 5);
    setPage(page - 1);
  };
  console.log(pageStart, pageEnd);

  return (
    <>
      <div className="column-headers">
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
        <DoubleLeftOutlined onClick={handleBackClick}>
          Previous Page
        </DoubleLeftOutlined>
        <p className="page-number-display">{`Page ${page} of ${Math.ceil(
          incidents.length / 5
        )}`}</p>
        <DoubleRightOutlined onClick={handleForwardClick}>
          Next Page
        </DoubleRightOutlined>
      </div>
    </>
  );
};

export default ApprovedIncidents;
