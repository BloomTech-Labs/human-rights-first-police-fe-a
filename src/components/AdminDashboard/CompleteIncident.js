import React, { useState, useEffect } from 'react';

import './CompleteIncident.scss';

const CompleteIncident = props => {
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setFormValues({ ...incident, date: formattedDate });
    return () => {
      setFormValues({});
    };
  }, []);

  const {
    incident,
    formattedDate,
    unapprovedIncidents,
    setUnapprovedIncidents,
  } = props;

  const toggleEditor = evt => {
    evt.preventDefault();
    setFormValues({ ...incident, date: formattedDate });
    setEditing(!editing);
  };

  const handleInputChange = evt => {
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };

  const applyEdits = evt => {
    evt.preventDefault();
    const [month, day, year] = formValues.date.split('/');
    const [date, time] = incident.date.split('T');
    const newDate = `${year}-${month}-${day}T${time}`;
    const updatedIncident = {
      ...formValues,
      date: newDate,
    };
    updateIncidents(updatedIncident);
  };

  const updateIncidents = incident => {
    const updatedIncidents = unapprovedIncidents.map(inc => {
      if (inc.incident_id === incident.incident_id) {
        return incident;
      } else {
        return inc;
      }
    });
    setUnapprovedIncidents(updatedIncidents);
    setEditing(!editing);
    console.log(unapprovedIncidents);
  };

  return (
    <div className="complete-incident">
      <div className="complete-incident-dropdown">
        {!editing ? (
          <p>{formattedDate}</p>
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
          <p>
            {incident.city}, {incident.state}
          </p>
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
          <p>{incident.title}</p>
        ) : (
          <>
            <label htmlFor="title" className="label">
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

        {!editing ? (
          <p>{incident.categories.join(' ')}</p>
        ) : (
          <>
            <label htmlFor="categories" className="label">
              Categories
              <br />
              (Separated by commas)
            </label>
            <br />
            <textarea
              className="edit-input"
              cols="25"
              rows="5"
              onChange={handleInputChange}
              type="textarea"
              name="categories"
              value={formValues.categories}
            />
            <br />
          </>
        )}

        {!editing ? (
          <p>{incident.src.join(' ')}</p>
        ) : (
          <>
            <label htmlFor="src" className="label">
              Sources
              <br />
              (Separated by commas)
            </label>
            <br />
            <textarea
              cols="25"
              rows="5"
              className="edit-input text-area"
              onChange={handleInputChange}
              type="textarea"
              name="src"
              value={formValues.src.join(' ')}
            />
            <br />
          </>
        )}

        <button
          className="approve-reject-select"
          id="dropdown-edit-button"
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
