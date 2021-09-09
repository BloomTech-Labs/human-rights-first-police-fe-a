import React, { useState, useEffect } from 'react';

import AddIncident from './AddIncident';
import DashboardTop from './DashboardTop';
import Incidents from './Incidents';
import ApprovedIncidents from './ApprovedIncidents';
import './AdminDashboard.css';
import { Modal } from './Modal';
import useOktaAxios from '../../hooks/useOktaAxios';

import {
  getData,
  sortApproved,
  putIncidents,
} from '../../utils/DashboardHelperFunctions.js';

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
  const [confirmStatus, setConfirmStatus] = useState('pending');
  const [currList, setCurrList] = useState([]);

  // setting state for unapproved/pending incidents from the database
  const [unapprovedIncidents, setUnapprovedIncidents] = useState([]);

  //setting state for form-response incidents from DS database
  const [formResponses, setFormResponses] = useState([]);

  // setting state to toggle whether or not the modal pop up (addIncident) is rendered
  const [adding, setAdding] = useState(false);

  // setting state to change between approved and unapproved incidents
  const [listType, setListType] = useState('unapproved');

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

  const oktaAxios = useOktaAxios();

  // getting unapproved/pending incidents from the database
  useEffect(() => {
    getData(oktaAxios, setUnapprovedIncidents);
  }, []);

  // getting approved incidents from database
  useEffect(() => {
    oktaAxios
      .get('/dashboard/incidents/approved')
      .then(res => {
        setIncidents(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // getting form-responses from DS database
  useEffect(() => {
    axios
      .get(
        'http://hrf-bw-labs37-dev.eba-hz3uh94j.us-east-1.elasticbeanstalk.com/to-approve'
      )
      .then(res => {
        setFormResponses(res.data);
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
      setSelected(currentSet.map(data => data.incident_id));
    } else {
      setSelected([]);
    }
  };

  const approveAndRejectHandler = evt => {
    evt.preventDefault();
    const [reviewedIncidents, unreviewedIncidents] = sortApproved(
      currList,
      selected
    );
    putIncidents(oktaAxios, reviewedIncidents, confirmStatus);
    if (listType === 'unapproved') {
      setUnapprovedIncidents(unreviewedIncidents);
    } else if (listType === 'form-responses') {
      //did 'else if' incase we wanted to add Reject button to Approved list
      setFormResponses(unreviewedIncidents);
    }
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
    setConfirmStatus('approved');
  };

  const confirmRejectHandler = evt => {
    evt.preventDefault();
    setConfirmReject(true);
    setConfirmStatus('rejected');
  };

  const confirmCancel = evt => {
    evt.preventDefault();
    setConfirmApprove(false);
    setConfirmReject(false);
    setConfirmStatus('pending');
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
          <button
            className="approve-btn"
            onClick={() => setListType('unapproved')}
          >
            Unapproved Incidents
          </button>
          <button
            className="approve-btn"
            onClick={() => setListType('approved')}
          >
            Approved Incidents
          </button>
          <button
            className="approve-btn"
            onClick={() => setListType('form-responses')}
          >
            Form Responses
          </button>
        </div>
        <div className="logout-container">
          <button className="approve-btn" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
      {listType === 'unapproved' && (
        <div className="dashboard-container">
          <DashboardTop
            unapprovedIncidents={unapprovedIncidents}
            toggleAddIncident={toggleAddIncident}
            listType={listType}
          />

          {adding ? (
            <AddIncident
              setPageNumber={setPageNumber}
              getData={getData}
              setAdding={setAdding}
            />
          ) : (
            <Incidents
              confirmApprove={confirmApprove}
              confirmReject={confirmReject}
              confirmApproveHandler={confirmApproveHandler}
              confirmRejectHandler={confirmRejectHandler}
              approveAndRejectHandler={approveAndRejectHandler}
              confirmCancel={confirmCancel}
              setSelected={setSelected}
              selected={selected}
              selectAll={selectAll}
              allSelected={allSelected}
              handlePerPageChange={handlePerPageChange}
              currentSet={currentSet}
              setUnapprovedIncidents={setUnapprovedIncidents}
              setPageNumber={setPageNumber}
              unapprovedIncidents={unapprovedIncidents}
              setCurrList={setCurrList}
            />
          )}
        </div>
      )}
      {listType === 'approved' && (
        <>
          <div className="dashboard-container">
            <DashboardTop
              unapprovedIncidents={unapprovedIncidents}
              toggleAddIncident={toggleAddIncident}
              listType={listType}
            />
            {adding ? (
              <AddIncident
                setPageNumber={setPageNumber}
                getData={getData}
                setAdding={setAdding}
              />
            ) : (
              <ApprovedIncidents incidents={incidents} />
            )}
          </div>
        </>
      )}
      {listType === 'form-responses' && (
        <div className="dashboard-container">
          <DashboardTop
            unapprovedIncidents={unapprovedIncidents}
            toggleAddIncident={toggleAddIncident}
            listType={listType}
          />
          <Incidents
            confirmApprove={confirmApprove}
            confirmReject={confirmReject}
            confirmApproveHandler={confirmApproveHandler}
            confirmRejectHandler={confirmRejectHandler}
            approveAndRejectHandler={approveAndRejectHandler}
            confirmCancel={confirmCancel}
            setSelected={setSelected}
            selected={selected}
            selectAll={selectAll}
            allSelected={allSelected}
            handlePerPageChange={handlePerPageChange}
            currentSet={currentSet}
            setPageNumber={setPageNumber}
            formResponses={formResponses}
            setCurrList={setCurrList}
          />
        </div>
      )}
    </>
  );
};
export default AdminDashboard;
