import React, { useState } from 'react';
import './Modal.css';

export const Modal = props => {
  const { unapprovedIncidents, modalHandler, showModal } = props;
  return (
    <div
      className="modal-wrapper"
      style={{
        display: showModal ? 'block' : 'none',
      }}
    >
      <div className="modal-header">
        <p>Welcome</p>
      </div>
      <div className="modal-content">
        <div className="modal-body">
          <h4>Note: </h4>
          <p>
            There are currently{' '}
            <span
              style={{
                color: 'red',
              }}
            >
              {unapprovedIncidents.length}
            </span>{' '}
            unapproved incidents are awaiting your review. 'Select All' to
            approve all incidents with the click of a button or alternatively,
            select 'More Info' to inspect, edit, approve or disapprove incidents
            1 by 1.
          </p>
          <p>
            You can manually create an incident by using the 'Create New
            Incident' button
          </p>
        </div>
        <div className="modal-footer">
          <button onClick={modalHandler} className="btn-cancel">
            Close
          </button>
          {/* <div className="modal-checkbox">
            <label>Do not show this again</label>
            <input
              type="checkbox"
              value={checked}
              onChange={() => setChecked(checked => !checked)}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
