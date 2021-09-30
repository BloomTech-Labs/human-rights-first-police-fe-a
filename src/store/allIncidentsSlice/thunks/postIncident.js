import { createAsyncThunk } from '@reduxjs/toolkit';


/** this thunk is used for posting an incident to the back-end */
const actionCreator = createAsyncThunk(
	'allIncidents/postIncident',

	/** @param {PostIncidentPayload} payload */
	async (payload, thunkAPI) => {
		const { oktaAxios, incident } = payload;
		return await oktaAxios.post('dashboard/incidents', incident);
	}
);


/** @type {PostIncidentReducer} */
const reducer = (state, action) => {
	// A new incident has just been posted to the back-end
	// it's status should be 'pending'
	// so we can add it into the pending incidents list and resort

	// TODO: Get the new incident id from the backend!

	state.pendingIncidents.push(action.meta.arg.incident);
	state.pendingIncidents.sort((a, b) => a.incident_date > b.incident_date);
};


const postIncident = { actionCreator, reducer };
export default postIncident;


/** @typedef {import('..').Incident} Incident */
/** @typedef {import('..').AllIncidentsState} AllIncidentsState */
/** @typedef {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>} PostIncidentReducer */

/**
 * @typedef PostIncidentPayload
 * @property {import('axios').AxiosInstance} oktaAxios
 * @property {Incident} incident
 */
