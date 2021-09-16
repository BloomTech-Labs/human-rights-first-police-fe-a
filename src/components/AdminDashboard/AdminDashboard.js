import React, { useState, useEffect } from 'react';

import AddIncident from './AddIncident';
import DashboardTop from './DashboardTop';
import Incidents from './Incidents';
import './AdminDashboard.css';
import { Modal } from './Modal';
import useOktaAxios from '../../hooks/useOktaAxios';

import {
  getData,
  putIncidents,
  getLatAndLong,
  spliceByIds,
  getApprovedIncidents,
  getPendingIncidents,
  getFormResponses,
  splitIncidentsByIds
} from '../../utils/DashboardHelperFunctions.js';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import IncidentStatus from './IncidentStatus';

const AdminDashboard = () => {
  /** List of selected (checked) incident_ids */
  const [selectedIds, setSelectedIds] = useState([]);
  const [allSelected, setAllSelected] = useState(false);

  // the incidents that are currently displayed (filtered by status/listType)
  // const [currList, setCurrList] = useState([]);

  // The three categories of incidents
  const [formResponses, setFormResponses] = useState([]);
  const [pendingIncidents, setPendingIncidents] = useState([]);
  const [approvedIncidents, setApprovedIncidents] = useState([]);

  // The incident status type to display: 'pending', 'approved', 'form-responses'
  const [listType, setListType] = useState('pending');

  const getCurrentList = () => {
    switch (listType) {
      case 'pending':
        return pendingIncidents;
      case 'approved':
        return approvedIncidents;
      case 'form-responses':
        return formResponses;
      default:
        return [];
    }
  };

  // I can't figure out what this does, so I'm gonna take it out!
  // const [currentSet, setCurrentSet] = useState([]);

  // setting state to toggle whether or not the modal pop up (addIncident) is rendered
  const [adding, setAdding] = useState(false);

  // modal
  const [showModal, setShowModal] = useState(false);
  const HAS_VISITED_BEFORE = localStorage.getItem('hasVisitedBefore');

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
    setSelectedIds([]);
    setAllSelected(false);
  }, [listType]);

  const modalHandler = () => {
    setShowModal(false);
  };

  const oktaAxios = useOktaAxios();

  // getting all incident data
  useEffect(() => {
    getApprovedIncidents(oktaAxios)
      .then(res => setApprovedIncidents(res))
      .catch(err => console.log(err));

    getPendingIncidents(oktaAxios)
      .then(res => setPendingIncidents(res))
      .catch(err => console.log(err));

    getFormResponses(oktaAxios)
      .then(res => setFormResponses(res))
      .catch(err => console.log(err));
  }, []);

  // incident selection (checkbox) functions
  const selectAll = () => {
    setAllSelected(!allSelected);
    if (!allSelected) {
      // setSelected(currentSet.map(data => data.incident_id));
    } else {
      setSelectedIds([]);
    }
  };

  const approveAndRejectHandler = async (newStatus) => {
    const currentList = getCurrentList();
    const { selected, source } = splitIncidentsByIds(currentList, selectedIds);

    // setting lat and long for approved incidents
    if (newStatus === 'approved') {
      for (const inc of selected) {
        if (inc.city && inc.state) {
          const latAndLong = await getLatAndLong(inc);
          inc.lat = latAndLong[0];
          inc.long = latAndLong[1];
        }
      }
    }

    putIncidents(oktaAxios, selected, newStatus)
      .then(res => {
        if (listType === 'pending') {
          setPendingIncidents(source);
        }

        else if (listType === 'form-responses') {
          setFormResponses(source);
        }

        else if (listType === 'approved') {
          setApprovedIncidents(source);
        }

        setAllSelected(false);
        setSelectedIds([]);
      })
      .catch(err => {
        console.log(err);

        // TODO: Better error handling!
      });
  };

  // toggling rendering of AddIncident pop up modal
  const toggleAddIncident = evt => {
    evt.preventDefault();
    setAdding(true);
  };

  // this needs to be improved
  const selectedTabButtonStyle = {
    background: '#095fab'
  };

  return (
    <>
      {/* I don't know what this is */}
      {showModal ? <div className="back-drop"></div> : null}
      <Modal
        showModal={showModal}
        modalHandler={modalHandler}
        unapprovedIncidents={pendingIncidents}
      />

      {/* Incident "tabs" - unapproved, approved, form responses */}
      <div className="dashboard-buttons-container">
        <div className="incident-btn-container">
          <button
            className="approve-btn"
            style={listType === 'pending' ? selectedTabButtonStyle : {}}
            onClick={() => setListType('pending')}
          >
            Pending Incidents
          </button>
          <button
            className="approve-btn"
            style={listType === 'approved' ? selectedTabButtonStyle : {}}
            onClick={() => setListType('approved')}
          >
            Approved Incidents
          </button>
          <button
            className="approve-btn"
            style={listType === 'form-responses' ? selectedTabButtonStyle : {}}
            onClick={() => setListType('form-responses')}
          >
            Form Responses
          </button>
        </div>
      </div>

      <div className="dashboard-container">
        <DashboardTop
          unapprovedIncidents={pendingIncidents}
          toggleAddIncident={toggleAddIncident}
          listType={listType}
        />

        {/* Controls for setting the status of selected incidents (unapproved, pending, approved) */}
        <IncidentStatus
          isActive={selectedIds.length > 0}
          listType={listType}
          onStatusConfirm={approveAndRejectHandler}
        />

        {/* modal popup for adding a new incident */}
        {adding &&
          <AddIncident
            getData={getData}
            setAdding={setAdding}
          />
        }

        <Incidents
          selected={selectedIds}
          setSelected={setSelectedIds}
          setUnapprovedIncidents={setPendingIncidents}
          incidents={getCurrentList()}
        />
      </div>

      {/* {listType === 'form-responses' &&
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
      } */}
    </>
  );
};
export default AdminDashboard;
