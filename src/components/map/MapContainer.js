import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
// Components
import ClusterMarkers from './ClusterMarkers';
import MapSearch from './MapSearch';
import SearchHeader from './incidentContainer/SearchHeader';
// Hooks
import useViewport from '../../hooks/useViewport';
import useCleanMap from '../../hooks/useCleanMap';

function MapContainer() {
  // Ensures old transition animation state is cleaned up, prevents a crash
  useCleanMap();

  const { viewport, setViewport } = useViewport();

  const maxZoom = 17;

  const incidentsOfInterest = useSelector(
    state => state.map.incidentsOfInterest
  );

  const [settings] = useState({
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
    top: '82px',
    left: '26px',
  };

  return (
    <div className="mapDiv">
      <ReactMapGL
        {...viewport}
        {...settings}
        maxZoom={maxZoom}
        minZoom={2.75}
        width={'fit'}
        height={'calc(90vh - 59px)'}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mikeybz2/ckjkr7gz207a819pd888lmd43"
        onViewportChange={newViewport => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
      >
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div>
          <SearchHeader />
        </div>
        <ClusterMarkers
          mapRef={mapRef}
          viewport={viewport}
          bounds={bounds}
          setViewport={setViewport}
          setIncidentsOfInterest={incidentsOfInterest}
        />
      </ReactMapGL>
    </div>
  );
}

export default MapContainer;
