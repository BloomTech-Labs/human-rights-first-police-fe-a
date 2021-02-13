import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { apiActions, timelineActions } from '../../store';
const { setUseTimelineHookStatus: setHookStatus } = apiActions;
const { setTimeline } = timelineActions;

// This function replaces an old react-query wrapper (preserved below) that was hitting the API dozens
// of times a minute. It duplicates the react-query APIs that component code written by previous teams
// expects to be present (see the return statement) while hooking into Redux for state management behind
// the scenes. Please do not use this hook for future functionality and instead use Redux directly.
export function useTimeline() {
  const dispatch = useDispatch();

  const { status } = useSelector(state => state.api.legacyHooks.useTimeline);
  const incidentFetchStatus = useSelector(
    state => state.api.legacyHooks.useIncidents.status
  );

  const request = useCallback(async () => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKENDURL}/incidents/gettimeline`
    );
    return data.map(x => x.incident_id);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(setHookStatus({ status: 'pending' }));
      request()
        .then(list => {
          dispatch(setTimeline(list));
          dispatch(setHookStatus({ status: 'success' }));
        })
        .catch(e => {
          console.error(e);
          dispatch(setHookStatus({ status: 'error', error: e.message }));
        });
    }
  }, [status, request, dispatch]);

  // Legacy components expect timeline data to be returned as an array of incident objects
  const timelineArray = useSelector(state => {
    const ar = [];
    if (status === 'success' && incidentFetchStatus === 'success') {
      state.timeline.forEach(id => ar.push(state.incident[id]));
    }
    return ar;
  });

  // Legacy components expect react-query to return this format
  return {
    data: timelineArray,
    isLoading: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}

// Legacy react-query code:

/* 
import axios from 'axios';
import { useQuery } from 'react-query';

export const useTimeline = () => {
  return useQuery(
    'timeline',
    () => {
      return axios
        .get(`${process.env.REACT_APP_BACKENDURL}/incidents/gettimeline`)
        .then(res => res.data);
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  }; 
*/
