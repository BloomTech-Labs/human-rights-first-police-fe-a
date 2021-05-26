//Use for each component that filters by date (Map, Search, IncidentFocus)
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

const useIncidentFilter = () => {
  const activeFocus = useSelector(state => state.map.focus.active);
  const clusterList = useSelector(state => state.map.focus.cluster.list);
  const queryList = useSelector(state => state.map.focus.query.list);
  const defaultList = useSelector(state => state.incident.ids); // all incidents

  const dateIncidentList = useSelector(state =>
    state.incident.ids.map(id => ({
      id,
      date: state.incident.data[id]?.date,
    }))
  );

  const matches = dateIncidentList
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .map(incident => incident.id);

  return useMemo(() => {
    return activeFocus === 'cluster'
      ? clusterList
      : activeFocus === 'query'
      ? queryList
      : matches; //default needs to be different for map as opposed to incidentFocus dropdown - want all for map, but not all for dropdown. But if filtering, want the same
  }, [activeFocus, clusterList, queryList, defaultList]);
};

export default useIncidentFilter;
