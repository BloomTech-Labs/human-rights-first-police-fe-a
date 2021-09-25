import React from 'react';

// gives the active tab a different color
const selectedTabButtonStyle = {
	background: '#095fab'
};

/**
 * @typedef ListSelectorProps
 * @property {'pending' | 'approved' | 'form-responses'} listType - the currently displayed incident list
 * @property {React.Dispatch<React.SetStateAction<'pending' | 'approved' | 'form-responses'>>} setListType - the state setter for the currently displayed incident list
 */

/**
 * This component allows for switching between different incident types on the AdminDashboard
 *
 * @param {ListSelectorProps} props
 * @return {*}
 */
const ListSelector = props => {
	const { listType, setListType } = props;

	return (
		<div className="dashboard-buttons-container">
			<div className="incident-btn-container">
				<button
					className="approve-btn"
					style={listType === 'pending' ? selectedTabButtonStyle : {}}
					onClick={() => setListType('pending')}
				>
					Pending Incidents
				</button>
				<button
					className="approve-btn"
					style={listType === 'approved' ? selectedTabButtonStyle : {}}
					onClick={() => setListType('approved')}
				>
					Approved Incidents
				</button>
				<button
					className="approve-btn"
					style={listType === 'form-responses' ? selectedTabButtonStyle : {}}
					onClick={() => setListType('form-responses')}
				>
					Form Responses
				</button>
			</div>
		</div>
	);
};

export default ListSelector;
