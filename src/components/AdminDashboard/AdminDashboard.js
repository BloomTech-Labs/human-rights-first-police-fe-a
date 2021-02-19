import React, { useState, useEffect } from 'react';

import PendingIncident from './PendingIncident';

import { useIncidents } from '../../hooks/legacy/useIncidents';

import { falsiesRemoved } from '../incidents/IncidentFilter';

const AdminDashboard = () => {
  // setting up local state to keep track of selected/"checked" incidents
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  //   setting state necessary for pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [incidentsPerPage, setIncidentsPerPage] = useState(2);
  const [currentSet, setCurrentSet] = useState([]);

  //   setting state for confirmation buttons of confirming/rejecting
  const [confirmApprove, setConfirmApprove] = useState(false);

  const [unapprovedIncidents, setUnapprovedIncidents] = useState([]);

  const dataQuery = useIncidents();
  const incidents = dataQuery.data && !dataQuery.isError ? dataQuery.data : [];

  useEffect(() => {
    !dataQuery.isLoading &&
      !dataQuery.isError &&
      setUnapprovedIncidents(falsiesRemoved(incidents));
  }, [dataQuery.isLoading, dataQuery.isError, dataQuery.data]);

  useEffect(() => {
    const start = incidentsPerPage * pageNumber - incidentsPerPage;
    const newCurrentSet = unapprovedIncidents.slice(
      start,
      start + incidentsPerPage
    );
    setCurrentSet(newCurrentSet);
  }, [pageNumber, incidentsPerPage, unapprovedIncidents]);

  // incident selection (checkbox) functions
  const selectAll = () => {
    setAllSelected(!allSelected);
    if (!allSelected) {
      setSelected(currentSet.map(data => data.incident_id));
    } else {
      setSelected([]);
    }
  };

  const changeSelected = incident => {
    if (selected.includes(incident.incident_id)) {
      const newSelected = selected.filter(id => {
        return id !== incident.incident_id;
      });
      setSelected(newSelected);
    } else {
      setSelected([...selected, incident.incident_id]);
    }
  };

  //   approving/rejecting incidents
  const confirmApproveHandler = evt => {
    evt.preventDefault();
    setConfirmApprove(true);
  };

  const approveHandler = evt => {
    evt.preventDefault();
    const [approvedData, unapprovedData] = sortApproved();
    console.log(approvedData);
    setUnapprovedIncidents(unapprovedData);
    setSelected([]);
    setConfirmApprove(false);
  };

  const confirmCancel = evt => {
    evt.preventDefault();
    setConfirmApprove(false);
  };

  const sortApproved = () => {
    const approvedData = [];
    const unapprovedData = [];
    incidents.forEach(dataObj => {
      if (selected.includes(dataObj.incident_id)) {
        approvedData.push(dataObj);
      } else {
        unapprovedData.push(dataObj);
      }
    });
    return [approvedData, unapprovedData];
  };

  //   page number functions
  const handleNextClick = evt => {
    evt.preventDefault();
    setPageNumber(pageNumber + 1);
  };

  const handleBackClick = evt => {
    evt.preventDefault();
    setPageNumber(pageNumber - 1);
  };

  const handlePerPageChange = evt => {
    evt.preventDefault();
    setIncidentsPerPage(Number(evt.target.value));
    setPageNumber(1);
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <h3>Statistics</h3>

      <div className="statboxes">
        <div className="statbox">
          <p>{unapprovedIncidents.length} unapproved incidents</p>
        </div>
        <div className="statbox">
          <p>stats</p>
        </div>
        <div className="statbox">
          <p>STATS!</p>
        </div>
      </div>
      <div className="confirmation-message-div">
        <h3>Incidents</h3>
        <p
          className={
            !confirmApprove
              ? 'confirmation-message transparent'
              : 'confirmation-message'
          }
        >
          Are you sure?
        </p>
      </div>
      {unapprovedIncidents.length === 0 ? (
        <p>There are no incidents awaiting approval</p>
      ) : (
        <>
          <div className="dashboard-top-flex">
            <div className="dashboard-top-input">
              <label htmlFor="select-all">Select All </label>
              <input
                className="approve-reject-select"
                type="checkbox"
                name="select-all"
                onChange={confirmApprove ? () => {} : selectAll}
                checked={allSelected}
              />
            </div>

            <div className="dashboard-top-approve-reject">
              {!confirmApprove ? (
                <button
                  disabled={selected.length < 1}
                  onClick={confirmApproveHandler}
                  className="approve-reject-select"
                >
                  Approve
                </button>
              ) : (
                <button
                  onClick={approveHandler}
                  className="approve-reject-select"
                >
                  Yes
                </button>
              )}
              {!confirmApprove ? (
                <button
                  disabled={selected.length < 1}
                  onClick={confirmApproveHandler}
                  className="approve-reject-select"
                >
                  Reject
                </button>
              ) : (
                <button
                  onClick={confirmCancel}
                  className="approve-reject-select"
                >
                  No
                </button>
              )}
            </div>

            <div className="dashboard-top-page-number">
              <p className="page-number-display">
                Page {pageNumber} of{' '}
                {Math.ceil(unapprovedIncidents.length / incidentsPerPage)}
              </p>
              <label htmlFor="per-page-selector">Items Per Page</label>
              <select name="per-page-selector" onChange={handlePerPageChange}>
                <option value="2">2</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            <div className="dashboard-top-page-buttons">
              {pageNumber > 1 && (
                <button
                  onClick={handleBackClick}
                  className="page-number-display"
                >
                  Previous Page
                </button>
              )}

              {pageNumber <
                Math.ceil(unapprovedIncidents.length / incidentsPerPage) && (
                <button
                  onClick={handleNextClick}
                  className="page-number-display"
                >
                  Next Page
                </button>
              )}
            </div>
          </div>

          <div className="incidents">
            {currentSet.map(incident => {
              return (
                <PendingIncident
                  confirmApprove={confirmApprove}
                  key={incident.incident_id}
                  incident={incident}
                  selected={selected}
                  changeSelected={changeSelected}
                  setUnapprovedIncidents={setUnapprovedIncidents}
                  unapprovedIncidents={unapprovedIncidents}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
