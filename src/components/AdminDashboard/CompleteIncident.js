import React, { useState, useEffect } from 'react';
import EmbedSource from '../EmbedSource';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CompleteIncident = props => {
  const {
    incident,
    formattedDate,
    setMoreInfo,
    getData,
    setPageNumber,
  } = props;

  const [trimmedDescription, tweetSrc] = incident.desc.split('https');
  // setting state to toggle "editing mode"
  const [editing, setEditing] = useState(false);

  const [twitterSrc, setTwitterSrc] = useState(
    tweetSrc ? 'https' + tweetSrc : ''
  );

  const [formValues, setFormValues] = useState({});

  console.log(twitterSrc);

  console.log(incident);
  useEffect(() => {
    setFormValues({
      ...incident,
      date: formattedDate,
      desc: trimmedDescription,
    });
    return () => {
      setFormValues({});
    };
  }, [editing]);
  console.log(twitterSrc);

  // toggle "editing mode"
  const toggleEditor = evt => {
    evt.preventDefault();
    setFormValues({ ...incident, date: formattedDate });
    setEditing(!editing);
  };

  // setting form values on input change
  const handleInputChange = evt => {
    const { name, value } = evt.target;
    if (name === 'twitter-src') {
      setTwitterSrc(value);
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  // functions for applying changes to incident
  const applyEdits = evt => {
    evt.preventDefault();
    const [month, day, year] = formValues.date.split('/');
    const [date, time] = incident.date.split('T');
    const newDate = `${year}-${month}-${day}T${time}`;
    const updatedIncident = {
      ...formValues,
      date: newDate,
    };
    axios
      .put(`${process.env.REACT_APP_BACKENDURL}/dashboard/incidents`, [
        { ...updatedIncident },
      ])
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(res => {
        setEditing(!editing);
        setMoreInfo(false);
        setPageNumber(1);
        getData();
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
            <p className="location-dropdown-wrap">{incident.location}</p>
          </div>
        ) : (
          <>
            <label htmlFor="city" className="label">
              Location
            </label>
            <br />
            <input
              className="edit-input"
              onChange={handleInputChange}
              type="text"
              name="city"
              value={formValues.location}
            />
            <br />
          </>
        )}
        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">
              Description:
            </p>
            <p>{trimmedDescription}</p>
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
              name="force-rank"
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
            {twitterSrc && <EmbedSource key={twitterSrc} url={twitterSrc} />}
          </div>
        ) : (
          <>
            <label htmlFor="twitter-src" className="label">
              Tweet
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
          <button className="approve-reject-select" onClick={applyEdits}>
            Apply Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default CompleteIncident;
