import * as React from 'react';
import { Marker, FlyToInterpolator } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
// hooks
import { useIncidents } from '../../state/query_hooks/useIncidents';
// styles
import './ClusterMarker.css'
console.log(useIncidents) 

function ClusterMarkers({
  mapRef,
  viewport,
  setViewport,
  setIncidentsOfInterest,
}) {
  const maxZoom = 17;
  // load incident data using custom react-query hook (see state >> query_hooks)
  const incidentsQuery = useIncidents();

  const theData = incidentsQuery.data
 

  // console.log('data1', theData.map( x => x.lethal_force))

  // const newData = data => {
  //   const newCurrentData = data.map(obj =>
  //     Object.keys(obj)
  //       .filter(x => obj[x] !== null)
  //       .reduce((o, e) => {
  //         o[e] = obj[e];
  //         return o;
  //       }, {})
  //   );
  //   const noUnderfined = newCurrentData.map(obj =>
  //     Object.keys(obj)
  //       .filter(x => obj[x] !== undefined)
  //       .reduce((o, e) => {
  //         o[e] = obj[e];
  //         return o;
  //       }, {})
  //   );
  //   return noUnderfined;
  // };

  // console.log('data2', newData(theData))





  // save data to an incidents variable
  // --> make sure incident data is present & no errors fetching that data
  const incidents =
    incidentsQuery.data && !incidentsQuery.isError ? incidentsQuery.data : [];

  // Known problem with DS data ... some incidents are coming over without a lat/long
  // --> this ensures those data points do not get added to the map
  const incidentsWithLatLong = incidents.filter(
    incident => incident.lat !== 0 && incident.long !== 0
  );
// console.log(incidents)
  //Lethal force
  const force = incidents.filter(
    incident => incident.lethal_force === true
  );
  // console.log('what force', force)
  // get geoJSON Feature 'points'
  // --> will be passed to useSupercluster()
  // --> properties: {} -- similar to state, allows us to access underlying data of cluster rendered on screen
  // --> geometry: {} -- lat/long used to create 'clusters'
  //     --> !!! MUST BE [LONG, LAT] -- order matters !!!
  let list =[]
let set1 = new Set()
console.log(incidentsWithLatLong)
  const points = incidentsWithLatLong.map(incident => {
    
    let count = list.push(incident.categories)
    let cleanArray =[...new Set(list.flat())] 
    
    // set1.add(incident.categories)
    // console.log(set1.flat())
    // console.log(incident.categories)
    console.log(cleanArray)
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
            <div className='cluster-marker'
              style={{
                width: `${10 + (pointCount / points.length) * 600}px`,
                height: `${10 + (pointCount / points.length) * 600}px`,
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
}

export default ClusterMarkers;
