import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * Returns a promise that resolves to an array of pending incidents
 *
 * @param {import('axios').AxiosInstance} oktaAxios
 * @returns {Promise<Incident[]>} all pending incidents
 */
export function getPendingIncidents(oktaAxios) {
	return oktaAxios.get('/dashboard/incidents')
		.then(res => {
			return res.data;
		});
}

/**
 * Returns a promise that resolves to an array of approved incidents
 *
 * @param {import('axios').AxiosInstance} oktaAxios
 * @returns {Promise<Incident[]>} all approved incidents
 */
export function getApprovedIncidents(oktaAxios) {
	return oktaAxios.get('/dashboard/incidents/approved')
		.then(res => {
			return res.data;
		});
}

/**
 * Returns a promise that resolves to an array of approved incidents
 *
 * @param {import('axios').AxiosInstance} oktaAxios
 * @returns {Promise<Incident[]>} all approved incidents
 */
export function getFormResponses(oktaAxios) {
	return oktaAxios.get('http://hrf-bw-labs37-dev.eba-hz3uh94j.us-east-1.elasticbeanstalk.com/to-approve')
		.then(res => {
			return res.data;
		});
}

/**
 * @typedef Incident
 * @property {number} incident_id
 * @property {string} incident_date
 * @property {string} tweet_id
 * @property {string} user_name
 * @property {string} description
 * @property {string | null} city
 * @property {string | null} state
 * @property {number | null} lat
 * @property {number | null} long
 * @property {string | null} title
 * @property {string} force_rank
 * @property {'pending' | 'approved' | 'rejected' } status
 * @property {number} confidence
 * @property {string[]} tags
 * @property {string[]} src
 */

/**
 * @typedef AllIncidentsState
 * @property {Incident[]} approvedIncidents
 * @property {Incident[]} pendingIncidents
 * @property {Incident[]} formResponses
 */

/** @type {AllIncidentsState} */
const initialState = {
	approvedIncidents: [],
	pendingIncidents: [],
	formResponses: []
};


const fetchApproveIncidents = createAsyncThunk(
	'dashboard/incidents',
	async (oktaAxios, thunkAPI) => {
		return await getApprovedIncidents(oktaAxios);
	}
);

const slice = createSlice({
	name: 'allIncident',
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder.addCase(fetchApproveIncidents.fulfilled, (state, action) => {
			state.approvedIncidents = action.payload;
		});
	}
});

export default slice;
