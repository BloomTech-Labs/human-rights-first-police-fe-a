import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { nanoid } from 'nanoid';

import AntModal from './AntModalComponent/AntModal';
import useOktaAxios from '../../hooks/useOktaAxios';
import { applyEdits, getData } from '../../utils/DashboardHelperFunctions';
import AdminEdit from './forms/AdminEdit';

import './CompleteIncident.css';

/**
 * @typedef CompleteIncidentProps
 * @property {any} incident - incident data
 * @property {string} formattedDate - correctly formatted date
 * @property {React.Dispatch<React.SetStateAction<any[]} setUnapprovedIncidents
 */

/**
 * Component for displaying/editing incident details on the admin dashboard
 * @param {CompleteIncidentProps} props
 * @returns {JSX.Element} the CompleteIncident component
 */
const CompleteIncident = props => {
  const {
    incident,
    formattedDate,
    setMoreInfo,
    setUnapprovedIncidents,
  } = props;

  // setting state to toggle "editing mode"
  const [editing, setEditing] = useState(false);

  const oktaAxios = useOktaAxios();

  // toggle "editing mode"
  const toggleEditor = () => {
    setEditing(!editing);
  };

  // form control functions
  const handleSubmit = evt => {
    // evt.preventDefault();
    // applyEdits(oktaAxios, formValues, incident)
    //   .then(res => {
    //     window.location.reload();
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
    //   .finally(res => {
    //     setEditing(false);
    //     setMoreInfo(false);
    //     getData(setUnapprovedIncidents);
    //   });
  };

  return (
    <div className="complete-incident">
      <div className="complete-incident-dropdown">
        {editing ? (
          <AdminEdit
            initialValues={incident}
            cancel={toggleEditor}
            applyChanges={handleSubmit}
          />
        ) : (
          <>
            {/* Date */}
            <div className="dropdown-text-wrap">
              <p className="complete-incident-dropdown-titles-bold">Date:</p>
              <p>{formattedDate}</p>
            </div>

            {/* Location */}
            <div className="dropdown-text-wrap">
              <p className="complete-incident-dropdown-titles-bold">
                Location:
              </p>
              <p className="location-dropdown-wrap">
                {incident.city}, {incident.state}
              </p>
            </div>

            {/* Title */}
            <div className="dropdown-text-wrap">
              <p className="complete-incident-dropdown-titles-bold">Title:</p>
              <p>{incident.title || '(none)'}</p>
            </div>

            {/* Description */}
            <div className="dropdown-text-wrap">
              <p className="complete-incident-dropdown-titles-bold">
                Description:
              </p>
              <p>{incident.description}</p>
            </div>

            {/* Force Rank */}
            <div className="dropdown-text-wrap">
              <p className="complete-incident-dropdown-titles-bold">
                Force Rank:
              </p>
              <p>{incident.force_rank}</p>
            </div>

            {/* Sources */}
            <div className="dropdown-text-wrap">
              <p className="complete-incident-dropdown-titles-bold">
                Source(s)
              </p>
              <div>
                {incident.src.map(source => (
                  <div key={nanoid()}>
                    <a href={source} rel="noreferrer" target="_blank">
                      {source}
                    </a>
                    <br />
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="dropdown-text-wrap">
              <p className="complete-incident-dropdown-titles-bold">Tags</p>
              <div>{incident.tags ? incident.tags.join(', ') : ''}</div>
            </div>

            {/* Edit button */}
            <Button
              id="dropdown-edit-button"
              className="approve-reject-select"
              onClick={toggleEditor}
            >
              Edit
            </Button>
          </>
        )}

        <AntModal incident={incident} />
      </div>
    </div>
  );
};

export default CompleteIncident;
