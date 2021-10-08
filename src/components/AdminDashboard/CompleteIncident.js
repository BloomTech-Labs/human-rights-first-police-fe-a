import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import { nanoid } from 'nanoid';
import useOktaAxios from '../../hooks/useOktaAxios';
import AdminEdit from './forms/AdminEdit';

import './CompleteIncident.css';
import { useEasyModeAuth } from '../../store/allIncidentsSlice/easyMode';
import { formOut } from '../../utils/formApiCalls';
import { dashboardModals, showInfoModal } from '../../utils/dashboardModals';
import { useSelector } from 'react-redux';

/**
 * @typedef CompleteIncidentProps
 * @property {any} incident - incident data
 */

/**
 * Component for displaying/editing incident details on the admin dashboard
 * @param {CompleteIncidentProps} props
 * @returns {JSX.Element} the CompleteIncident component
 */
const CompleteIncident = props => {
  const { incident } = props;

  const oktaAxios = useOktaAxios();
  const easyMode = useEasyModeAuth(oktaAxios);
  const isLoading = useSelector(state => state.allIncidents.isLoading);

  // for incident deletion button
  const onDelete = async () => {
    if (await dashboardModals.confirmDeleteIncident(incident.incident_id)) {
      easyMode.deleteIncident(incident);
    }
  };

  const formatDate = inputData => {
    const [year, month, day] = inputData.incident_date.split('-');
    return `${month}/${day.slice(0, 2)}/${year}`;
  };

  const formattedDate = formatDate(incident);

  // setting state to toggle "editing mode"
  const [editing, setEditing] = useState(false);

  // form control functions
  const onFormSubmit = (incident) => {
    easyMode.editIncident(incident)
      .then(() => {
        setEditing(false);
      });
  };

  const onSendDMClick = () => {
    formOut(incident, true)
      .then(res => showInfoModal({ title: "Info", content: JSON.stringify(res) }))
      .catch(err => showInfoModal({ title: "Info", content: JSON.stringify(err) }));
  };

  const onSendTweetClick = () => {
    formOut(incident, false)
      .then(res => showInfoModal({ title: "Info", content: 'A tweet has been sent requesting more information' }))
      .catch(err => showInfoModal({ title: "Info", content: <pre>{JSON.stringify(err, null, 2)}</pre> , width: 800}));
  };

  const popoverContent = (
    <div>
      <Button onClick={onSendDMClick} disabled>
        Send DM
      </Button>
      <Button onClick={onSendTweetClick}>
        Send Tweet
      </Button>
    </div>
  );

  return (
    <div className="complete-incident">
      {editing ? (
        <AdminEdit
          incident={incident}
          isLoading={isLoading}
          onCancel={() => setEditing(false)}
          onSubmit={onFormSubmit}
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

          {/* Confidence Rating: */}
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">
              Confidence Rating:
            </p>
            <p>{(incident.confidence * 100).toFixed(2)}%</p>
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
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>

          {/* Delete Button */}
          <Button onClick={onDelete} type="danger">
            Delete
          </Button>

          {/* Request More Info button */}
          <Popover content={popoverContent} trigger='click'>
            <Button type='primary'>
              Request More Info
            </Button>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default CompleteIncident;
