import { Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const confirmText = {
	approved: 'Approve incidents?',
	pending: 'Unapprove incidents?',
	rejected: 'Reject incidents?'
};

/**
 * @typedef IncidentStatusFormProps
 * @property {boolean} visible
 * @property {string} currentStatus
 * @property {(newStatus: string) => void} onStatusConfirm
 */

/**
 *
 * @param {IncidentStatusFormProps} props
 * @returns
 */
const IncidentStatusForm = props => {
	const { visible, currentStatus, onStatusConfirm } = props;

	const [newStatus, setNewStatus] = useState(currentStatus);
	const [isAskConfirm, setIsAskConfirm] = useState(false);

	useEffect(() => {
		if (!visible) {
			setNewStatus(currentStatus);
			setIsAskConfirm(false);
		}
	}, [visible, currentStatus]);

	const newStatusChange = e => {
		setNewStatus(e.target.value);
	};

	const submitOnClick = e => {
		e.preventDefault();
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
			style={{ visibility: visible ? 'visible' : 'collapse' }}>

			{!isAskConfirm &&
				<>
					<Radio.Group onChange={newStatusChange} value={newStatus}>
						<Radio value='pending' >Pending</Radio>
						<Radio value='approved'>Approved</Radio>
						<Radio value='rejected'>Rejected</Radio>
					</Radio.Group>

					<button
						className='approve-reject-select'
						onClick={submitOnClick}>
						Set Status
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

export default IncidentStatusForm;
