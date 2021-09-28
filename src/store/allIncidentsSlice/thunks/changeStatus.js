import { createAsyncThunk } from '@reduxjs/toolkit';
import { changeIncidentsStatus, splitIncidentsByIds } from '../../../utils/DashboardHelperFunctions';
import { selectListByStatus } from './util';

/** @typedef {import('../../store/allIncidentsSlice').Incident} Incident */
/** @typedef {import('..').AllIncidentsState} AllIncidentsState */

/** This Thunk changes the status for the specified incidents */
const actionCreator = createAsyncThunk(
	'dashboard/changeStatus',
	async (payload, thunkAPI) => {
		console.log('setStatus thunk');
		const { oktaAxios, incidentIds, newStatus } = payload;
		return await changeIncidentsStatus(oktaAxios, incidentIds, newStatus);
	}
);

/**
 * this will be called when the setStatus thunk is fulfilled
 * because we are using Redux Toolkit, we can safely modify state from within a reducer
 *  @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>}
 */
const reducer = (state, action) => {
	console.log('setStatus reducer');
	const { incidentIds, oldStatus, newStatus } = action.meta.arg;

	// incidents have just been PUT to the server with the status property changed
	// locally, those incidents need to be moved from one list to another
	// ie: after approving incident_id:8003, it should be removed from pendingIncidents and inserted into approvedIncidents

	// if you having trouble keeping local state in sync with the server
	// this can be removed, and instead re-fetch all incident data after any changes are made.


	// removing the specified incidents from their original list
	let split;
	if (oldStatus === 'pending') {
		split = splitIncidentsByIds(state.pendingIncidents, incidentIds);
		state.pendingIncidents = split.source;
	}
	else if (oldStatus === 'approved') {
		split = splitIncidentsByIds(state.approvedIncidents, incidentIds);
		state.approvedIncidents = split.source;
	}

	// adding the specified incidents to their new list (unless they have been rejected)
	if (newStatus !== 'rejected') {
		const newList = selectListByStatus(newStatus, state);

		split.selected.forEach(inc => {
			inc.status = newStatus;
			newList.push(inc);
		});

		newList?.sort((a, b) => a.incident_date > b.incident_date);
	}
};

const changeStatus = { actionCreator, reducer };
export default changeStatus;
