import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import useOktaAxios from '../hooks/useOktaAxios';
import { putIncidents, selectIncidentsByIds, splitIncidentsByIds } from '../utils/DashboardHelperFunctions';

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
	formResponses: [],
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

export const editIncident = createAsyncThunk(
	'dashboard/editIncident',
	async (payload, thunkAPI) => {
		const { oktaAxios, incident } = payload;

		return await oktaAxios
			.put('dashboard/incidents', incident);
	}
);

export const changeIncidentsStatus = createAsyncThunk(
	'dashboard/changeStatus',
	async (payload, thunkAPI) => {
		const { oktaAxios, incidentIds, oldStatus, newStatus } = payload;
		const list = selectListByStatus(oldStatus, thunkAPI.getState().allIncidents);
		const selected = selectIncidentsByIds(list, incidentIds, true);

		return await putIncidents(oktaAxios, selected, newStatus);
	}
);

/**
 *
 * @param {string} status
 * @param {AllIncidentsState} state
 * @returns {Incident[]}
 */
function selectListByStatus(status, state) {
	switch (status) {
		case 'pending':
			return state.pendingIncidents;
		case 'approved':
			return state.approvedIncidents;
		case 'form-responses':
			return state.formResponses;
		default:
			return null;
	}
}

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

		builder.addCase(editIncident.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(editIncident.fulfilled, (state, action) => {
			state.isLoading = false;
			console.log(action.payload);

			// So an incident has just been PUT to the incidents endpoint sucessfully
			// We can either fetch all the data again
			// or just update the current state

			/** @type {Incident} */
			const incident = action.payload.incidents;
			const list = selectListByStatus(incident.status, state);
			const index = list.findIndex(inc => inc.incident_id === incident.inciden_id);

			if (index !== -1) {
				// because we are using Redux Toolkit, we can safely modify state from within a reducer
				list[index] = incident;
			}
			else {
				throw Error("I don't know");
			};
		});
		builder.addCase(editIncident.rejected, (state, action) => {
			state.errorMessage = action.error.message;
			state.isLoading = false;
		});

		builder.addCase(changeIncidentsStatus.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(changeIncidentsStatus.fulfilled, (state, action) => {
			const { incidentIds, oldStatus, newStatus } = action.meta.arg;

			// incidents have just been PUT to the server with the status property changed
			// we can re-fetch all the data
			// or remove the incidents from their old list, insert them into their new list, and sort

			let split;

			if (oldStatus === 'pending') {
				split = splitIncidentsByIds(state.pendingIncidents, incidentIds);
				state.pendingIncidents = split.source;
			}
			else if (oldStatus === 'approved') {
				split = splitIncidentsByIds(state.approvedIncidents, incidentIds);
				state.approvedIncidents = split.source;
			}

			if (newStatus !== 'rejected') {
				const newList = selectListByStatus(newStatus, state);

				split.selected.forEach(inc => {
					inc.status = newStatus;
					newList.push(inc);
				});

				newList?.sort((a, b) => a.incident_date > b.incident_date);
			}

			state.isLoading = false;
		});
		builder.addCase(changeIncidentsStatus.rejected, (state, action) => {
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

export const useEasyMode = (oktaAxios) => {
	const { state, dispatch } = useAllIncidents();

	const easyMode = {
		state,
		fetchAll: () => {
			dispatch(fetchAllIncidents(oktaAxios));
		},
		/**
		 * Say cheese
		 * @param {Incident[]} incidents
		 * @returns {Promise<void>}
		 */
		modifyIncidents: (incidents) => {
			return dispatch(editIncident({ oktaAxios, incidents }));
		},
		changeIncidentsStatus: (incidentIds, oldStatus, newStatus) => {
			return dispatch(changeIncidentsStatus({ oktaAxios, incidentIds, oldStatus, newStatus }));
		}
	};

	return easyMode;
};
