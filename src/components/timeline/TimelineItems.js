import React, { useState } from 'react';
import { TimelineItem } from 'vertical-timeline-component-for-react';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import './RecentTimeline.css';

export default function TimelineItems({ details }) {
  const urlDomain = url => {
    let re = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/gim;
    let newUrl = url.split(re)[1].replace('.com', '');
    return newUrl;
  };

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
      <h3 onClick={showModal}>
        {details.title}
        <Modal title="Basic Modal" visible={isModalVisible}>
          <div>{details.desc}</div>
        </Modal>
      </h3>

      <h4 className="cityState">
        {details.city}, {details.state}
      </h4>
      <div className="categories">
        {details.categories.map(element => (
          <span className="category-item" key={nanoid()}>
            {element}
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
