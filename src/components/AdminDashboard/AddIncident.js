import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import axios from 'axios';

import Source from './Source';

const initialFormValues = {
  approved: true,
  city: '',
  coordinates: '',
  date: '',
  desc: '',
  force_rank: '',
  geo: null,
  language: 'en',
  lat: null,
  long: null,
  pending: false,
  rejected: false,
  src: '',
  state: '',
  title: '',
  user_description: '',
  user_location: '',
  user_name: '',
};

const AddIncident = props => {
  // setting state for form management
  const [formValues, setFormValues] = useState(initialFormValues);
  const [twitterSrc, setTwitterSrc] = useState('');

  // setting state for add incident pop up
  const [modalText, setModalText] = useState('');
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { setAdding, getData, setPageNumber } = props;

  // gets latitude and longitude of given city/state
  const getLatAndLong = new Promise((resolve, reject) => {
    axios
      .get(
        `http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${formValues.city},${formValues.state}`
      )
      .then(res => {
        const { lat, lng } = res.data.results[0].locations[0].latLng;
        resolve([lat, lng]);
      })
      .catch(err => {
        reject(err.message);
      });
  });

  // posts new incident to database
  const postIncident = newIncident => {
    console.log(newIncident);
    axios
      .post(
        `${process.env.REACT_APP_BACKENDURL}/dashboard/incidents`,
        newIncident
      )
      .then(res => {
        console.log(res);
        setModalText('New incident added successfully');
        setTimeout(() => {
          // modal is unmounted, admin is redirected to first page of dashboard
          setVisible(false);
          setConfirmLoading(false);
          setAdding(false);
          setPageNumber(1);
          getData();
        }, 1500);
      })
      .catch(err => {
        setModalText('Something went wrong');
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
          setAdding(false);
        }, 2000);
      });
  };

  // submitting form
  const handleOk = () => {
    // formatting date
    let newDateString;
    if (!formValues.date) {
      newDateString = new Date().toJSON();
    } else {
      const formattedDate = formatDate(formValues.date);
      newDateString = formattedDate + 'T00:00:00.000Z';
    }
    // getting long and lat
    getLatAndLong
      .then(res => {
        const [lat, lng] = res;
        // creating updated/new incident object to be posted
        const newIncident = {
          ...formValues,
          desc: formValues.desc + ' ' + twitterSrc,
          lat,
          long: lng,
          date: newDateString,
        };
        postIncident(newIncident);
      })
      .catch(err => {
        setModalText('Something went wrong');
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
          setAdding(false);
        }, 2000);
      });
  };

  //   form management functions
  const handleChange = evt => {
    const { name, value } = evt.target;
    if (name === 'tweet') {
      setTwitterSrc(value);
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setAdding(false);
  };

  //   formatting the date and time into date object
  const formatDate = date => {
    const [month, day, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal
      title="Create New Incident"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <form>
        <label htmlFor="title">
          Title of Incident
          <br />
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label htmlFor="desc">
          Description of Incident
          <br />
          <input
            type="text"
            name="desc"
            value={formValues.desc}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label htmlFor="city">
          City
          <br />
          <input
            type="text"
            name="city"
            value={formValues.city}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label htmlFor="state">
          State
          <br />
          <input
            type="text"
            name="state"
            value={formValues.state}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label htmlFor="date">
          Date (Month/Day/Year)
          <br />
          <input
            type="text"
            name="date"
            value={formValues.date}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label htmlFor="force_rank">
          Force Rank
          <br />
          <select onChange={handleChange} name="force_rank">
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
            <option value="Rank 5 - Lethal Force">Rank 5 - Lethal Force</option>
          </select>
        </label>
        <br />
        <br />
        <label htmlFor="tweet">
          Tweet URL
          <br />
          <input
            type="text"
            value={twitterSrc}
            onChange={handleChange}
            name="tweet"
          />
        </label>
        <br />
        <br />
        <label htmlFor="src">
          Additional Source
          <br />
          <input
            type="text"
            name="src"
            value={formValues.src}
            onChange={handleChange}
          />
        </label>
        <br />
      </form>
      {modalText || ''}
    </Modal>
  );
};
export default AddIncident;
