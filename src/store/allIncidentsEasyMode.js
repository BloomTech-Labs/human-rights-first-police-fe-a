import allIncidents, { useAllIncidents } from "./allIncidentsSlice";
import { editIncident, fetchIncidents, setStatus } from "./allIncidentsThunks";

export const useEasyMode = () => {
	console.log('use easy mode');
	const { state, dispatch } = useAllIncidents();

	const easyMode = {
		state,

		fetchIncidents: () => {
			console.log('easy fetch');
			dispatch(fetchIncidents.thunk());
		}
	};

	return easyMode;
};

export const useEasyModeAuth = (oktaAxios) => {
	console.log('use easy mode auth');
	const { state, dispatch } = useAllIncidents();

	const easyMode = {
		state,

		fetchIncidents: () => {
			console.log('easy fetch auth');
			dispatch(fetchIncidents.thunk(oktaAxios));
		},

		modifyIncidents: (incidents) => {
			return dispatch(editIncident.thunk({ oktaAxios, incidents }));
		},

		changeIncidentsStatus: (incidentIds, oldStatus, newStatus) => {
			return dispatch(setStatus.thunk({ oktaAxios, incidentIds, oldStatus, newStatus }));
		},

		setErrorMessage: (message) => {
			return dispatch(allIncidents.actions.setErrorMessage(message));
		}
	};

	return easyMode;
};
