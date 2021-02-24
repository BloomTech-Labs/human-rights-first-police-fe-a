import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import axios from 'axios';

import Source from './Source';

const initialFormValues = {
  city: '',
  date: '',
  desc: '',
  // empty_hand_hard: false,
  // empty_hand_soft: false,
  // incident_id: "ca-sanjose-5",
  // lat: 37.33532,
  // less_lethal_methods: true,
  // lethal_force: false,
  // long: -121.88931,
  //   src: [],
  state: '',
  title: '',
  // uncategorized: false,
  // verbalization: false,
};

const AddIncident = props => {
  const [formValues, setFormValues] = useState(initialFormValues);

  //   setting state for src text input on form
  const [srcValue, setSrcValue] = useState('');

  //   setting state for all sources added
  const [sources, setSources] = useState([]);

  const [visible, setVisible] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { setAdding } = props;

  //   submitting the form
  const handleOk = () => {
    setConfirmLoading(true);
    // axios.post(`${process.env.REACT_APP_BACKENDURL}/incidents/approved`, formValues)
    // .then(res=>{
    //     setModalText('New incident added successfully');
    //     setTimeout(() => {
    //         setVisible(false);
    //         setConfirmLoading(false);
    //       }, 750);
    // })
    // .catch(err=>{
    //     console.log(err);
    // });

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
    setFormValues({
      ...formValues,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSrcChange = evt => {
    setSrcValue(evt.target.value);
  };

  const handleCancel = () => {
    setVisible(false);
    setAdding(false);
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
          Date
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
    </Modal>
  );
};
export default AddIncident;
