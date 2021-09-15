import { Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const confirmText = {
	approved: 'Approve incidents?',
	pending: 'Unapprove incidents?',
	rejected: 'Reject incidents?'
};

/**
 * @typedef IncidentStatusProps
 * @property {boolean} visible
 * @property {string} currentStatus
 * @property {(newStatus: string) => void} onStatusConfirm
 */

/**
 *
 * @param {IncidentStatusProps} props
 * @returns
 */
const IncidentStatus = props => {
	const { visible, currentStatus, onStatusConfirm } = props;

	const [newStatus, setNewStatus] = useState(currentStatus);
	const [isAskConfirm, setIsAskConfirm] = useState(false);

	useEffect(() => {
		if (!visible) {
			setNewStatus(currentStatus);
			setIsAskConfirm(false);
		}
	}, [visible, currentStatus]);

	const statusOnClick = (e, status) => {
		e.preventDefault();
		setNewStatus(e.target.value);
		setIsAskConfirm(true);
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

			<span>Change Status:</span>

			{!isAskConfirm &&
				<>
					{currentStatus === 'pending' &&
						<button
							className='approve-reject-select'
							onClick={e => statusOnClick(e, 'approved')}>
							Approve
						</button>
					}

					{currentStatus === 'approved' &&
						<button
							className='approve-reject-select'
							onClick={e => statusOnClick(e, 'approved')}>
							Unapproved
						</button>
					}

					<button
						className='approve-reject-select'
						onClick={e => statusOnClick(e, 'approved')}>
						Reject
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
