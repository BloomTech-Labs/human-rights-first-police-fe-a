import React, { useState, useEffect } from 'react';

import AddIncident from './AddIncident';
import DashboardTop from './DashboardTop';
import Incidents from './Incidents';
import ApprovedIncidents from './ApprovedIncidents';
import './AdminDashboard.css';
import { Modal } from './Modal';

import {
  getData,
  sortApproved,
  putIncidents,
} from '../../utils/DashboardHelperFunctions.js';

import { DoubleRightOutlined } from '@ant-design/icons';
import { DoubleLeftOutlined } from '@ant-design/icons';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AdminDashboard = () => {
  // setting up local state to keep track of selected/"checked" incidents
  const [selected, setSelected] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [incidents, setIncidents] = useState([]);

  //   setting state necessary for pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [incidentsPerPage, setIncidentsPerPage] = useState(10);
  const [currentSet, setCurrentSet] = useState([]);

  //   setting state for confirmation buttons of confirming/rejecting
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);

  // setting state for unapproved/pending incidents from the database
  const [unapprovedIncidents, setUnapprovedIncidents] = useState([]);

  // setting state to toggle whether or not the modal pop up (addIncident) is rendered
  const [adding, setAdding] = useState(false);

  // setting state to change between approved and unapproved incidents
  const [unapproved, setUnapproved] = useState(true);

  // modal

  const [showModal, setShowModal] = useState(false);
  const HAS_VISITED_BEFORE = localStorage.getItem('hasVisitedBefore');

  //variable to push to homepage for logout button

  const { push } = useHistory();

  useEffect(() => {
    const handleShowModal = () => {
      if (HAS_VISITED_BEFORE && HAS_VISITED_BEFORE > new Date()) {
        return;
      }
      if (!HAS_VISITED_BEFORE) {
        setShowModal(true);
        let expires = new Date();
        expires = expires.setHours(expires.getHours() + 24);
        localStorage.setItem('hasVisitedBefore', expires);
      }
    };
    window.setTimeout(handleShowModal, 2000);
    window.scrollTo(0, 0);
  }, [HAS_VISITED_BEFORE]);

  const modalHandler = () => {
    setShowModal(false);
  };

  const lastPage = Math.ceil(unapprovedIncidents.length / incidentsPerPage);

  // getting unapproved/pending incidents from the database
  useEffect(() => {
    getData(setUnapprovedIncidents);
  }, []);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKENDURL}/incidents/getincidents`)
      .then(res => {
        setIncidents(res.data);
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
      setSelected(currentSet.map(data => data.id));
    } else {
      setSelected([]);
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

  const approveAndRejectHandler = evt => {
    evt.preventDefault();
    const [reviewedIncidents, unreviewedIncidents] = sortApproved(
      unapprovedIncidents,
      selected
    );
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

  const logout = () => {
    localStorage.removeItem('okta-token-storage', 'okta-cache-storage');
    push('/');
    window.location.reload();
  };

  return (
    <>
      {showModal ? <div className="back-drop"></div> : null}
      <Modal
        showModal={showModal}
        modalHandler={modalHandler}
        unapprovedIncidents={unapprovedIncidents}
      />

      <div className="dashboard-buttons-container">
        <div className="incident-btn-container">
          <button className="approve-btn" onClick={() => setUnapproved(true)}>
            Unapproved Incidents
          </button>
          <button className="approve-btn" onClick={() => setUnapproved(false)}>
            Approved Incidents
          </button>
        </div>
        <div className="logout-container">
          <button className="approve-btn" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
      {unapproved ? (
        <div className="dashboard-container">
          <DashboardTop
            unapprovedIncidents={unapprovedIncidents}
            toggleAddIncident={toggleAddIncident}
            unapproved={unapproved}
          />

          {adding ? (
            <AddIncident
              setPageNumber={setPageNumber}
              getData={getData}
              setAdding={setAdding}
            />
          ) : (
            <>
              <Incidents
                confirmApprove={confirmApprove}
                confirmReject={confirmReject}
                confirmApproveHandler={confirmApproveHandler}
                confirmRejectHandler={confirmRejectHandler}
                approveAndRejectHandler={approveAndRejectHandler}
                confirmCancel={confirmCancel}
                selected={selected}
                selectAll={selectAll}
                allSelected={allSelected}
                changeSelected={changeSelected}
                handlePerPageChange={handlePerPageChange}
                currentSet={currentSet}
                setUnapprovedIncidents={setUnapprovedIncidents}
                setPageNumber={setPageNumber}
              />
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
      ) : (
        <>
          <div className="dashboard-container">
            <DashboardTop
              unapprovedIncidents={unapprovedIncidents}
              toggleAddIncident={toggleAddIncident}
            />
            <ApprovedIncidents incidents={incidents} />
          </div>
        </>
      )}
    </>
  );
};
export default AdminDashboard;
