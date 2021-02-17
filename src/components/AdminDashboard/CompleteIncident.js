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
      <p>{formattedDate}</p>
      {editing && (
        <input
          onChange={handleInputChange}
          type="text"
          name="date"
          value={formValues.date}
        />
      )}
      <p>
        {incident.city}, {incident.state}
      </p>
      {editing && (
        <>
          <input
            onChange={handleInputChange}
            type="text"
            name="city"
            value={formValues.city}
          />{' '}
          <input
            onChange={handleInputChange}
            type="text"
            name="state"
            value={formValues.state}
          />{' '}
        </>
      )}
      <p>{incident.title}</p>
      {editing && (
        <input
          onChange={handleInputChange}
          type="text"
          name="title"
          value={formValues.title}
        />
      )}
      <p>{incident.categories.join(' ')}</p>
      {editing && (
        <input
          onChange={handleInputChange}
          type="text"
          name="title"
          value={formValues.categories}
        />
      )}
      <p>{incident.desc}</p>
      {editing && (
        <input
          onChange={handleInputChange}
          type="text"
          name="desc"
          value={formValues.desc}
        />
      )}
      Sources
      <p>{incident.src.join(' ')}</p>
      {editing && (
        <>
          <input
            onChange={handleInputChange}
            type="text"
            name="src"
            value={formValues.src.join(' ')}
          />
          <br />
        </>
      )}
      <button onClick={toggleEditor}>{editing ? 'Cancel' : 'Edit'}</button>
      {editing && <button onClick={applyEdits}>Apply Changes</button>}
    </div>
  );
};

export default CompleteIncident;
