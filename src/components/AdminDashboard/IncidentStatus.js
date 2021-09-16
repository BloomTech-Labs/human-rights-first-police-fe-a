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
		setNewStatus(e.target.value);
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

			<span>Change Status:</span>

			{!isAskConfirm &&
				<>
					{listType === 'pending' &&
						<button
							className='approve-reject-select'
							onClick={e => statusOnClick(e, 'approved')}>
							Approve
						</button>
					}

					{listType === 'approved' &&
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
