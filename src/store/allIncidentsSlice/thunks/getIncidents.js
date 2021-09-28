import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApprovedIncidents, getFormResponses, getPendingIncidents } from '../../../utils/DashboardHelperFunctions';

/** @typedef {import('../../allIncidentsSlice').Incident} Incident */
/** @typedef {import('../../allIncidentsSlice').AllIncidentsState} AllIncidentsState */

/** This Thunk fetches all incident data */
const actionCreator = createAsyncThunk(
	'dashboard/fetchAllIncidents',
	async (oktaAxios, thunkAPI) => {
		console.log('fetch thunk');
		if (oktaAxios) {
			console.log('fetch thunk a');
			const approved = await getApprovedIncidents(oktaAxios);
			const pending = await getPendingIncidents(oktaAxios);
			const formResponses = await getFormResponses(oktaAxios);

			return { approved, pending, formResponses };
		}
		else {
			console.log('fetch thunk b');
			const approved = await getApprovedIncidents();
			const pending = [];
			const formResponses = [];

			return { approved, pending, formResponses };
		}
	}
);

/**
 * this will be called when the fetchAllIncidents thunk is fulfilled
 * because we are using Redux Toolkit, we can safely modify state from within a reducer
 *  @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>}
 */
const reducer = (state, action) => {
	console.log('fetch reducer');
	const { approved, pending, formResponses } = action.payload;
	state.approvedIncidents = approved;
	state.pendingIncidents = pending;
	state.formResponses = formResponses;
};

const getIncidents = { actionCreator, reducer };
export default getIncidents;
