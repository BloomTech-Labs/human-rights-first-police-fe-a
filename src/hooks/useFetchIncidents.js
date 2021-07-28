import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { apiActions, incidentActions } from '../store';
const { setInitialFetchStatus } = apiActions;
const { onInitialFetch } = incidentActions;

export default function useFetchIncidents() {
  const dispatch = useDispatch();

  const fetch = useCallback(async () => {
    try {
      dispatch(
        setInitialFetchStatus({
          getincidents: { status: 'pending' },
          gettimeline: { status: 'pending' },
        })
      );

      const { data: incidentsRes } = await axios.get(
        `${process.env.REACT_APP_BACKENDURL}/incidents/getincidents`
      );
      const { data: timelineRes } = await axios.get(
        `${process.env.REACT_APP_BACKENDURL}/incidents/gettimeline`
      );

      const incidents = {};
      const tagIndex = {};

      incidentsRes.forEach(item => {
        incidents[item.incident_id] = {
          ...item,
          geoJSON: {
            type: 'Feature',
            incidentId: item.incident_id,
            geometry: { type: 'Point', coordinates: [item.long, item.lat] },
          },
        };

        item.tags.forEach(tag => {
          if (tagIndex.hasOwnProperty(tag)) {
            tagIndex[tag].add(item.incident_id);
          } else {
            tagIndex[tag] = new Set([item.incident_id]);
          }
        });
      });
      const timeline = timelineRes.map(item => item.incident_id);

      dispatch(
        onInitialFetch({
          incidents,
          ids: Object.keys(incidents),
          timeline,
          tagIndex,
        })
      );
      dispatch(
        setInitialFetchStatus({
          getincidents: { status: 'success' },
          gettimeline: { status: 'success' },
        })
      );
    } catch (e) {
      dispatch(
        setInitialFetchStatus({
          getincidents: { status: 'error', error: e.message },
          gettimeline: { status: 'error', error: e.message },
        })
      );
    }
  }, [dispatch]);

  return { fetch };
}
