import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Checkbox } from 'antd';
import './AntModal.css';
import axios from 'axios';

// This component returns an antd modal that has an antd input component nested within it. The input's text area is prepopulated with a default message that can be edited. When the send button is clicked, the message is sent to the Twitter Bot on the DS Backend.
const AntModal = () => {
  // The default message displayed inside of the input's text area
  const defaultMessage = {
    message: 'Hello user!',
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(defaultMessage);
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSend = () => {
    setIsModalVisible(false);

    //Commented out isChecked until we know what the run.mocky.io line is
    axios
      .post(
        'https://run.mocky.io/v3/f1175471-f517-4935-9d53-5319d0c95b3d', // Not certain that this endpoint is, we'll have to check and adjust with new payload (isChecked)
        inputValue
        // isChecked
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = e => {
    const { value } = e.target;

    if (!value) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
      setInputValue({ message: value });
    }
  };

  const handleCheckboxChange = e => {
    setIsChecked({
      ...isChecked,
      [e.target.name]: e.target.checked,
    });
  };

  const { TextArea } = Input;

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Request More Info
      </Button>
      <Modal
        title="Twitter Bot Response"
        visible={isModalVisible}
        onOk={handleSend}
        okText="Send"
        okButtonProps={{ disabled: isButtonDisabled }}
        onCancel={handleCancel}
      >
        <TextArea
          rows={6}
          defaultValue={defaultMessage.message}
          allowClear={true}
          onChange={handleInputChange}
        />
        <p>What data needs clarification?</p>
        <div className="checkbox-container">
          <label htmlFor="date" className="date">
            {' '}
            Date
          </label>
          <Checkbox name="date" onChange={handleCheckboxChange}></Checkbox>
        </div>
        <div className="checkbox-container">
          <label htmlFor="location" className="location">
            {' '}
            Location
          </label>
          <Checkbox name="location" onChange={handleCheckboxChange}></Checkbox>
        </div>
        <div className="checkbox-container">
          <label htmlFor="rank" className="rank">
            {' '}
            Rank
          </label>
          <Checkbox name="rank" onChange={handleCheckboxChange}></Checkbox>
        </div>
      </Modal>
    </>
  );
};

export default AntModal; // this component is imported and used within CompleteIncident.js
