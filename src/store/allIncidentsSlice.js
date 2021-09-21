import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import api from '../utils/apiHelpers';
import { splitIncidentsByIds } from '../utils/DashboardHelperFunctions';



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

// These 'matcher' functions are used by the reducer to match Thunk lifecycle events
const isPendingAction = (action) => action.type.endsWith('/pending');
const isFulfilledAction = (action) => action.type.endsWith('/fulfilled');
const isRejectedAction = (action) => action.type.endsWith('/rejected');

/**
 * This Thunk fetches all incident data
 */
export const fetchAllIncidentsThunk = createAsyncThunk(
	'dashboard/fetchAllIncidents',
	async (oktaAxios, thunkAPI) => {
		const approved = await api.getApprovedIncidents(oktaAxios);
		const pending = await api.getPendingIncidents(oktaAxios);
		const formResponses = await api.getFormResponses(oktaAxios);

		return { approved, pending, formResponses };
	}
);

/**
 * this will be called when the fetchAllIncidents thunk is fulfilled
 * because we are using Redux Toolkit, we can safely modify state from within a reducer
 *  @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>}
 */
const fetchAllReducer = (state, action) => {
	const { approved, pending, formResponses } = action.payload;
	state.approvedIncidents = approved;
	state.pendingIncidents = pending;
	state.formResponses = formResponses;
};

/**
 * This Thunk changes the status for the specified incidents
 */
export const setStatusThunk = createAsyncThunk(
	'dashboard/changeStatus',
	async (payload, thunkAPI) => {
		const { oktaAxios, incidentIds, newStatus } = payload;
		return await api.changeIncidentsStatus(oktaAxios, incidentIds, newStatus);
	}
);

/**
 * this will be called when the setStatus thunk is fulfilled
 * because we are using Redux Toolkit, we can safely modify state from within a reducer
 *  @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>}
 */
const setStatusReducer = (state, action) => {
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

/**
 * This thunk is used for editing the properties of an incident
 */
export const editIncidentThunk = createAsyncThunk(
	'dashboard/editIncident',
	async (payload, thunkAPI) => {
		const { oktaAxios, incident } = payload;

		return await oktaAxios
			.put('dashboard/incidents', incident);
	}
);

/**
 * this will be called after an incidents properties are edited
 * because we are using Redux Toolkit, we can safely modify state from within a reducer
 *  @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>}
 */
const editIncidentReducer = (state, action) => {
	console.log(action.payload);

	// So an incident has just been PUT to the incidents endpoint sucessfully
	// locally, state needs to be updated with the incident's new values

	// if you having trouble keeping local state in sync with the server
	// this can be removed, and instead re-fetch all incident data after any changes are made.

	/** @type {Incident} */
	const incident = action.payload.incident;
	const list = selectListByStatus(incident.status, state);
	const index = list.findIndex(inc => inc.incident_id === incident.inciden_id);

	if (index !== -1) {
		list[index] = incident;
	}
	else {
		throw Error("something wierd happened....");
	};
};


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
		// since all the actions here are async thunks, there are no reducers here
	},
	extraReducers: (builder) => {
		// these set up the case reducers for each thunk, called after they successfully complete
		// https://redux-toolkit.js.org/api/createreducer/#builderaddcase
		builder.addCase(fetchAllIncidentsThunk.fulfilled, fetchAllReducer);
		builder.addCase(setStatusThunk.fulfilled, setStatusReducer);
		builder.addCase(editIncidentThunk.fulfilled, editIncidentReducer);

		// in Redux Toolkit, thunks created with createAsyncThunk will generate 3 actions representing
		// the lifecycle of an async thunk: pending, fulfilled, rejected
		// https://redux-toolkit.js.org/api/createAsyncThunk

		// For any Thunk 'pending' actions, set isLoading to true
		builder.addMatcher(isPendingAction, (state, action) => {
			state.isLoading = true;
		});

		// For any Thunk 'fulfilled' actions, set isLoading to false
		builder.addMatcher(isFulfilledAction, (state, action) => {
			state.isLoading = false;
		});

		// For any Thunk 'rejected' actions, set isLoading to false
		builder.addMatcher(isRejectedAction, (state, action) => {
			state.isLoading = false;
			state.errorMessage = action.error.message;
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
			dispatch(fetchAllIncidentsThunk(oktaAxios));
		},
		/**
		 * Say cheese
		 * @param {Incident[]} incidents
		 * @returns {Promise<void>}
		 */
		modifyIncidents: (incidents) => {
			return dispatch(editIncidentThunk({ oktaAxios, incidents }));
		},
		changeIncidentsStatus: (incidentIds, oldStatus, newStatus) => {
			return dispatch(setStatusThunk({ oktaAxios, incidentIds, oldStatus, newStatus }));
		}
	};

	return easyMode;
};
