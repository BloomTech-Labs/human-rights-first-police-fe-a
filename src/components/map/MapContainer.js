import React, { useContext, useState } from 'react';
import ReactMapGL, {  NavigationControl } from 'react-map-gl';
// components
import { ContextView, ContextIncidents } from '../Store';
import ClusterMarkers from './ClusterMarkers';

import MapSearch from './MapSearch';
import './MapContainer.css';

function MapContainer() {
  const minZoom = 2.75;
  const maxZoom = 17;

  // state variable for map viewport state
  const [viewport, setViewport] = useContext(ContextView);
  const [incidentsofInterest, setIncidentsOfInterest] = useContext(
    ContextIncidents
  );

  const [settings, setsettings] = useState({
    scrollZoom: false,
  });

  // mapRef is used to get current bounds of the map
  const mapRef = React.useRef();

  // get map 'bounds'
  // --> getMap(), getBounds(), toArray(), flat() come from react-map-gl
  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  const navStyle = {
    position: 'absolute',
    top: 32,
    left: 0,
    padding: '10px',
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        {...settings}
        maxZoom={maxZoom}
        minZoom={2.75}
        width={'fit'}
        height={'80vh'}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={newViewport => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
      >
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div className="map-menu-background">
          <MapSearch />
        </div>

        <ClusterMarkers
          mapRef={mapRef}
          viewport={viewport}
          bounds={bounds}
          setViewport={setViewport}
          setIncidentsOfInterest={incidentsofInterest}
        />
      </ReactMapGL>
    </div>
  );
}

export default MapContainer;
