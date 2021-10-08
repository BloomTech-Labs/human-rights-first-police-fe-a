import React, { useEffect, useState } from 'react';


/**
 * @typedef StatusSelectorProps
 * @property {string} listType - which incident list is active (unapproved/approved/form-responses)
 * @property {(newStatus: string) => void} onStatusConfirm - callback function indicating the status type chosen
 */

/**
 * Allows for changing incident status
 *
 * @param {StatusSelectorProps} props
 * @returns
 */
const StatusSelector = props => {
  const { listType, onStatusConfirm } = props;

  // handler for clicking on new status type (pending, approved, rejected)
  const statusOnClick = async (e, status) => {
    onStatusConfirm(status);
  };

  return (
    <div className="dashboard-top-approve-reject">

      <span>Change Status:</span>

      {(listType === 'pending' || listType === 'form-responses') &&
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
    </div>
  );
};

export default StatusSelector;
