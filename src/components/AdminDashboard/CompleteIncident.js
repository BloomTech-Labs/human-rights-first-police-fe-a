import React, { useState, useEffect } from 'react';
import EmbedSource from '../EmbedSource';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CompleteIncident = props => {
  // setting state to toggle "editing mode"
  const [editing, setEditing] = useState(false);

  const [formValues, setFormValues] = useState({});
  const [src, setSrc] = useState('');
  const [categories, setCategories] = useState('');

  console.log(formValues);

  const {
    incident,
    formattedDate,
    setMoreInfo,
    getData,
    setPageNumber,
  } = props;

  console.log(incident);
  useEffect(() => {
    setFormValues({ ...incident, date: formattedDate });
    setSrc(formValues.src);
    setCategories(formValues.categories);
    return () => {
      setFormValues({});
    };
  }, [editing]);

  // toggle "editing mode"
  const toggleEditor = evt => {
    evt.preventDefault();
    setFormValues({ ...incident, date: formattedDate });
    setEditing(!editing);
  };

  // setting form values on input change
  const handleInputChange = evt => {
    const { name, value } = evt.target;
    if (name === 'src') {
      setSrc(value);
    } else if (name === 'categories') {
      setCategories(value);
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const createArray = string => {
    let item = '';
    let array = [];
    for (let i = 0; i < string.length; i++) {
      const char = string[i];
      if (char === ',') {
        array.push(item);
        item = '';
      } else if (i === string.length - 1) {
        item += char;
        array.push(item);
      } else {
        item += string[i];
      }
    }
    return array;
  };

  // functions for applying changes to incident
  const applyEdits = evt => {
    evt.preventDefault();
    const [month, day, year] = formValues.date.split('/');
    const [date, time] = incident.date.split('T');
    const newDate = `${year}-${month}-${day}T${time}`;
    let categoriesArray = [];
    let srcArray = [];
    if (formValues.categories) {
      categoriesArray = createArray(categories);
    }
    if (formValues.src) {
      srcArray = createArray(src);
    }
    const updatedIncident = {
      ...formValues,
      date: newDate,
      categories: categoriesArray,
      src: srcArray,
    };
    axios
      .put(
        `${process.env.REACT_APP_BACKENDURL}/dashboard/incidents/${incident.server_id}`,
        updatedIncident
      )
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
            <p className="complete-incident-dropdown-titles-bold">Title:</p>
            <p>{incident.title}</p>
          </div>
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
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">
              Categories:
            </p>
            <p>{incident.categories}</p>
          </div>
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
              type="text"
              name="categories"
              value={categories}
            />
            <br />
          </>
        )}

        {/* Does this need to be here? */}
        {/*         
        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">Sources:</p>
            <p>{incident.src.join(' ')}</p>
          </div>
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
          </>
        )} */}

        {!editing ? (
          <div className="dropdown-text-wrap">
            <p className="complete-incident-dropdown-titles-bold">Sources:</p>

            {incident.src.map(src => (
              <EmbedSource key={src} url={src} />
            ))}
          </div>
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
              value={src}
            />
          </>
        )}

        {/* Does this need to be here? */}
        {/* {!editing ? (
          incident.src.map(src => <EmbedSource url={src} />)
        ) : (
          <>
            <label htmlFor="src" className="label">
              Sources
            </label>
            <br />
          </>
        )} */}

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
