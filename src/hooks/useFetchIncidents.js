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
        incidents[item.id] = {
          ...item,
          geoJSON: {
            type: 'Feature',
            incidentId: item.id,
            geometry: { type: 'Point', coordinates: [item.long, item.lat] },
          },
        };

        item.categories.forEach(category => {
          if (tagIndex.hasOwnProperty(category)) {
            tagIndex[category].add(item.id);
          } else {
            tagIndex[category] = new Set([item.id]);
          }
        });
      });
      console.log(tagIndex);
      const timeline = timelineRes.map(item => item.id);

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
