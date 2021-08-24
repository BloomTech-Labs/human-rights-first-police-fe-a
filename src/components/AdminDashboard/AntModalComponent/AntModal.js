import React, { useEffect, useState } from 'react';
import { Modal, Button, Input, Checkbox } from 'antd';
import './AntModal.css';
import axios from 'axios';

// This component returns an antd modal that has an antd input component nested within it. The input's text area is prepopulated with a default message that can be edited. When the send button is clicked, the message is sent to the Twitter Bot on the DS Backend.
const AntModal = props => {
  const incident_id = props.incident.incident_id;
  const tweet_id = props.incident.tweet_id;
  const user_name = props.incident.user_name;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const sendObj = {
    incident_id: incident_id,
    tweet_id: tweet_id,
    isChecked: true,
    user_name: user_name,
    link: `https://a.humanrightsfirst.dev/edit/${tweet_id}`,
    form: 1,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSend = () => {
    console.log(sendObj);

    // axios
    //   .post(
    //     'http://hrf-bw-labs37-dev.eba-hz3uh94j.us-east-1.elasticbeanstalk.com/form-out',
    //     sendObj
    //   )
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
        <h3>Send update form?</h3>
        <p>{`${props.incident.description}`}</p>
        <p>{`User: @${props.incident.user_name}`}</p>
      </Modal>
    </>
  );
};

export default AntModal; // this component is imported and used within CompleteIncident.js
