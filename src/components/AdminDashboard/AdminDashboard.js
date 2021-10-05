import React, { useState, useEffect } from 'react';

import './AdminDashboard.css';

import AddIncident from './AddIncident';
import DashboardTop from './DashboardTop';
import Welcome from './Welcome';
import useOktaAxios from '../../hooks/useOktaAxios';
import StatusSelector from './StatusSelector';
import AntTable from './AntTableComponents/AntTable';
import { useEasyModeAuth } from '../../store/allIncidentsSlice/easyMode';
import { useAllIncidents } from '../../store/allIncidentsSlice';
import ListSelector from './ListSelector';

/** @typedef {import('../../store/allIncidentsSlice').Incident} Incident */

const AdminDashboard = () => {
  /** List of selected (checked) incident_ids */
  const [selectedIds, setSelectedIds] = useState([]);

  // authorized axios and easymode
  const oktaAxios = useOktaAxios();
  const easyMode = useEasyModeAuth(oktaAxios);

  const { approvedIncidents, pendingIncidents, formResponses, isLoading, errorMessage } = useAllIncidents();

  // The incident tab to display: 'pending', 'approved', 'form-responses'
  const [listType, setListType] = useState('pending');

  /** @returns {Incident[]} the incidents array for the current tab */
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
      alert(`An error occured. You may need to refresh the page.\n\n${errorMessage}`);
    }
  }, [errorMessage]);

  // loads incident data on first render
  useEffect(() => {
    easyMode.fetchIncidents('approved');
    easyMode.fetchIncidents('pending');
    easyMode.fetchIncidents('form-responses');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if an incident is deleted while selected, this will remove it from the selection
  useEffect(() => {
    const list = getCurrentList();
    setSelectedIds(sid => sid.filter(id => list.some(inc => inc.incident_id === id)));
  }, [approvedIncidents, pendingIncidents, formResponses]);

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
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      {/* Welcome message */}
      <Welcome pendingCount={pendingIncidents.length} />

      {/* Incident "tabs" - unapproved, approved, form responses */}
      <ListSelector listType={listType} setListType={setListType} />

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
        <StatusSelector
          isVisible={selectedIds.length > 0}
          listType={listType}
          onStatusConfirm={approveAndRejectHandler}
        />

        {/* modal popup for adding a new incident */}
        {adding &&
          <AddIncident
            setAdding={setAdding}
          />
        }

        {/* Table for pending incidents */}
        {listType === 'pending' &&
          <AntTable
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            incidents={pendingIncidents}
            showConfidence={true}
          />
        }

        {/* Table for approved incidents */}
        {listType === 'approved' &&
          <AntTable
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            incidents={approvedIncidents}
          />
        }

        {/* table for form-responses */}
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
