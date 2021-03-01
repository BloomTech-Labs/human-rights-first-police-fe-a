import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PendingIncident from './PendingIncident';
import AddIncident from './AddIncident';

import { DoubleRightOutlined } from '@ant-design/icons';
import { DoubleLeftOutlined } from '@ant-design/icons';

const AdminDashboard = () => {
  // setting up local state to keep track of selected/"checked" incidents
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  //   setting state necessary for pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [incidentsPerPage, setIncidentsPerPage] = useState(5);
  const [currentSet, setCurrentSet] = useState([]);

  //   setting state for confirmation buttons of confirming/rejecting
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);

  // setting state for unapproved/pending incidents from the database
  const [unapprovedIncidents, setUnapprovedIncidents] = useState([]);

  // setting state to toggle whether or not the modal pop up (addIncident) is rendered
  const [adding, setAdding] = useState(false);

  const lastPage = Math.ceil(unapprovedIncidents.length / incidentsPerPage);

  console.log(unapprovedIncidents);
  console.log(unapprovedIncidents.filter(inc => inc.coordinates));

  // getting unapproved/pending incidents from the database
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/dashboard/incidents`)
      .then(res => {
        setUnapprovedIncidents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  console.log(unapprovedIncidents);

  // setting up pagination display on dashboard
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
    if (!confirmApprove && !confirmReject) {
      setAllSelected(!allSelected);
      if (!allSelected) {
        setSelected(...currentSet);
      } else {
        setSelected([]);
      }
    }
  };

  const changeSelected = incident => {
    if (!confirmApprove && !confirmReject) {
      if (selected.includes(incident.id)) {
        const newSelected = selected.filter(id => {
          return id !== incident.id;
        });
        setSelected(newSelected);
      } else {
        setSelected([...selected, incident.id]);
      }
    }
  };

  //   approving/rejecting incidents
  const sortApproved = () => {
    const reviewedData = [];
    const unreviewedData = [];
    unapprovedIncidents.forEach(dataObj => {
      if (selected.includes(dataObj.id)) {
        reviewedData.push(dataObj);
      } else {
        unreviewedData.push(dataObj);
      }
    });
    return [reviewedData, unreviewedData];
  };

  const putIncidents = (incidents, approved) => {
    const reviewedIncidents = incidents.map(incident => {
      return {
        ...incident,
        approved,
        pending: false,
        rejected: !approved,
      };
    });
    // incidents.forEach(incident => {
    //   let updatedIncident = {
    //     ...incident,
    //     approved,
    //     pending: false
    //   };
    //   if (approved) {
    //     updatedIncident.rejected = false;
    //   } else {
    //     updatedIncident.rejected = true;
    //   }

    axios
      .put(
        `${process.env.REACT_APP_BACKENDURL}/dashboard/incidents`,
        reviewedIncidents
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const approveAndRejectHandler = evt => {
    evt.preventDefault();
    const [reviewedIncidents, unreviewedIncidents] = sortApproved();
    putIncidents(reviewedIncidents, confirmApprove);
    setUnapprovedIncidents(unreviewedIncidents);
    setAllSelected(false);
    setSelected([]);
    setConfirmApprove(false);
    setConfirmReject(false);
    if (pageNumber > lastPage) {
      setPageNumber(pageNumber - 1);
    }
  };

  // const rejectHandler = evt => {
  //   evt.preventDefault();
  //   const reviewedIncidents = sortApproved();
  //   putIncidents(reviewedIncidents, false);
  //   if (pageNumber > lastPage - 1) {
  //     setPageNumber(pageNumber - 1);
  //   }
  // };

  // toggling confirmation of approve/reject buttons
  const confirmApproveHandler = evt => {
    evt.preventDefault();
    setConfirmApprove(true);
  };

  const confirmRejectHandler = evt => {
    evt.preventDefault();
    setConfirmReject(true);
  };

  const confirmCancel = evt => {
    evt.preventDefault();
    setConfirmApprove(false);
    setConfirmReject(false);
  };

  //   pagination functions
  const handleNextClick = evt => {
    evt.preventDefault();
    if (pageNumber < lastPage) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleBackClick = evt => {
    evt.preventDefault();
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handlePerPageChange = evt => {
    evt.preventDefault();
    setIncidentsPerPage(Number(evt.target.value));
    setPageNumber(1);
  };

  // toggling rendering of AddIncident pop up modal
  const toggleAddIncident = evt => {
    evt.preventDefault();
    setAdding(true);
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
        <div className="incidents-wrap">
          <h3>Incidents</h3>
          <button id="create-incident-button" onClick={toggleAddIncident}>
            Create New Incident
          </button>
        </div>
      </div>
      {adding ? (
        <AddIncident
          setPageNumber={setPageNumber}
          getData={getData}
          setAdding={setAdding}
        />
      ) : (
        <>
          <div className="dashboard-top-flex">
            <div className="dashboard-top-input">
              <input
                type="checkbox"
                name="select-all"
                onChange={confirmApprove ? () => {} : selectAll}
                checked={allSelected}
              />
              <label id="select-all-label" htmlFor="select-all">
                Select All{' '}
              </label>
            </div>

            <div className="dashboard-top-approve-reject">
              {!confirmApprove && !confirmReject ? (
                <button
                  disabled={selected.length < 1}
                  onClick={confirmApproveHandler}
                  className={
                    selected.length > 0
                      ? 'approve-reject-select'
                      : 'hidden-button'
                  }
                >
                  Approve
                </button>
              ) : (
                <button
                  onClick={approveAndRejectHandler}
                  className={
                    selected.length > 0
                      ? 'approve-reject-select'
                      : 'hidden-button'
                  }
                >
                  Yes
                </button>
              )}
              {!confirmApprove && !confirmReject ? (
                <button
                  disabled={selected.length < 1}
                  onClick={confirmRejectHandler}
                  className={
                    selected.length > 0
                      ? 'approve-reject-select'
                      : 'hidden-button'
                  }
                >
                  Reject
                </button>
              ) : (
                <button
                  onClick={confirmCancel}
                  className={
                    selected.length > 0
                      ? 'approve-reject-select'
                      : 'hidden-button'
                  }
                >
                  No
                </button>
              )}
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
            <div className="dashboard-top-page-number">
              <label id="items-per-page" htmlFor="per-page-selector">
                Items Per Page
              </label>
              <select
                className="items-pp-select"
                name="per-page-selector"
                onChange={handlePerPageChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>

          <div className="column-headers">
            <input className="hidden-input" type="checkbox" />
            <div className="column-headers-flex">
              <h4 className="description">Description</h4>
              <h4 className="location">Location</h4>
              <h4 className="date">Date</h4>
            </div>
          </div>

          <div className="incidents">
            {currentSet.map(incident => {
              return (
                <PendingIncident
                  getData={getData}
                  confirmApprove={confirmApprove}
                  key={incident.incident_id}
                  incident={incident}
                  selected={selected}
                  changeSelected={changeSelected}
                  setUnapprovedIncidents={setUnapprovedIncidents}
                  unapprovedIncidents={unapprovedIncidents}
                  setPageNumber={setPageNumber}
                />
              );
            })}
          </div>
          <div className="pagination">
            <DoubleLeftOutlined
              onClick={handleBackClick}
              className={
                pageNumber === 1 ? 'prev-arrow shaded-arrow' : 'prev-arrow'
              }
            >
              Previous Page
            </DoubleLeftOutlined>
            <p className="page-number-display">
              Page {unapprovedIncidents.length === 0 ? '0' : pageNumber} of{' '}
              {Math.ceil(unapprovedIncidents.length / incidentsPerPage)}
            </p>
            <DoubleRightOutlined
              className={
                pageNumber === lastPage
                  ? 'next-arrow shaded-arrow'
                  : 'next-arrow'
              }
              onClick={handleNextClick}
            >
              Next Page
            </DoubleRightOutlined>
          </div>
        </>
      )}
    </div>
  );
};
export default AdminDashboard;
