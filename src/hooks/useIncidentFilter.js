//Use for each component that filters by date (Map, Search, IncidentFocus)
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useIncidentFilter = () => {
  const activeFocus = useSelector(state => state.map.focus.active);
  const clusterList = useSelector(state => state.map.focus.cluster.list);
  const queryList = useSelector(state => state.map.focus.query.list);
  const defaultList = useSelector(state => state.incident.ids); // all incidents

  return useMemo(() => {
    return activeFocus === 'cluster'
      ? clusterList
      : activeFocus === 'query'
      ? queryList
      : defaultList; //default needs to be different for map as opposed to incidentFocus dropdown - want all for map, but not all for dropdown. But if filtering, want the same
  }, [activeFocus, clusterList, queryList, defaultList]);
};

export default useIncidentFilter;
