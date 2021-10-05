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

function dictionaryToArray(dict) {
  const array = [];

  for (const key in dict) {
    const item = dict[key];
    const index = parseInt(key);

    if (item && !isNaN(index)) {
      array.push(item);
    }
  }

  return array;
}

export function sanitizeFormResponse(incident) {
  const safe = {
    ...incident,
    src: dictionaryToArray(incident.src),
    tags: dictionaryToArray(incident.tags)
  };

  return safe;
}
