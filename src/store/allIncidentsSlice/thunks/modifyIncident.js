import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectListByStatus } from './util';

/** @typedef {import('../../store/allIncidentsSlice').Incident} Incident */
/** @typedef {import('../../allIncidentsSlice').AllIncidentsState} AllIncidentsState */




/**
 * This thunk is used for editing the properties of an incident
 */
const actionCreator = createAsyncThunk(
	'dashboard/editIncident',
	async (payload, thunkAPI) => {
		console.log('editIncident thunk');
		const { oktaAxios, incident } = payload;

		return await oktaAxios
			.put('dashboard/incidents', [incident]);
	}
);

/**
 * this will be called after an incidents properties are edited
 * because we are using Redux Toolkit, we can safely modify state from within a reducer
 *  @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>}
 */
const reducer = (state, action) => {
	console.log(action.payload);
	console.log('editIncident reducer');

	// So an incident has just been PUT to the incidents endpoint sucessfully
	// locally, state needs to be updated with the incident's new values

	// if you having trouble keeping local state in sync with the server
	// this can be removed, and instead re-fetch all incident data after any changes are made.

	/** @type {Incident} */
	const incident = action.meta.arg.incident;
	const list = selectListByStatus(incident.status, state);
	const index = list.findIndex(inc => inc.incident_id === incident.incident_id);

	if (index !== -1) {
		list[index] = incident;
	}
	else {
		throw Error("something wierd happened....");
	};
};

const modifyIncident = { actionCreator, reducer };
export default modifyIncident;
