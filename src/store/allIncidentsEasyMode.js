import { useThunkDispatch } from ".";
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
	const dispatch = useThunkDispatch();

	const easyMode = {
		fetchIncidents: () => {
			console.log('easy mode auth fetch');
			return dispatch(fetchIncidents.thunk(oktaAxios));
		},

		modifyIncidents: (incidents) => {
			console.log('easy mode auth modify');
			return dispatch(editIncident.thunk({ oktaAxios, incidents }));
		},

		changeIncidentsStatus: (incidentIds, oldStatus, newStatus) => {
			console.log('easy mode auth setStatus');
			return dispatch(setStatus.thunk({ oktaAxios, incidentIds, oldStatus, newStatus }));
		},

		setErrorMessage: (message) => {
			console.log('easy mode auth setError');
			return dispatch(allIncidents.actions.setErrorMessage(message));
		}
	};

	return easyMode;
};
