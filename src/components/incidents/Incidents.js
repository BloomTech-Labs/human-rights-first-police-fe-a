import React, { useState } from 'react';
import { useIncidents } from '../../state/query_hooks/useIncidents';
import IncidentsCard from '../incidents/IncidentsCard';
import { newData } from '../incidents/IncidentFilter';
import { nanoid } from 'nanoid';
import { Pagination } from 'antd';
import './Incidents.css';

const Incidents = () => {
  const [itemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const dataQuery = useIncidents();

  const incidents = dataQuery.data && !dataQuery.isError ? dataQuery.data : [];

  const data = newData(incidents);

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  const onChange = page => {
    setCurrentPage(page);
  };
  console.log(data);

  return (
    <>
      <div>
        <h1> Expanded Timeline of Events </h1>
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
      />
    </>
  );
};

export default Incidents;
