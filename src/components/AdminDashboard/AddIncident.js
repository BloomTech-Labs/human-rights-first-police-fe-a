import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import axios from 'axios';

import Source from './Source';

const initialFormValues = {
  approved: true,
  coordinates: null,
  date: '',
  desc: '',
  force_rank: '',
  geo: null,
  language: 'en',
  pending: false,
  rejected: false,
  src: '',
  user_description: '',
  user_location: '',
  user_name: '',
};

const AddIncident = props => {
  // setting state for form management
  const [formValues, setFormValues] = useState(initialFormValues);
  const [twitterSrc, setTwitterSrc] = useState('');

  //   setting state for all sources/categories added

  // setting state for add incident pop up
  const [modalText, setModalText] = useState('');
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { setAdding, getData, setPageNumber } = props;

  // gets latitude and longitude of given city/state
  const getLatAndLong = new Promise((resolve, reject) => {
    axios
      .get(
        `http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_MAPQUEST_API_KEY}&location=${formValues.location}`
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
          lat,
          long: lng,
          date: newDateString,
          pending: false,
          rejected: false,
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
      title="Title"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <form>
        <label htmlFor="location">
          Location
          <br />
          <input
            type="text"
            name="location"
            value={formValues.location}
            onChange={handleChange}
          />
        </label>
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
        <label htmlFor="desc">
          Description
          <br />
          <input
            type="text"
            name="desc"
            value={formValues.desc}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="tweet">
          Tweet URL
          <input
            type="text"
            value={twitterSrc}
            onChange={handleChange}
            name="tweet"
          />
        </label>
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
