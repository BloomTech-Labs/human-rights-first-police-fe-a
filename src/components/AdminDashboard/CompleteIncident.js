import React, { useState, useEffect } from 'react';

import EmbedSource from '../EmbedSource';

import { applyEdits, getData } from '../../utils/DashboardHelperFunctions';

const CompleteIncident = props => {
  const {
    incident,
    formattedDate,
    setMoreInfo,
    setUnapprovedIncidents,
  } = props;

  // separating the description and the tweet url to display in tweet URL form field when editing (for incidents that have a tweet URL included in the description)
  const [description, twitterUrl] = incident.desc.split('https');
  const [twitterSrc, setTwitterSrc] = useState(
    twitterUrl ? 'https' + twitterUrl : ''
  );

  // setting state to toggle "editing mode"
  const [editing, setEditing] = useState(false);

  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setFormValues({
      ...incident,
      date: formattedDate,
      desc: description,
    });

    return () => {
      setFormValues({});
    };
  }, [editing, incident]);

  // toggle "editing mode"
  const toggleEditor = evt => {
    evt.preventDefault();
    setFormValues({ ...incident, date: formattedDate });
    setEditing(!editing);
  };

  // form control functions
  const handleInputChange = evt => {
    const { name, value } = evt.target;
    if (name === 'twitter-src') {
      setTwitterSrc(value);
      const splitUrl = value.split('/');
      const tweetId = splitUrl[splitUrl.length - 1];
      setFormValues({
        ...formValues,
        incident_id: tweetId,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const editedIncident = {
      ...formValues,
      desc: formValues.desc + ' ' + twitterSrc,
    };
    applyEdits(editedIncident, incident)
      .then(res => {
        window.location.reload();
        console.log(res);
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
              name="date"
              value={formValues.date}
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
            <p>{description}</p>
          </div>
        ) : (
          <>
            <label htmlFor="desc" className="label">
              Description
            </label>
            <br />
            <input
              className="edit-input"
              onChange={handleInputChange}
              type="text"
              name="desc"
              value={formValues.desc}
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

        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">Tweet</p>
            <br />
            {incident.incident_id && (
              <EmbedSource
                key={incident.incident_id}
                tweetId={incident.incident_id}
                tweetUrl={twitterSrc}
              />
            )}
          </div>
        ) : (
          <>
            <label htmlFor="twitter-src" className="label">
              Tweet URL
              <br />
              <input
                type="text"
                name="twitter-src"
                value={twitterSrc}
                onChange={handleInputChange}
                className="edit-input"
              />
            </label>
            <br />
          </>
        )}

        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">
              Additional Source
            </p>
            <a href={incident.src} target="_blank">
              {incident.src}
            </a>
          </div>
        ) : (
          <>
            <label htmlFor="src" className="label">
              Additional Source
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
        <button
          id="dropdown-edit-button"
          className="approve-reject-select"
          onClick={toggleEditor}
        >
          {editing ? 'Cancel' : 'Edit'}
        </button>
        {editing && (
          <button className="approve-reject-select" onClick={handleSubmit}>
            Apply Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default CompleteIncident;
