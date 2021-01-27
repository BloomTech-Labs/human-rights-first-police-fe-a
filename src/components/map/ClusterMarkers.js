import React, { useContext } from 'react';
import { ContextView, ContextIncidents } from '../Store';
import { Marker, FlyToInterpolator } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
// hooks
import { useIncidents } from '../../state/query_hooks/useIncidents';

const ClusterMarkers = ({ mapRef }) => {
  const [viewport, setViewport] = useContext(ContextView);
  const [incidentsofInterest, setIncidentsOfInterest] = useContext(
    ContextIncidents
  );

  const maxZoom = 17;
  // load incident data using custom react-query hook (see state >> query_hooks)
  const incidentsQuery = useIncidents();

  // save data to an incidents variable
  // --> make sure incident data is present & no errors fetching that data
  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];

  // console.log(incidents)

  // Known problem with DS data ... some incidents are coming over without a lat/long
  // --> this ensures those data points do not get added to the map
  const incidentsWithLatLong = incidents.filter(
    incident => incident.lat !== 0 && incident.long !== 0
  );
  // get geoJSON Feature 'points'
  // --> will be passed to useSupercluster()
  // --> properties: {} -- similar to state, allows us to access underlying data of cluster rendered on screen
  // --> geometry: {} -- lat/long used to create 'clusters'
  //     --> !!! MUST BE [LONG, LAT] -- order matters !!!

  const points = incidentsWithLatLong.map(incident => {
    return {
      type: 'Feature',
      properties: {
        incident: incident,
        cluster: false,
        incident_id: incident.incident_id,
      },
      geometry: {
        type: 'Point',
        coordinates: [incident.long, incident.lat],
      },
    };
  });

  // mapRef is used to get current bounds of the map

  // tried passing bounds into cluster markers but not all clusters were showing up.
  // --> this is redundant (same code is in Map.js)
  // --> not all clusters show up on initial render without calculating 'bounds' here
  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  // get 'clusters'
  // --> required: points, zoom, bounds
  // grap supercluster
  // --> allows us to access properties in each point (incident data!!)
  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: {
      minPoints: 1,
      radius: 40,
      maxZoom: 20,
    },
  });

  return (
    <div>
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
          cluster: isCluster,
          point_count: pointCount,
        } = cluster.properties;

        return (
          <Marker
            key={cluster.id}
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-(10 + (pointCount / points.length) * 600) / 2}
            offsetTop={-(10 + (pointCount / points.length) * 600) / 2}
          >
            <div
              className="cluster-marker"
              animate={{
                scale: [1, 1.2, 1.2, 1, 1],
                border: ['solid', 'none', 'solid', 'none', 'solid'],
              }}
              transition={{
                duration: 2,
                ease: 'easeInOut',
                times: [0, 0.2, 0.5, 0.8, 1],
                loop: Infinity,
                repeatDelay: 1,
              }}
              style={{
                width: `${10 + (pointCount / points.length) * 600}px`,
                height: `${10 + (pointCount / points.length) * 600}px`,
                color: 'white',
                background: '#e63946',
                borderRadius: '50%',
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: '55%',
              }}
              onClick={() => {
                const clusterId = cluster.id;
                const dataPoints = supercluster.getLeaves(clusterId, Infinity);
                setIncidentsOfInterest(dataPoints);

                if (viewport.zoom < maxZoom) {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );

                  setViewport({
                    ...viewport,
                    latitude,
                    longitude,
                    zoom: expansionZoom,
                    transitionInterpolator: new FlyToInterpolator(),
                    transitionDuration: `auto`,
                  });
                }
              }}
            >
              {pointCount}
            </div>
          </Marker>
        );
      })}
    </div>
  );
};

export default ClusterMarkers;
