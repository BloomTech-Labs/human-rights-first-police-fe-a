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
  const [incidentsPerPage, setIncidentsPerPage] = useState(
    2
  ); /*<---!!!!!change this eventually!!!!!*/
  const [currentSet, setCurrentSet] = useState([]);

  //   setting state for confirmation buttons of confirming/rejecting
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);

  // setting state for unapproved/pending incidents from the database
  const [unapprovedIncidents, setUnapprovedIncidents] = useState([]);

  // setting state to toggle whether or not the modal pop up (addIncident) is rendered
  const [adding, setAdding] = useState(false);

  // getting unapproved/pending incidents from the database
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
    setAllSelected(!allSelected);
    if (!allSelected) {
      setSelected(currentSet.map(data => data.server_id));
    } else {
      setSelected([]);
    }
  };

  const changeSelected = incident => {
    if (selected.includes(incident.server_id)) {
      const newSelected = selected.filter(id => {
        return id !== incident.server_id;
      });
      setSelected(newSelected);
    } else {
      setSelected([...selected, incident.server_id]);
    }
  };

  //   approving/rejecting incidents
  const sortApproved = () => {
    const approvedData = [];
    const unapprovedData = [];
    unapprovedIncidents.forEach(dataObj => {
      if (selected.includes(dataObj.server_id)) {
        approvedData.push(dataObj);
      } else {
        unapprovedData.push(dataObj);
      }
    });

    setAllSelected(false);
    setSelected([]);
    setConfirmApprove(false);
    setConfirmReject(false);
    setUnapprovedIncidents(unapprovedData);

    return approvedData;
  };

  const putIncidents = (incidents, approved) => {
    incidents.forEach(incident => {
      let updatedIncident;
      if (approved) {
        updatedIncident = {
          ...incident,
          approved,
          pending: false,
          rejected: false,
        };
      } else {
        updatedIncident = {
          ...incident,
          approved,
          pending: false,
          rejected: true,
        };
      }
      axios
        .put(
          `${process.env.REACT_APP_BACKENDURL}/dashboard/incidents/${incident.server_id}`,
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
    if (pageNumber < Math.ceil(unapprovedIncidents.length / incidentsPerPage)) {
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

  console.log(unapprovedIncidents);

  return (
    <div className="dashboard-container">
      <h2 id="admin-dashboard-title">Admin Dashboard</h2>

      <div className="statboxes">
        <div className="statbox">
          <p>
            There are currently {unapprovedIncidents.length} unapproved
            incidents are awaiting your review. 'Select All' to approve all
            incidents with the click of a button or alternatively, select 'More
            Info' to inspect, edit, approve or disapprove incidents 1 by 1.{' '}
          </p>
          <p>
            You can manually create an incident by using the 'Create New
            Incident' button
          </p>
        </div>
      </div>
      <div className="confirmation-message-div">
        <div className="incidents-wrap">
          <button id="create-incident-button" onClick={toggleAddIncident}>
            Create New Incident
          </button>
        </div>
      </div>
      {adding ? (
        <AddIncident setAdding={setAdding} />
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
                  onClick={confirmApprove ? approveHandler : rejectHandler}
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
                <option value="2">2</option>
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
                  confirmApprove={confirmApprove}
                  key={incident.server_id}
                  incident={incident}
                  selected={selected}
                  changeSelected={changeSelected}
                  setUnapprovedIncidents={setUnapprovedIncidents}
                  unapprovedIncidents={unapprovedIncidents}
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
                pageNumber ===
                Math.ceil(unapprovedIncidents.length / incidentsPerPage)
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
//remove this comment
export default AdminDashboard;
