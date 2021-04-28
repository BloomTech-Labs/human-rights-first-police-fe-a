import React, { useState } from 'react';
import CompleteIncident from './CompleteIncident';
import axios from 'axios';

const ApprovedIncident = ({ item }) => {
  const [moreInfo, setMoreInfo] = useState(false);

  const toggleMoreInfo = () => {
    setMoreInfo(!moreInfo);
  };

  const handleDelete = id => {
    if (window.confirm('Delete the item?')) {
      axios
        .delete(`${process.env.REACT_APP_BACKENDURL}/incidents/${id}`)
        .then(res => {
          window.alert(`Case with id ${id} successfully deleted`);
        })
        .catch(err => {
          window.alert(`Case with id ${id} successfully deleted`);
        });
    }
  };

  const [year, month, day] = item.date.split('-');
  const formattedDate = `${month}/${day.slice(0, 2)}/${year}`;

  return (
    <>
      <div
        style={{ border: '1px solid #e3e8ee', borderRadius: 5 }}
        className="incident-info-text-wrap"
      >
        <p className="incident-info" id="incident-description">
          {item.desc.split('http')[0]}
        </p>

        <p className="incident-info">{item.city}</p>

        <p className="incident-info">{formattedDate}</p>

        <p className="incident-info more-info" onClick={toggleMoreInfo}>
          {moreInfo ? '-' : '+'}
        </p>
        <button
          style={{
            color: 'red',
            marginLeft: 25,
            border: 'none',
            backgroundColor: 'white',
            fontSize: '1.2rem',
          }}
          onClick={() => handleDelete(item.id)}
        >
          x
        </button>
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
