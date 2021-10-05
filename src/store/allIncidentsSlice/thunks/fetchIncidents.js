import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApprovedIncidents, getFormResponses, getPendingIncidents } from '../../../utils/DashboardHelperFunctions';


/** This thunk fetches all incident data */
const actionCreator = createAsyncThunk(
  'allIncidents/fetchAllIncidents',

  /** @param {GetIncidentsPayload} payload */
  async (payload, thunkAPI) => {
    const { oktaAxios } = payload;

    // if called with an authorized oktaAxios, all incidents will be retrieved
    if (oktaAxios) {
      const approved = await getApprovedIncidents(oktaAxios);
      const pending = await getPendingIncidents(oktaAxios);
      const formResponses = await getFormResponses(oktaAxios);

      return { approved, pending, formResponses };
    }

    // if not authorized, just the approved incidents will be retrieved
    else {
      const approved = await getApprovedIncidents();
      const pending = [];
      const formResponses = [];

      return { approved, pending, formResponses };
    }
  }
);


/** @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>} */
const reducer = (state, action) => {
  const { approved, pending, formResponses } = action.payload;
  state.approvedIncidents = approved;
  state.pendingIncidents = pending;
  state.formResponses = formResponses;
};


const fetchIncidents = { actionCreator, reducer };
export default fetchIncidents;


/** @typedef {import('..').Incident} Incident */
/** @typedef {import('..').AllIncidentsState} AllIncidentsState */

/**
 * @typedef GetIncidentsPayload
 * @property {import('axios').AxiosInstance | null} oktaAxios
 */
