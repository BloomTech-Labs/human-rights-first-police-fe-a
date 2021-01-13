import React, { useState } from 'react';
import { TimelineItem } from 'vertical-timeline-component-for-react';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import 'antd/dist/antd.css';
import { Modal } from 'antd';

export default function TimelineItems({ details }) {
  // the urlDomain function pulls the website name from the string we are getting back from the API
  const urlDomain = url => {
    let re = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/gim;
    let newUrl = url.split(re)[1].replace('.com', '');
    return newUrl;
  };

  // modal logic

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <TimelineItem
      key={nanoid()}
      description={details.desc}
      dateText={DateTime.fromISO(details.date).toLocaleString(
        DateTime.DATE_FULL
      )}
      style={{ color: '#BC541E' }}
      dateInnerStyle={{ color: 'white', backgroundColor: '#003767' }}
    >
      <h3 style={{ color: '#BC541E', cursor: 'pointer' }} onClick={showModal}>
        {details.title}{' '}
      </h3>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div className="desc">{details.desc}</div>
      </Modal>

      <h4 className="cityState">
        {details.city}, {details.state}
      </h4>
      <div className="categories">
        {details.categories.map(element => (
          <span className="category-item" key={nanoid()}>
            {element.charAt(0).toUpperCase() + element.slice(1)}
          </span>
        ))}
      </div>
      <div className="timeline-links">
        <h4 className="sourceText"> Sources: </h4>
        {details.src.map(element => (
          <a
            href={element}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button"
            key={nanoid()}
          >
            {urlDomain(element)}
          </a>
        ))}
      </div>
    </TimelineItem>
  );
}
