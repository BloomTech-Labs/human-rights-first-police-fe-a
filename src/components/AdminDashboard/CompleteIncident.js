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

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setFormValues({
      ...incident,
      tags: incident.tags ? incident.tags.join(", ") : [],
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

  // form control functions
  const handleInputChange = evt => {
    const { name, value } = evt.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const oktaAxios = useOktaAxios();

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

        {/* Date */}
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

        {/* Location */}
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

        {/* Title */}
        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">
              Title:
            </p>
            <p>{incident.title || '(none)'}</p>
          </div>
        ) : (
          <>
            <label htmlFor="description" className="label">
              Title
            </label>
            <br />
            <input
              className="edit-input"
              onChange={handleInputChange}
              type="text"
              name="title"
              value={formValues.title}
            />
            <br />
          </>
        )}

        {/* Description */}
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

        {/* Force Rank */}
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
              <option value="Rank 0 - No Police Presence">
                Rank 0 - No Police Presence
              </option>
              <option value="Rank 1 - Police Presence">
                Rank 1 - Police Presence
              </option>
              <option value="Rank 2 - Empty-hand">Rank 2 - Empty-hand</option>
              <option value="Rank 3 - Blunt Force">Rank 3 - Blunt Force</option>
              <option value="Rank 4 - Chemical &amp; Electric">
                Rank 4 - Chemical &amp; Electric
              </option>
              <option value="Rank 5 - Lethal Force">
                Rank 5 - Lethal Force
              </option>
            </select>
            <br />
          </>
        )}

        {/* Sources */}
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
            </label>
            <br />
            <input
              className="edit-input"
              onChange={handleInputChange}
              type="text"
              name="src"
              value={formValues.src || ' '}
            />
            <br />
          </>
        )}

        {/* Tags */}
        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">Tags</p>
            <div>
              {incident.tags.join(", ")}
            </div>
          </div>
        ) : (
          <>
            <label htmlFor="src" className="label">
              Tags
              <span style={{ fontWeight: "normal" }}>&nbsp;(comma separated values)</span>
            </label>
            <br />
            <input
              className="edit-input"
              onChange={handleInputChange}
              type="text"
              name="tags"
              value={formValues.tags}
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
        {editing && (
          <Button className="approve-reject-select" onClick={handleSubmit}>
            Apply Changes
          </Button>
        )}
        <AntModal incident={incident} />
      </div>
    </div>
  );
};

export default CompleteIncident;
