import { useThunkDispatch, allIncidentActions } from '..';
import changeStatus from './thunks/changeStatus';
import deleteIncident from './thunks/deleteIncident';
import getIncidents from './thunks/getIncidents';
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
    console.log('creating a promise to dispatch in');
    return new Promise((resolve, reject) => {
      dispatch(action)
        .then(res => {
          if (res.error) {
            console.log('dispatch -> then -> reject');
            reject(res.error);
          }
          else {
            console.log('dispatch -> then -> resolve');
            resolve(res);
          }
        })
        .catch(err => {
          console.log('dispatch -> catch');
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
      console.log('easy fetch');
      dispatch(getIncidents.actionCreator());
    }
  };

  return easyMode;
};

/**
 * EasyModeAuth
 * Takes care of dispatch and auth for any allIncidentsSlice-related actions
 * @param {*} oktaAxios - an authorized axios object (useOktaAxios())
 * @returns
 */
export const useEasyModeAuth = (oktaAxios) => {
  const dispatch = promiseDispatch(useThunkDispatch());

  const easyMode = {
    /**
     * fetches all incidents (approved, pending, and form-responses) from the back-end
     * (GET request)
     *
     * @returns {Promise<any>}
     */
    fetchIncidents: () => {
      console.log('easy mode auth fetch');
      return dispatch(getIncidents.actionCreator(oktaAxios));
    },

    /**
     * Modifies an incident (PUT request)
     *
     * @param {import('.').Incident} incident
     * @returns
     */
    editIncident: (incident) => {
      return dispatch(editIncident.actionCreator({ oktaAxios, incident }));
    },

    /**
     * Creates an incident (POST request)
     *
     * @param {import('.').Incident} incident
     * @returns
     */
    postIncident: (incident) => {
      console.log('easy mode auth post');
      return dispatch(postIncident.actionCreator({ oktaAxios, incident }));
    },

    /**
     * deletes an incident (DELETE request)
     *
     * @param {import('.').Incident} incident
     * @returns
     */
    deleteIncident: (incident) => {
      return dispatch(deleteIncident.actionCreator({ oktaAxios, incident }));
    },

    /**
     * Changes the status for the given incident IDs
     *
     * @param {number[]} incidentIds
     * @param {'approved' | 'pending' | 'form-responses'} oldStatus
     * @param {'approved' | 'pending' | 'rejected'} newStatus
     * @returns
     */
    changeIncidentsStatus: (incidentIds, oldStatus, newStatus) => {
      return dispatch(changeStatus.actionCreator({ oktaAxios, incidentIds, oldStatus, newStatus }));
    },

    /**
     * Sets the error message
     *
     * @param {string} message
     * @returns
     */
    setErrorMessage: (message) => {
      console.log('easy mode auth setError');
      return dispatch(allIncidentActions.actions.setErrorMessage(message));
    }
  };

  return easyMode;
};
