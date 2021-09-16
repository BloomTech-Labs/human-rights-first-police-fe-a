import React, { useState, useEffect } from 'react';

import AntModal from './AntModalComponent/AntModal';

import { Button } from 'antd';

import EmbedSource from '../EmbedSource';

import { applyEdits, getData } from '../../utils/DashboardHelperFunctions';
import { AntDesignOutlined } from '@ant-design/icons';
import useOktaAxios from '../../hooks/useOktaAxios';
import { nanoid } from 'nanoid';

const CompleteIncident = props => {
  const {
    incident,
    formattedDate,
    setMoreInfo,
    setUnapprovedIncidents,
  } = props;
  // setting state to toggle "editing mode"
  const [editing, setEditing] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [formValues, setFormValues] = useState({});

  const oktaAxios = useOktaAxios();

  useEffect(() => {
    setFormValues({
      ...incident,
      incident_date: formattedDate,
    });
    return () => {
      setFormValues({});
    };
  }, [editing, incident, formattedDate]);
  // toggle "editing mode"
  const toggleEditor = evt => {
    evt.preventDefault();
    setFormValues({ ...incident, date: formattedDate });
    setEditing(!editing);
  };

  // for incident deletion button
  const toggleDelete = evt => {
    evt.preventDefault();
    oktaAxios
      .delete(`/dashboard/incidents/${incident.incident_id}`)
      .then(res => {
        window.alert(
          `Case with id ${incident.incident_id} successfully deleted`
        );
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  // form control functions
  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    applyEdits(oktaAxios, formValues, incident)
      .then(res => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(res => {
        setEditing(false);
        setMoreInfo(false);
        getData(setUnapprovedIncidents);
      });
  };

  return (
    <div className="complete-incident">
      <div className="complete-incident-dropdown">
        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">Date:</p>
            <p>{formattedDate}</p>
          </div>
        ) : (
          <>
            <label htmlFor="date" className="label">
              Date
            </label>
            <br />
            <input
              className="edit-input"
              onChange={handleInputChange}
              type="text"
              name="incident_date"
              value={formValues.incident_date}
            />
            <br />
          </>
        )}
        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">Location:</p>
            <p className="location-dropdown-wrap">
              {incident.city}, {incident.state}
            </p>
          </div>
        ) : (
          <>
            <label htmlFor="city" className="label">
              City
            </label>
            <br />
            <input
              className="edit-input"
              onChange={handleInputChange}
              type="text"
              name="city"
              value={formValues.city}
            />
            <br />
            <label htmlFor="state" className="label">
              State
            </label>
            <br />
            <input
              className="edit-input"
              onChange={handleInputChange}
              type="text"
              name="state"
              value={formValues.state}
            />
            <br />
          </>
        )}
        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">
              Description:
            </p>
            <p>{incident.description}</p>
          </div>
        ) : (
          <>
            <label htmlFor="description" className="label">
              Description
            </label>
            <br />
            <input
              className="edit-input"
              onChange={handleInputChange}
              type="text"
              name="description"
              value={formValues.description}
            />
            <br />
          </>
        )}
        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">
              Force Rank:
            </p>
            <p>{incident.force_rank}</p>
          </div>
        ) : (
          <>
            <label htmlFor="force-rank" className="label">
              Force Rank
            </label>
            <br />
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
            <br />
          </>
        )}

        {!editing ? (
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
        ) : (
          <>
            <label htmlFor="src" className="label">
              Source(s)
              <br />
            </label>
            <br />
            <input
              className="edit-input"
              onChange={handleInputChange}
              type="text"
              name="src"
              value={formValues.src || ' '}
            />
          </>
        )}
        <Button
          id="dropdown-edit-button"
          className="approve-reject-select"
          onClick={toggleEditor}
        >
          {editing ? 'Cancel' : 'Edit'}
        </Button>
        {editing && <Button onClick={handleSubmit}>Apply Changes</Button>}

        {/* Button for deleting incidents */}
        <Button onClick={toggleDelete} type="danger">
          {deleting ? 'Cancel' : 'Delete'}
        </Button>

        <AntModal incident={incident} />
      </div>
    </div>
  );
};

export default CompleteIncident;
