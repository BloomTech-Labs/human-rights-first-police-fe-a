import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

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
 * @property {boolean} isLoading
 * @property {string} errorMessage
 * @property {Incident[]} approvedIncidents
 * @property {Incident[]} pendingIncidents
 * @property {Incident[]} formResponses
 */

/** @type {AllIncidentsState} */
const initialState = {
	isLoading: false,
	errorMessage: '',
	approvedIncidents: [],
	pendingIncidents: [],
	formResponses: []
};


export const fetchAllIncidents = createAsyncThunk(
	'dashboard/fetchAllIncidents',
	async (oktaAxios, thunkAPI) => {
		const approved = await getApprovedIncidents(oktaAxios);
		const pending = await getPendingIncidents(oktaAxios);
		const formResponses = await getFormResponses(oktaAxios);

		return { approved, pending, formResponses };
	}
);

export const modifyIncidents = createAsyncThunk(
	'dashboard/modifyIncidents',
	async (payload, thunkAPI) => {
		const { oktaAxios, incidents } = payload;
		
	}
)

export const slice = createSlice({
	name: 'allIncident',
	initialState,
	reducers: {

	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllIncidents.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAllIncidents.fulfilled, (state, action) => {
			const { approved, pending, formResponses } = action.payload;
			state.approvedIncidents = approved;
			state.pendingIncidents = pending;
			state.formResponses = formResponses;
			state.isLoading = false;
		});
		builder.addCase(fetchAllIncidents.rejected, (state, action) => {
			state.errorMessage = action.error.message;
			state.isLoading = false;
		});
	}
});

/**
 *
 * @returns {{state: AllIncidentsState, dispatch: import('redux').Dispatch<any>}}
 */
export const useAllIncidents = () => {
	const state = useSelector(state => state.allIncidents);
	const dispatch = useDispatch();

	return { state, dispatch };
};
