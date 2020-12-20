import React, { useEffect, useState } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import IncidentsCard from '../incidents/IncidentsCard';
import { newData, filterDataByState } from '../incidents/IncidentFilter';
import { nanoid } from 'nanoid';
import { Pagination } from 'antd';
import './Incidents.css';

import SearchBar from '../graphs/searchbar/SearchBar';
import { stateData } from '../graphs/assets/bargraphAssets';

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
      setData(newData(dataQuery.data));
  }, [dataQuery.isLoading, dataQuery.isError, dataQuery.data]);

  useEffect(() => {
    usState === null
      ? setData(newData(incidents))
      : setData(filterDataByState(data, usState));
  }, [usState]);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const onChange = page => {
    setCurrentPage(page);
  };
  console.log(data);

  return (
    <>
      <div className="incidentsApp">
        <h1 className="expandedHeader"> Expanded Timeline of Events </h1>
        <SearchBar setUsState={setUsState} />

        <section>
          <ul>
            {currentPosts.map(incident => {
              return <IncidentsCard key={nanoid()} incident={incident} />;
            })}
          </ul>
        </section>
      </div>
      <Pagination
        onChange={onChange}
        current={currentPage}
        pageSize={itemsPerPage}
        total={data.length}
        showSizeChanger={false}
      />
    </>
  );
};

export default Incidents;
