/**
 * Returns the correct incident list for the provided status
 *
 * @param {'pending' | 'approved' | 'form-responses'} status
 * @param {import("..").AllIncidentsState} state
 * @returns {import("..").Incident[]}
 */
export function selectListByStatus(status, state) {
	switch (status) {
		case 'pending':
			return state.pendingIncidents;
		case 'approved':
			return state.approvedIncidents;
		case 'form-responses':
			return state.formResponses;
		default:
			return null;
	}
}
