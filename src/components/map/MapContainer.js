import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
// components
import ClusterMarkers from './ClusterMarkers';
import MapSearch from './MapSearch';
import SearchHeader from './incidentContainer/SearchHeader';
import useViewport from './../../hooks/useViewport';

function MapContainer() {
  const maxZoom = 17;

  const { viewport, setViewport } = useViewport();

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
    top: 82,
    left: 0,
    padding: '10px',
  };

  return (
    <div className="mapDiv">
      <ReactMapGL
        {...viewport}
        {...settings}
        maxZoom={maxZoom}
        minZoom={2.75}
        width={'fit'}
        height={'80vh'}
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
        <div className="search-header">
          <SearchHeader />
        </div>
        <div className="map-menu-background">
          <MapSearch />
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
