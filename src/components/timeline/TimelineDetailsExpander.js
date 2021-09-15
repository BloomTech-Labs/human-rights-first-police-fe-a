import { DownOutlined, UpOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const TimelineDetailsExpander = props => {
  const { children } = props;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {isVisible ? (
        <div>
          {children}
          <UpOutlined
            className="timeline-button"
            onClick={() => setIsVisible(false)}
          />
        </div>
      ) : (
        <DownOutlined
          className="timeline-button"
          onClick={() => setIsVisible(true)}
        />
      )}
    </>
  );
};

export default TimelineDetailsExpander;
