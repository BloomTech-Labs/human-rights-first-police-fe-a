import React from 'react';
import { Button, notification } from 'antd';

// This component displays a notification when in mobile view letting the user know that the site is not optimized for mobile.
const MobileNotification = () => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  notification.open({
    message: 'Notification',
    description:
      'This site is currently not optomized for mobile view. Mobile optimization coming soon.',
    btn,
    key,
  });
  notification.config({
    placement: 'topRight',
    duration: null,
  });

  return MobileNotification;
};

export default React.memo(MobileNotification);
