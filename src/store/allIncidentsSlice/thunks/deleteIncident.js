import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectListByStatus } from './util';


/** This async thunk is used to delete an incident */
const actionCreator = createAsyncThunk(
  'allIncidents/delete',

  /** @param {DeleteIncidentPayload} payload */
  async (payload, thunkAPI) => {
    const { oktaAxios, incident } = payload;

    return await oktaAxios.delete(`/dashboard/incidents/${incident.incident_id}`);
  }
);


/** @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>} */
const reducer = (state, action) => {
  // The incident has just been deleted on the back-end
  // locally, we need to remove the incident from its list

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
