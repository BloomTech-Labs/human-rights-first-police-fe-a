import React, { useEffect, useState } from 'react';

const confirmText = {
  approved: 'Approve incidents?',
  pending: 'Unapprove incidents?',
  rejected: 'Reject incidents?'
};

/**
 * @typedef IncidentStatusProps
 * @property {boolean} isActive - whether or not to show/hide component (or enable/disable)
 * @property {string} listType - which incident list is active (unapproved/approved/form-responses)
 * @property {(newStatus: string) => void} onStatusConfirm - callback function indicating the status type chosen
 */

/**
 *
 * @param {IncidentStatusProps} props
 * @returns
 */
const IncidentStatus = props => {
  const { isActive, listType, onStatusConfirm } = props;

  const [newStatus, setNewStatus] = useState(listType);
  const [isAskConfirm, setIsAskConfirm] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setNewStatus(listType);
      setIsAskConfirm(false);
    }
  }, [isActive, listType]);

  const statusOnClick = (e, status) => {
    e.preventDefault();
    setNewStatus(status);
    setIsAskConfirm(true);
  };

  const cancelOnClick = e => {
    e.preventDefault();
    setIsAskConfirm(false);
  };

  const yesOnClick = e => {
    e.preventDefault();
    onStatusConfirm(newStatus);
  };

  return (
    <div className="dashboard-top-approve-reject"
      style={{ visibility: isActive ? 'visible' : 'collapse' }}>

      {!isAskConfirm &&
        <>
          <span>Change Status:</span>

          {listType === 'pending' &&
            <button
              className='approve-reject-select'
              onClick={e => statusOnClick(e, 'approved')}>
              Approved
            </button>
          }

          {listType === 'approved' &&
            <button
              className='approve-reject-select'
              onClick={e => statusOnClick(e, 'pending')}>
              Pending
            </button>
          }

          <button
            className='approve-reject-select'
            onClick={e => statusOnClick(e, 'rejected')}>
            Rejected
          </button>
        </>
      }

      {isAskConfirm &&
        <>
          <span>{confirmText[newStatus]}</span>

          <button
            className='approve-reject-select'
            onClick={yesOnClick}>
            Yes
          </button>

          <button
            className='approve-reject-select'
            onClick={cancelOnClick}>
            Cancel
          </button>
        </>
      }
    </div>
  );
};

export default IncidentStatus;
