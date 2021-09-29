import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectListByStatus } from './util';


/** This async thunk is used to delete an incident */
const actionCreator = createAsyncThunk(
	'allIncidents/delete',

	/**
	 * @param {DeleteIncidentPayload} payload
	 * @param {*} thunkAPI
	 * @returns
	 */
	async (payload, thunkAPI) => {
		const { oktaAxios, incident } = payload;

		return await oktaAxios.delete(`/dashboard/incidents/${incident.incident_id}`);
	}
);

/**
 * This will be called when the deleteIncident thunk sucessfully completes
 * because we are using Redux Toolkit, we can safely modify state from within a reducer
 *  @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>}
 */
const reducer = (state, action) => {
	// The incident has just been deleted on the back-end
	// We can either re-fetch or reload, or remove the incident from whichever list it's on
	const { incident } = action.meta.arg;
	const list = selectListByStatus(incident.status, state);

	const index = list.findIndex(inc => inc.incident_id === incident.incident_id);
	list.splice(index, 1);
};

const deleteIncident = { actionCreator, reducer };
export default deleteIncident;

/** @typedef {import('..').Incident} Incident */
/** @typedef {import('..').AllIncidentsState} AllIncidentsState */

/**
 * @typedef DeleteIncidentPayload
 * @property {import('axios').AxiosInstance} oktaAxios
 * @property {Incident} incident
 */
