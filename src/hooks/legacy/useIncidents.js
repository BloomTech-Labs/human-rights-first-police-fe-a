import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { apiActions, incidentActions } from '../../store';
const { setUseIncidentsHookStatus: setHookStatus } = apiActions;
const { setAllIncidents } = incidentActions;

// This function replaces an old react-query wrapper (preserved below) that was hitting the API dozens
// of times a minute. It duplicates the react-query APIs that component code written by previous teams
// expects to be present (see the return statement) while hooking into Redux for state management behind
// the scenes. Please do not use this hook for future functionality and instead use Redux directly.
export function useIncidents() {
  const dispatch = useDispatch();

  const { status } = useSelector(state => state.api.legacyHooks.useIncidents);
  const incidentState = useSelector(state => state.incident);

  const request = useCallback(async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDURL}/incidents/getincidents`
    );
    return data;
  }, []);

  // 🐞 This incorrectly fires twice, a small bug for now but one that will grow with the dataset
  useEffect(() => {
    if (status === 'idle') {
      dispatch(setHookStatus({ status: 'pending' }));
      request()
        .then(data => {
          dispatch(setAllIncidents(data));
          dispatch(setHookStatus({ status: 'success' }));
        })
        .catch(e => {
          console.error(e);
          dispatch(setHookStatus({ status: 'error', error: e.message }));
        });
    }
  }, [status, request, dispatch]);

  // Legacy components expect incident data to be returned as an array
  const incidentArray = useMemo(
    () => (status === 'success' ? Object.values(incidentState) : null),
    [status, incidentState]
  );

  // Legacy components expect react-query to return this format
  return {
    data: incidentArray,
    isLoading: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}

// Legacy react-query code:
/* 
import axios from 'axios';
import { useQuery } from 'react-query';

// ⬇️ --> USAGE: in react component <-- ⬇️
// const incidentsQuery = useIncident();

export const useIncidents = () => {
  return useQuery(
    'incidents',
    () => {
      return axios
        .get(`${process.env.REACT_APP_BACKENDURL}/incidents/getincidents`)
        .then(res => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};
 */
