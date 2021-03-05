import React, { useState } from 'react';

import { Modal } from 'antd';

import {
  getLatAndLong,
  postIncident,
  formatDate,
} from '../../utils/DashboardHelperFunctions';

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

  const { setAdding, setPageNumber } = props;

  // submitting form
  const handleOk = async evt => {
    evt.preventDefault();
    // formatting date
    let newDateString;
    if (!formValues.date) {
      newDateString = new Date().toJSON();
    } else {
      const formattedDate = formatDate(formValues.date);
      newDateString = formattedDate + 'T00:00:00.000Z';
    }

    // getting coordinates
    const [lat, long] = await getLatAndLong(formValues);

    // creating new incident object to be posted
    const newIncident = {
      ...formValues,
      desc: formValues.desc + ' ' + twitterSrc,
      date: newDateString,
      lat,
      long,
    };

    // posting new incident to database
    const modalMessage = await postIncident(newIncident);

    setModalText(modalMessage);

    setTimeout(() => {
      // modal is unmounted, admin is redirected to first page of dashboard
      setVisible(false);
      setConfirmLoading(false);
      setAdding(false);
      setPageNumber(1);
    }, 1750);
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
