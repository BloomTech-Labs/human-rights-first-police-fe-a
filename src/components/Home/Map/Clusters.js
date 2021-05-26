import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Marker } from 'react-map-gl';
import Supercluster from 'supercluster';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { mapActions } from '../../../store';
import useIncidentFilter from '../../../hooks/useIncidentFilter';
const { setFocusCluster } = mapActions;

const ClusterMarker = styled.div`
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  color: white;
  background: #e63946;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 55%;
`;

const INCIDENT_ZOOM_LEVEL = 12;
const LEAVES_LIMIT = 10; // Max # of incidents to display in IncidentFocus

export default function Clusters({ zoomOnCluster }) {
  const dispatch = useDispatch();
  const incident = useSelector(state => state.incident);
  const incidents = useIncidentFilter();
  const points = incidents.map(id => incident.data[id].geoJSON);

  // See for supercluster usage and config: https://github.com/mapbox/supercluster
  const supercluster = useMemo(() => {
    const sc = new Supercluster({ radius: 40, maxZoom: 17 });
    sc.load(points);
    return sc;
  }, [points]);

  const bbox = useSelector(state => state.map.viewport.bbox);
  const zoom = useSelector(state => state.map.viewport.zoom);
  const clusters = useMemo(() => {
    return supercluster.getClusters(bbox, Math.floor(zoom)); // zoom *must* be an integer
  }, [bbox, zoom, supercluster]);

  const handleClusterClick = (clusterId, long, lat) => {
    const incidentList = supercluster
      .getLeaves(clusterId, LEAVES_LIMIT)
      .map(l => l.incidentId)
      .sort((x, y) => y - x); // roughly reverse-chronological sort (most recent first)
    dispatch(setFocusCluster(incidentList));
    zoomOnCluster(supercluster.getClusterExpansionZoom(clusterId), long, lat);
  };

  const handleIncidentClick = (incidentId, long, lat) => {
    dispatch(setFocusCluster([incidentId]));
    zoomOnCluster(INCIDENT_ZOOM_LEVEL, long, lat);
  };

  return (
    <div>
      {clusters.map(c => {
        const [longitude, latitude] = c.geometry.coordinates;
        const { isCluster, pointCount } = c.properties
          ? {
              isCluster: c.properties.cluster,
              pointCount: c.properties.point_count,
            }
          : { isCluster: false, pointCount: 1 };

        return (
          <Marker
            key={nanoid()}
            longitude={longitude}
            latitude={latitude}
            offsetLeft={-(10 + (pointCount / points.length) * 600) / 2}
            offsetTop={-(10 + (pointCount / points.length) * 600) / 2}
            onClick={() => {
              if (isCluster) {
                handleClusterClick(c.id, longitude, latitude);
              } else {
                handleIncidentClick(c.incidentId, longitude, latitude);
              }
            }}
          >
            <ClusterMarker size={10 + (pointCount / points.length) * 600}>
              {pointCount}
            </ClusterMarker>
          </Marker>
        );
      })}
    </div>
  );
}
