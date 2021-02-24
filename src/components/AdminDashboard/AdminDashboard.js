import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PendingIncident from './PendingIncident';

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
  const [confirmReject, setConfirmReject] = useState(false);

  const [unapprovedIncidents, setUnapprovedIncidents] = useState([]);

  const [adding, setAdding] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/dashboard/incidents`)
      .then(res => {
        setUnapprovedIncidents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
      setSelected(currentSet.map(data => data.twitter_incident_id));
    } else {
      setSelected([]);
    }
  };

  const changeSelected = incident => {
    if (selected.includes(incident.twitter_incident_id)) {
      const newSelected = selected.filter(id => {
        return id !== incident.twitter_incident_id;
      });
      setSelected(newSelected);
    } else {
      setSelected([...selected, incident.twitter_incident_id]);
    }
  };

  //   approving/rejecting incidents
  const confirmApproveHandler = evt => {
    evt.preventDefault();
    setConfirmApprove(true);
  };

  const confirmRejectHandler = evt => {
    evt.preventDefault();
    setConfirmReject(true);
  };

  const approveHandler = evt => {
    evt.preventDefault();
    const reviewedIncidents = sortApproved();
    putIncidents(reviewedIncidents, true);
    if (
      pageNumber >
      Math.ceil(unapprovedIncidents.length / incidentsPerPage) - 1
    ) {
      setPageNumber(pageNumber - 1);
    }
  };

  const rejectHandler = evt => {
    evt.preventDefault();
    const reviewedIncidents = sortApproved();
    putIncidents(reviewedIncidents, false);
    if (
      pageNumber >
      Math.ceil(unapprovedIncidents.length / incidentsPerPage) - 1
    ) {
      setPageNumber(pageNumber - 1);
    }
  };

  const confirmCancel = evt => {
    evt.preventDefault();
    setConfirmApprove(false);
    setConfirmReject(false);
  };

  const sortApproved = () => {
    const approvedData = [];
    const unapprovedData = [];
    unapprovedIncidents.forEach(dataObj => {
      if (selected.includes(dataObj.twitter_incident_id)) {
        approvedData.push(dataObj);
      } else {
        unapprovedData.push(dataObj);
      }
    });

    setAllSelected(false);
    setSelected([]);
    setConfirmApprove(false);
    setUnapprovedIncidents(unapprovedData);

    return approvedData;
  };

  const putIncidents = (incidents, approved) => {
    incidents.forEach(incident => {
      let updatedIncident;
      if (approved) {
        updatedIncident = { ...incident, pending: false, rejected: false };
      } else {
        updatedIncident = { ...incident, pending: false, rejected: true };
      }
      console.log(updatedIncident);
      axios
        .put(
          `${process.env.REACT_APP_BACKENDURL}/dashboard/incidents/${incident.twitter_incident_id}`,
          updatedIncident
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    });
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

  const toggleAddIncident = evt => {
    evt.preventDefault();
    setAdding(true);
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <button onClick={toggleAddIncident}>
        {adding ? 'Dashboard' : 'Add Incident'}
      </button>
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
            !confirmApprove && !confirmReject
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
                  onClick={confirmApprove ? approveHandler : rejectHandler}
                  className="approve-reject-select"
                >
                  Yes
                </button>
              )}
              {!confirmApprove ? (
                <button
                  disabled={selected.length < 1}
                  onClick={confirmRejectHandler}
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
                Page {unapprovedIncidents.length === 0 ? '0' : pageNumber} of{' '}
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
                  key={incident.twitter_incident_id}
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
