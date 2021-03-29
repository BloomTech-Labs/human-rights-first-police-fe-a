import React, { useState } from 'react';
import CompleteIncident from './CompleteIncident';

const ApprovedIncident = ({ item }) => {
  const [moreInfo, setMoreInfo] = useState(false);

  const toggleMoreInfo = () => {
    setMoreInfo(!moreInfo);
  };

  const [year, month, day] = item.date.split('-');
  const formattedDate = `${month}/${day.slice(0, 2)}/${year}`;

  return (
    <>
      <div className="incident-info-text-wrap">
        <p className="incident-info" id="incident-description">
          {item.desc.split('http')[0]}
        </p>

        <p className="incident-info">{item.city}</p>

        <p className="incident-info">{formattedDate}</p>

        <p className="incident-info more-info" onClick={toggleMoreInfo}>
          {moreInfo ? 'Less Info' : 'More Info'}
        </p>
      </div>
      {moreInfo && (
        <CompleteIncident
          incident={item}
          formattedDate={formattedDate}
          setMoreInfo={setMoreInfo}
        />
      )}
    </>
  );
};

export default ApprovedIncident;
