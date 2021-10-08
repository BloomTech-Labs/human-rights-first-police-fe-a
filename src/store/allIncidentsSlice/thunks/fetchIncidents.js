import { createAsyncThunk } from '@reduxjs/toolkit';
import { getApprovedIncidents, getFormResponses, getPendingIncidents } from '../../../utils/DashboardHelperFunctions';
import { sanitizeFormResponse } from './util';


/** This thunk fetches incident data */
const actionCreator = createAsyncThunk(
  'allIncidents/fetchIncidents',

  /** @param {FetchIncidentsPayload} payload */
  async (payload, thunkAPI) => {
    const { oktaAxios, type } = payload;

    switch (type) {
      case 'approved':
        return await getApprovedIncidents(oktaAxios);

      case 'pending':
        return await getPendingIncidents(oktaAxios);

      case 'form-responses':
        return await getFormResponses(oktaAxios);

      default:
        return Promise.reject(Error('invalid incident type'));
    }
  }
);


/** @type {import('@reduxjs/toolkit').CaseReducer<AllIncidentsState>} */
const reducer = (state, action) => {
  const incidents = action.payload;
  const type = action.meta.arg.type;

  switch (type) {
    case 'approved':
      state.approvedIncidents = incidents;
      return;

    case 'pending':
      state.pendingIncidents = incidents;
      return;

    case 'form-responses':
      state.formResponses = incidents.map(inc => sanitizeFormResponse(inc));
      return;

    default:
      return;
  }
};


const fetchIncidents = { actionCreator, reducer };
export default fetchIncidents;


/** @typedef {import('..').Incident} Incident */
/** @typedef {import('..').AllIncidentsState} AllIncidentsState */

/**
 * @typedef FetchIncidentsPayload
 * @property {import('axios').AxiosInstance | null} oktaAxios
 * @property {'approved' | 'pending' | 'form-responses'} type
 */
