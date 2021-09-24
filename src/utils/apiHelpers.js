import axios from 'axios';

/**
 * Returns a promise that resolves to an array of pending incidents
 *
 * @param {import('axios').AxiosInstance} oktaAxios
 * @returns {Promise<Incident[]>} all pending incidents
 */
export function getPendingIncidents(oktaAxios) {
  return oktaAxios.get('/dashboard/incidents')
    .then(res => {
      return res.data;
    });
}

/**
 * Returns a promise that resolves to an array of approved incidents
 * if oktaAxios is provided, it will be used. If not, the approved incidents will be downloaded
 * from the unrestricted endpoint
 *
 * (Currently both endpoints return the same data either way)
 *
 * @param {import('axios').AxiosInstance | null} oktaAxios
 * @returns {Promise<Incident[]>} all approved incidents
 */
export function getApprovedIncidents(oktaAxios) {
  if (oktaAxios) {
    return oktaAxios.get('/dashboard/incidents/approved')
      .then(res => {
        return res.data;
      });
  }
  else {
    console.log('here');
    return axios.get(`${process.env.REACT_APP_BACKENDURL}/incidents/getincidents`)
      .then(res => res.data);
  }
}

/**
 * Returns a promise that resolves to an array of approved incidents
 *
 * @param {import('axios').AxiosInstance} oktaAxios
 * @returns {Promise<Incident[]>} all approved incidents
 */
export function getFormResponses(oktaAxios) {
  return oktaAxios.get('http://hrf-bw-labs37-dev.eba-hz3uh94j.us-east-1.elasticbeanstalk.com/to-approve')
    .then(res => {
      return res.data;
    });
}

/**
 * Changes the status of incidents specified by ID
 *
 * @param {import('axios').AxiosInstance} oktaAxios
 * @param {number[]} incidentIds - an array of incident_ids to be change
 * @param {'pending' | 'approved' | 'rejected'} status - the desired status
 * @returns {Promise<void>} - resolves if sucessful, rejects
 */
export const changeIncidentsStatus = (oktaAxios, incidentIds, status) => {
  // to change the incident status, you don't need the entire incident object
  // sending just the incident_id and the new status will just change the status
  const changes = incidentIds.map(incident_id => {
    return { incident_id, status };
  });

  return oktaAxios
    .put('dashboard/incidents', changes)
    .catch(console.log);
};

export const applyEdits = (oktaAxios, formValues, incident) => {
  const [month, day, year] = formValues.incident_date.split('/');
  const [date, time] = incident.incident_date.split('T');
  const newDate = `${year}-${month}-${day}T${time}`;
  const updatedIncident = {
    ...formValues,
    tags: formValues.tags.split(',').map(t => t.trim()).sort(),
    incident_date: newDate,
  };
  const putRequest = new Promise((resolve, reject) => {
    oktaAxios
      .put('/dashboard/incidents', [{ ...updatedIncident }])
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
  return putRequest;
};

const api = {
  applyEdits,
  getApprovedIncidents,
  getFormResponses,
  getPendingIncidents,
  changeIncidentsStatus
};

export default api;
