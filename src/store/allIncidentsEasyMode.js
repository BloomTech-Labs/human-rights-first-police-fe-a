import { useAllIncidents } from "./allIncidentsSlice";
import { editIncident, fetchIncidents, setStatus } from "./allIncidentsThunks";

export const useEasyMode = () => {
	console.log('use easy mode');
	const { state, dispatch } = useAllIncidents();

	const easyMode = {
		state,
		fetchIncidents: (oktaAxios) => {
			console.log('easy fetch');
			dispatch(fetchIncidents.thunk(oktaAxios));
		},
		/**
		 * Say cheese
		 * @param {Incident[]} incidents
		 * @returns {Promise<void>}
		 */
		modifyIncidents: (oktaAxios, incidents) => {
			return dispatch(editIncident.thunk({ oktaAxios, incidents }));
		},
		changeIncidentsStatus: (oktaAxios, incidentIds, oldStatus, newStatus) => {
			return dispatch(setStatus.thunk({ oktaAxios, incidentIds, oldStatus, newStatus }));
		}
	};

	return easyMode;
};
