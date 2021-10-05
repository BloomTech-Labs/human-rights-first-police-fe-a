/** @typedef {import("..").Incident} Incident */

/**
 * Returns the correct incident list for the provided status
 *
 * @param {'pending' | 'approved' | 'form-responses'} status
 * @param {import("..").AllIncidentsState} state
 * @returns {Incident[]}
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

/**
 * takes a 'dict' with numbered keys and returns an array
 * This is used because some of the DS endpoints send back a dictionary instead of a list
 *
 * @param {any} dict
 * @return {any[]}
 */
function dictionaryToArray(dict) {
  if (dict == null) {
    return [];
  }

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

/**
 * Returns a copy of the incident with the 'src' and 'tag' properties as arrays
 * This is used because some of the DS endpoints send back a dictionary instead of a list
 *
 * @export
 * @param {any} incident
 * @return {Incident}
 */
export function sanitizeFormResponse(incident) {
  const safe = {
    ...incident,
    src: dictionaryToArray(incident.src),
    tags: dictionaryToArray(incident.tags)
  };

  return safe;
}
