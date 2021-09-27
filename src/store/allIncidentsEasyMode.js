import { useSelector } from "react-redux";
import { useThunkDispatch } from ".";
import allIncidents from "./allIncidentsSlice";
import { editIncident, fetchIncidents, setStatus } from "./allIncidentsThunks";

/**
 * EasyMode
 * Takes care of dispatch for any allIncidentSlice-related actions that don't require auth
 */
export const useEasyMode = () => {
	console.log('use easy mode');
	const dispatch = useThunkDispatch();

	const easyMode = {
		fetchIncidents: () => {
			console.log('easy fetch');
			dispatch(fetchIncidents.thunk());
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
	console.log('use easy mode auth');
	const dispatch = useThunkDispatch();

	const easyMode = {
		/**
		 * fetches all incidents (approved, pending, and form-responses) from the back-end
		 * (GET request)
		 *
		 * @returns {Promise<any>}
		 */
		fetchIncidents: () => {
			console.log('easy mode auth fetch');
			return dispatch(fetchIncidents.thunk(oktaAxios));
		},

		/**
		 * Modifies an incident (PUT request)
		 *
		 * @param {import('./allIncidentsSlice').Incident} incident
		 * @returns
		 */
		editIncident: (incident) => {
			console.log('easy mode auth modify');
			return dispatch(editIncident.thunk({ oktaAxios, incident }));
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
			console.log('easy mode auth setStatus');
			return dispatch(setStatus.thunk({ oktaAxios, incidentIds, oldStatus, newStatus }));
		},

		/**
		 * Sets the error message
		 *
		 * @param {string} message
		 * @returns
		 */
		setErrorMessage: (message) => {
			console.log('easy mode auth setError');
			return dispatch(allIncidents.actions.setErrorMessage(message));
		}
	};

	return easyMode;
};

/**
 *
 * @returns {AllIncidentsState}}
 */
export const useAllIncidents = () => {
	return useSelector(state => state.allIncidents);
};
