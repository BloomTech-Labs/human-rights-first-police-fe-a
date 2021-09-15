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
  getLatAndLong,
} from '../../utils/DashboardHelperFunctions.js';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import IncidentStatus from './IncidentStatus';

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

  // resets the selected incidents when switching from approved to unapproved page
  useEffect(() => {
    setSelected([]);
    setAllSelected(false);
  }, [listType]);

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

  const approveAndRejectHandler = async (evt, newStatus) => {
    const [reviewedIncidents, unreviewedIncidents] = sortApproved(
      currList,
      selected
    );
    // MVP: One-by-one approvals. Needs work for multiple approvals simultaneously
    const latAndLong = await getLatAndLong(reviewedIncidents[0]);
    reviewedIncidents[0].lat = latAndLong[0];
    reviewedIncidents[0].long = latAndLong[1];

    putIncidents(oktaAxios, reviewedIncidents, newStatus);

    if (listType === 'unapproved') {
      setUnapprovedIncidents(unreviewedIncidents);
    }

    else if (listType === 'form-responses') {
      //did 'else if' incase we wanted to add Reject button to Approved list
      setFormResponses(unreviewedIncidents);
    }

    else if (listType === 'approved') {

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
            Pending Incidents
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

      <div className="dashboard-container">
        <DashboardTop
          unapprovedIncidents={unapprovedIncidents}
          toggleAddIncident={toggleAddIncident}
          listType={listType}
        />

        <IncidentStatus
          visible={selected.length > 0}
          currentStatus={listType === 'unapproved' ? 'pending' : 'approved'}
          onStatusConfirm={approveAndRejectHandler}
        />

        {adding &&
          <AddIncident
            setPageNumber={setPageNumber}
            getData={getData}
            setAdding={setAdding}
          />
        }

        {listType === 'unapproved' &&
          <Incidents
            confirmApprove={confirmApprove}
            confirmReject={confirmReject}
            confirmApproveHandler={confirmApproveHandler}
            confirmRejectHandler={confirmRejectHandler}
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
        }

        {listType === 'approved' && (
          <ApprovedIncidents
            incidents={incidents}
            formResponses={formResponses}
            setSelected={setSelected}
            selected={selected}
            selectAll={selectAll}
            allSelected={allSelected}
            setCurrList={setCurrList}
            currentSet={currentSet}
            confirmApproveHandler={confirmApproveHandler}
          />
        )}
      </div>

      {listType === 'form-responses' &&
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
      }
    </>
  );
};
export default AdminDashboard;
