import React, { useState, useEffect } from 'react';

import './AdminDashboard.css';

import AddIncident from './AddIncident';
import DashboardTop from './DashboardTop';
import Welcome from './Welcome';
import useOktaAxios from '../../hooks/useOktaAxios';
import IncidentStatus from './IncidentStatus';
import AntTable from './AntTableComponents/AntTable';
import { useEasyModeAuth } from '../../store/allIncidentsEasyMode';
import { useAllIncidents } from '../../store/allIncidentsSlice';

/** @typedef {import('../../store/allIncidentsSlice').Incident} Incident */

const AdminDashboard = () => {
  /** List of selected (checked) incident_ids */
  const [selectedIds, setSelectedIds] = useState([]);

  // authorized axios
  const oktaAxios = useOktaAxios();

  // Redux store functionality
  const easyMode = useEasyModeAuth(oktaAxios);

  const {
    approvedIncidents,
    pendingIncidents,
    formResponses,
    // isLoading,             // not currently in use here
    errorMessage           // left comments to show it's available
  } = useAllIncidents();

  // The incident tab to display: 'pending', 'approved', 'form-responses'
  const [listType, setListType] = useState('pending');

  /** @returns {Incident[]} the corrent incidents array for the current tab */
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

  // resets the selected incidents when switching tabs
  useEffect(() => {
    setSelectedIds([]);
  }, [listType]);

  useEffect(() => {
    if (errorMessage) {
      alert("An error occured. You may need to refresh the page.");
    }
  }, [errorMessage]);

  // gives the active tab a different color
  const selectedTabButtonStyle = {
    background: '#095fab'
  };

  // toggles whether or not the addIncident popup is displayed
  const [adding, setAdding] = useState(false);

  // toggling rendering of AddIncident pop up modal
  const toggleAddIncident = evt => {
    evt.preventDefault();
    setAdding(true);
  };

  // loads incident data on first render
  useEffect(() => {
    easyMode.fetchIncidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Verifies that an incident has city/state
   * @param {number} incident_id
   * @returns {boolean} true if the incident has city and state
   */
  const verifyCityState = (incident_id) => {
    const sourceList = getCurrentList();
    const incident = sourceList.find(inc => inc.incident_id === incident_id);

    return (incident.city && incident.state);
  };

  // approves or rejects the selected incidents
  const approveAndRejectHandler = async (newStatus) => {

    // Incident must have city and state before being approved
    if (newStatus === 'approved') {
      if (!selectedIds.every(id => verifyCityState(id))) {
        alert('Incidents must have city and state before being approved!');
        return;
      }
    }

    easyMode.changeIncidentsStatus(selectedIds, listType, newStatus)
      .then((res) => {
        setSelectedIds([]);
      });
  };

  return (
    <>
      {/* Welcome message */}
      <Welcome pendingCount={pendingIncidents.length} />

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

        {selectedIds.length > 0 &&
          <span>{selectedIds.length} selected</span>
        }

        {/* Controls for setting the status of selected incidents (unapproved, pending, approved) */}
        <IncidentStatus
          isActive={selectedIds.length > 0}
          listType={listType}
          onStatusConfirm={approveAndRejectHandler}
        />

        {/* modal popup for adding a new incident */}
        {adding &&
          <AddIncident
            setAdding={setAdding}
          />
        }

        {listType === 'pending' &&
          <AntTable
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            incidents={pendingIncidents}
            showConfidence={true}
          />
        }

        {listType === 'approved' &&
          <AntTable
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            incidents={approvedIncidents}
          />
        }

        {listType === 'form-responses' &&
          <AntTable
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            incidents={formResponses}
          />
        }

      </div>
    </>
  );
};
export default AdminDashboard;
