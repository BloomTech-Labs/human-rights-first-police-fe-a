import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import changeStatus from './thunks/changeStatus';
import deleteIncident from './thunks/deleteIncident';
import getIncidents from './thunks/getIncidents';
import editIncident from './thunks/editIncident';
import postIncident from './thunks/postIncident';

// These JsDoc type definitions are for the Incident object and allIncidentsState
// and enables intellisense and auto-complete where possible

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

// These 'matcher' functions are used by the reducer to match thunk lifecycle events
const isPendingAction = (action) => action.type.endsWith('/pending');
const isFulfilledAction = (action) => action.type.endsWith('/fulfilled');
const isRejectedAction = (action) => action.type.endsWith('/rejected');

// https://redux-toolkit.js.org/api/createSlice
export const slice = createSlice({
  name: 'allIncident',
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    }
  },
  extraReducers: (builder) => {
    // these set up the case reducers for each thunk, called after they successfully complete
    // https://redux-toolkit.js.org/api/createreducer/#builderaddcase
    builder.addCase(getIncidents.actionCreator.fulfilled, getIncidents.reducer);
    builder.addCase(changeStatus.actionCreator.fulfilled, changeStatus.reducer);
    builder.addCase(editIncident.actionCreator.fulfilled, editIncident.reducer);
    builder.addCase(postIncident.actionCreator.fulfilled, postIncident.reducer);
    builder.addCase(deleteIncident.actionCreator.fulfilled, deleteIncident.reducer);


    // in Redux Toolkit, thunks created with createAsyncThunk will generate 3 separate actions representing
    // the lifecycle of an async thunk: pending, fulfilled, and rejected
    // https://redux-toolkit.js.org/api/createAsyncThunk

    // Also note that in Redux Toolkit, it is safe to modify state from inside a reducer (created with createSlice)

    // For any thunk 'pending' actions, set isLoading to true
    builder.addMatcher(isPendingAction, (state, action) => {
      console.log('reducer match pending');
      state.isLoading = true;
      state.errorMessage = '';
    });

    // For any thunk 'fulfilled' actions, set isLoading to false
    builder.addMatcher(isFulfilledAction, (state, action) => {
      console.log('reducer match fulfilled');
      state.isLoading = false;
      state.errorMessage = '';
    });

    // For any thunk 'rejected' actions, set errorMessage and isLoading to false
    builder.addMatcher(isRejectedAction, (state, action) => {
      console.log('reducer match rejected');
      state.isLoading = false;
      state.errorMessage = action.error.message;
    });
  }
});

export default slice;

/**
 *
 * @returns {AllIncidentsState}}
 */
export const useAllIncidents = () => {
  return useSelector(state => state.allIncidents);
};
