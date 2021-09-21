import React, { useState } from 'react';
import { Button } from 'antd';
import { nanoid } from 'nanoid';

import AntModal from './AntModalComponent/AntModal';
import { getData } from '../../utils/DashboardHelperFunctions';
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

  // toggle "editing mode"
  const toggleEditor = () => {
    setEditing(!editing);
  };

  // form control functions
  const onFormSubmit = () => {
    setEditing(false);
    setMoreInfo(false);
    getData(setUnapprovedIncidents);
  };

  return (
    <div className="complete-incident">
      {editing ? (
        <AdminEdit
          initialValues={incident}
          cancel={toggleEditor}
          cleanup={onFormSubmit}
        />
      ) : (
        <div className="complete-incident-dropdown">
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

          {/* Location */}
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">Location:</p>
            <p className="location-dropdown-wrap">
              {incident.city}, {incident.state}
            </p>
          </div>

          {/* Date */}
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">Date:</p>
            <p>{formattedDate}</p>
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
            <p className="complete-incident-dropdown-titles-bold">Source(s)</p>
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

          {/* Request More Info button */}
          <AntModal incident={incident} />
        </div>
      )}
      <div className="complete-incident-dropdown">
        {!editing && (
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
                Source(s):
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
              <p className="complete-incident-dropdown-titles-bold">Tags:</p>
              <div>{incident.tags ? incident.tags.join(', ') : ''}</div>
            </div>

            {/* Confidence Rating: */}
            <div className="dropdown-text-wrap">
              <p className="complete-incident-dropdown-titles-bold">
                Confidence Rating:
              </p>
              <p>{(incident.confidence * 100).toFixed(2)}%</p>
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

        {editing && (
          <>
            {/* Date */}
            <label className="label">
              Date
              <input
                className="edit-input"
                onChange={handleInputChange}
                type="text"
                name="incident_date"
                value={formValues.incident_date}
              />
            </label>

            {/* City */}
            <label className="label">
              City
              <input
                className="edit-input"
                onChange={handleInputChange}
                type="text"
                name="city"
                value={formValues.city || ''}
              />
            </label>

            {/* State */}
            <label className="label">
              State
              <input
                className="edit-input"
                onChange={handleInputChange}
                type="text"
                name="state"
                value={formValues.state || ''}
              />
            </label>

            {/* Title */}
            <label className="label">
              Title
              <input
                className="edit-input"
                onChange={handleInputChange}
                type="text"
                name="title"
                value={formValues.title || ''}
              />
            </label>

            {/* Description */}
            <label className="label">
              Description
              <input
                className="edit-input"
                onChange={handleInputChange}
                type="text"
                name="description"
                value={formValues.description}
              />
            </label>

            {/* Force Rank */}
            <label className="label">
              Force Rank
              <select
                className="edit-input"
                onChange={handleInputChange}
                name="force_rank"
                value={formValues.force_rank}
              >
                <option value="Rank 0">Rank 0 - No Police Presence</option>
                <option value="Rank 1">Rank 1 - Police Presence</option>
                <option value="Rank 2">Rank 2 - Empty-hand</option>
                <option value="Rank 3">Rank 3 - Blunt Force</option>
                <option value="Rank 4">Rank 4 - Chemical &amp; Electric</option>
                <option value="Rank 5">Rank 5 - Lethal Force</option>
              </select>
            </label>

            {/* Sources */}
            <label className="label">
              Source(s)
              <input
                className="edit-input"
                onChange={handleInputChange}
                type="text"
                name="src"
                value={formValues.src || ''}
              />
            </label>

            {/* Tags */}
            <label className="label">
              Tags
              <span style={{ fontWeight: 'normal' }}>
                &nbsp;(comma separated values)
              </span>
              <input
                className="edit-input"
                onChange={handleInputChange}
                type="text"
                name="tags"
                value={formValues.tags}
              />
            </label>

            {/* Confidence Rating: */}
            <div className="dropdown-text-wrap">
              <p className="complete-incident-dropdown-titles-bold">
                Confidence Rating:
              </p>
              <p>{(incident.confidence * 100).toFixed(2)}%</p>
            </div>

            {/* Cancel button */}
            <Button
              id="dropdown-edit-button"
              className="approve-reject-select"
              onClick={toggleEditor}
            >
              Cancel
            </Button>

            {/* Apply button */}
            <Button className="approve-reject-select" onClick={handleSubmit}>
              Apply Changes
            </Button>
          </>
        )}

        <AntModal incident={incident} />
      </div>
    </div>
  );
};

export default CompleteIncident;
