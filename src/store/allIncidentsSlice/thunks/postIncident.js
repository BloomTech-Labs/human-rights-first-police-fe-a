import { createAsyncThunk } from '@reduxjs/toolkit';

/** @typedef {import('../../store/allIncidentsSlice').Incident} Incident */
/** @typedef {import('../../allIncidentsSlice').AllIncidentsState} AllIncidentsState */


/** this thunk is used for posting an incident to the back-end */
const actionCreator = createAsyncThunk(
	'dashboard/postIncident',
	async (payload, thunkAPI) => {
		console.log('postIncident thunk');
		const { oktaAxios, incident } = payload;
		console.log(incident);
		return await oktaAxios
			.post('dashboard/incidents', incident);
	}
);

/**
 * This will be called when the postIncidentThunk sucessfully completes
 * because we are using Redux Toolkit, we can safely modify state from within a reducer
 *  @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>}
 */
const reducer = (state, action) => {
	console.log('postIncident reducer');

	// A new incident has just been posted to the back-end
	// it's status should be 'pending'
	// so we can add it into the pending incidents list and resort

	state.pendingIncidents.push(action.meta.arg.incident);
	state.pendingIncidents.sort((a, b) => a.incident_date > b.incident_date);
};

const postIncident = { actionCreator, reducer };
export default postIncident;
