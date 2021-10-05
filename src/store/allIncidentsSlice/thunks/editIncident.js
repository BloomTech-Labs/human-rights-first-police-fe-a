import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectListByStatus } from './util';


/** This async thunk is used for editing the properties of an incident */
const actionCreator = createAsyncThunk(
  'allIncidents/editIncident',

  /** @param {EditIncidentPayload} payload */
  async (payload, thunkAPI) => {
    const { oktaAxios, incident } = payload;

    return await oktaAxios.put('dashboard/incidents', [incident]);
  }
);


/** @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>} */
const reducer = (state, action) => {
  // An incident has just been PUT to the incidents endpoint sucessfully
  // locally, state needs to be updated with the incident's new values

  const incident = action.meta.arg.incident;
  const list = selectListByStatus(incident.status, state);
  const index = list.findIndex(inc => inc.incident_id === incident.incident_id);

  if (index !== -1) {
    list[index] = incident;
  }
};


const editIncident = { actionCreator, reducer };
export default editIncident;


/** @typedef {import('..').Incident} Incident */
/** @typedef {import('..').AllIncidentsState} AllIncidentsState */

/**
 * @typedef EditIncidentPayload
 * @property {import('axios').AxiosInstance} oktaAxios
 * @property {Incident} incident
 */
