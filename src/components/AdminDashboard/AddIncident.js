import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import axios from 'axios';

import Source from './Source';

const initialFormValues = {
  city: '',
  date: '',
  desc: '',
  empty_hand_hard: false,
  empty_hand_soft: false,
  lat: 37.33532,
  less_lethal_methods: true,
  lethal_force: false,
  long: -121.88931,
  src: [],
  state: '',
  title: '',
  uncategorized: false,
  verbalization: false,
};

const AddIncident = props => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [amPmValue, setAmPmValue] = useState(false);

  //   setting state for src and time input on form
  const [srcValue, setSrcValue] = useState('');
  const [time, setTime] = useState('');

  //   setting state for all sources added
  const [sources, setSources] = useState([]);

  const [modalText, setModalText] = useState('');
  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { setAdding } = props;

  //   submitting the form
  const handleOk = () => {
    let newDateString;
    if (!formValues.date) {
      newDateString = new Date().toJSON();
    } else {
      const formattedDate = formatDate(formValues.date, amPmValue);
      const formattedTime = formatTime();
      newDateString = formattedDate + formattedTime;
    }
    const newIncident = {
      ...formValues,
      date: newDateString,
      pending: false,
      rejected: false,
    };
    console.log(newIncident);
    setConfirmLoading(true);
    // axios.post(`${process.env.REACT_APP_BACKENDURL}/dashboard/incidents`, newIncident)
    // .then(res=>{
    //     setModalText('New incident added successfully');
    //     setTimeout(() => {
    //         setVisible(false);
    //         setConfirmLoading(false);
    //       }, 750);
    // })
    // .catch(err=>{
    //     setModalText(err.message);
    //     console.log(err);
    // });

    console.log(newIncident);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setAdding(false);
    }, 750);
  };

  // adding and removing sources
  const removeSrc = src => {
    const updatedSources = sources.filter(source => {
      return src !== source;
    });
    setSources(updatedSources);
  };

  const handleAddSrc = evt => {
    evt.preventDefault();
    if (sources.includes(srcValue)) {
      setSrcValue('');
      return;
    } else {
      setSources([...sources, srcValue]);
      setSrcValue('');
    }
  };

  //   form value management functions
  const handleChange = evt => {
    const { name, value } = evt.target;
    if (name === 'src') {
      setSrcValue(value);
    } else if (name === 'time') {
      setTime(value);
    } else if (name === 'ampm') {
      setAmPmValue(value);
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const handleSrcChange = evt => {
    setSrcValue(evt.target.value);
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

  const formatTime = () => {
    if (!time) {
      return 'T00:00:00.000Z';
    } else {
      let [hour, minute] = time.split(':');

      if (hour.length === 1 && amPmValue === 'am') {
        hour = '0' + hour;
      }
      if (minute.length === 1) {
        minute = '0' + minute;
      }
      return `T${
        amPmValue === 'pm' ? Number(hour) + 12 + '' : hour
      }:${minute}:00.000Z`;
    }
  };

  //   clear the time input field/am-pm
  const handleTimeCancel = evt => {
    evt.preventDefault();
    setTime('');
    setAmPmValue(false);
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
        <label htmlFor="time">
          Time Relative to Location (XX:XX)
          <br />
          <input type="text" name="time" value={time} onChange={handleChange} />
          {time && (
            <>
              <br />
              <label htmlFor="ampm">
                A.M.
                <input
                  type="radio"
                  value="am"
                  onChange={handleChange}
                  name="ampm"
                />
              </label>
              <br />
              <label htmlFor="ampm">
                P.M.
                <input
                  type="radio"
                  value="pm"
                  onChange={handleChange}
                  name="ampm"
                />
              </label>
              <br />
              <button onClick={handleTimeCancel}>Cancel</button>
            </>
          )}
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
        <label htmlFor="title">
          Title for This Incident Report
          <br />
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="src">
          Link(s) to Media Source
          <br />
          <input
            type="text"
            name="src"
            value={srcValue}
            onChange={handleSrcChange}
          />
          <br />
          <button
            className="add-src"
            onClick={handleAddSrc}
            disabled={!srcValue}
          >
            Add Source
          </button>
          {sources.map(source => {
            return (
              <Source source={source} removeSrc={removeSrc} key={source} />
            );
          })}
        </label>
        <br />
      </form>
      {modalText ? modalText : ''}
    </Modal>
  );
};
export default AddIncident;
