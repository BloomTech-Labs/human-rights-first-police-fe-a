import { useThunkDispatch, allIncidentActions } from '..';
import changeStatus from './thunks/changeStatus';
import deleteIncident from './thunks/deleteIncident';
import fetchIncidents from './thunks/fetchIncidents';
import editIncident from './thunks/editIncident';
import postIncident from './thunks/postIncident';

/**
 * Wraps a dispatch in a promise, so dispatch(action(payload)) can be followed with .then() or .catch()
 * @param {*} dispatch
 * @returns
 */
const promiseDispatch = (dispatch) => {

  /**
   * Dispatches the given action and returns a promise that resolves or rejects if the action is sucessful or not
   * @param {import("redux").AnyAction} action
   * @returns {Promise<any>}
   */
  const pd = (action) => {
    return new Promise((resolve, reject) => {
      dispatch(action)
        .then(res => {
          if (res.error) {      // this is here because in redux toolkit, thunks resolve with an Error rather than reject
            reject(res.error);
          }
          else {
            resolve(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  return pd;
};

/**
 * EasyMode
 * Takes care of dispatch for any allIncidentSlice-related actions that don't require auth
 */
export const useEasyMode = () => {
  const dispatch = promiseDispatch(useThunkDispatch());

  const easyMode = {
    fetchIncidents: () => {
      dispatch(fetchIncidents.actionCreator({ type: 'approved' }));
    }
  };

  return easyMode;
};

/**
 * EasyModeAuth
 * Takes care of dispatch and auth for any allIncidentsSlice-related actions
 * @param {*} oktaAxios - an authorized axios object (useOktaAxios())
 * @returns {EasyModeAuth}
 */
export const useEasyModeAuth = (oktaAxios) => {
  const dispatch = promiseDispatch(useThunkDispatch());

  /** @type {EasyModeAuth} */
  const easyMode = {
    fetchIncidents: (type) => {
      return dispatch(fetchIncidents.actionCreator({ oktaAxios, type }));
    },

    editIncident: (incident) => {
      return dispatch(editIncident.actionCreator({ oktaAxios, incident }));
    },

    postIncident: (incident) => {
      return dispatch(postIncident.actionCreator({ oktaAxios, incident }));
    },

    deleteIncident: (incident) => {
      return dispatch(deleteIncident.actionCreator({ oktaAxios, incident }));
    },

    changeIncidentsStatus: (incidentIds, oldStatus, newStatus) => {
      return dispatch(changeStatus.actionCreator({ oktaAxios, incidentIds, oldStatus, newStatus }));
    },

    setErrorMessage: (message) => {
      return dispatch(allIncidentActions.actions.setErrorMessage(message));
    }
  };

  return easyMode;
};

/** @typedef {import('.').Incident} Incident */

/**
 * @typedef EasyModeAuth
 * @property {(type: 'approved' | 'pending' | 'form-responses') => Promise<any>} fetchIncidents - fetches the specified incidents (GET)
 * @property {(incident: Incident) => Promise<any>} editIncident - changes the properties of an incident (PUT)
 * @property {(incident: Incident) => Promise<any>} postIncident - creates a new incident (POST)
 * @property {(incident: Incident) => Promise<any>} deleteIncident - deletes an incident (DELETE)
 * @property {(incidentIds: number[], oldStatus: string, newStatus: string) => Promise<any>} changeIncidentsStatus - changes the status of the specified incidents
 * @property {(message: string) => Promise<any>} setErrorMessage - sets the error message
 */
