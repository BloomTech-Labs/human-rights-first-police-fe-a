import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { mapActions } from '../store';
const { setFocusGeoFilter, setFocusDateFilter, setFocusQuery } = mapActions;

// These are set relatively low to be on the safe side because there were previous performance issues
// displaying a large number of focus incidents - you may want to play around with adjusting them
const GEO_RESULTS_LIMIT = 50;
const DATE_RESULTS_LIMIT = 50;
const OVERALL_RESULTS_LIMIT = 20;

export default function useMapSearch() {
  const dispatch = useDispatch();

  // ** Filtering by location **
  const geoIncidentList = useSelector(state =>
    state.incident.ids.map(id => ({
      id,
      lat: state.incident.data[id]?.lat,
      long: state.incident.data[id]?.long,
    }))
  );

  // Dispatch filtered list of matching incident IDs to Redux
  const filterGeo = useCallback(
    bbox => {
      const [minLong, minLat, maxLong, maxLat] = bbox;
      const matches = [];

      // Decrementing for loop produces a reverse-chronological list (most recent first)
      for (let i = geoIncidentList.length - 1; i > 0; i--) {
        if (matches.length >= GEO_RESULTS_LIMIT) {
          break;
        }

        const { id, lat, long } = geoIncidentList[i];
        if (
          lat >= minLat &&
          lat <= maxLat &&
          long >= minLong &&
          long <= maxLong
        ) {
          matches.push(id);
        }
      }

      dispatch(setFocusGeoFilter(matches));
    },
    [geoIncidentList, dispatch]
  );

  // ** Filtering by date **
  const dateIncidentList = useSelector(state =>
    state.incident.ids.map(id => ({
      id,
      date: state.incident.data[id]?.date,
    }))
  );

  // Dispatch filtered list of matching incident IDs to Redux
  const filterDate = useCallback(
    dates => {
      // If a date is not selected, use 1/1/1970 for start and/or the current time for end
      const start = dates?.[0] ? dates[0] : moment(0);
      const end = dates?.[1] ? dates[1] : moment();
      const matches = dateIncidentList
        .filter(incident => moment(incident.date).isBetween(start, end))
        .sort((a, b) => (a.date > b.date ? -1 : 1))
        .map(incident => incident.id);

      dispatch(setFocusDateFilter(matches));
    },
    [dateIncidentList, dispatch]
  );

  // Combine geographic and date filter lists and dispatch the results to Redux
  const geoFilterState = useSelector(state => state.map.focus.query.geoFilter);
  const dateFilterState = useSelector(
    state => state.map.focus.query.dateFilter
  );
  //potential refactor(get to this first)
  useEffect(() => {
    if (geoFilterState.active && !dateFilterState.active) {
      dispatch(setFocusQuery(geoFilterState.list));
    } else if (!geoFilterState.active && dateFilterState.active) {
      dispatch(setFocusQuery(dateFilterState.list));
    } else if (geoFilterState.active && dateFilterState.active) {
      let matches = _.intersection(geoFilterState.list, dateFilterState.list);
      if (matches.length > OVERALL_RESULTS_LIMIT) {
        matches = _.slice(matches, 0, 10);
      }
      dispatch(setFocusQuery(matches));
    }
  }, [geoFilterState, dateFilterState, dispatch]);

  return { filterGeo, filterDate };
}
