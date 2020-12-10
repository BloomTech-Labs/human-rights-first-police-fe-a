import React, { useState, useContext, useRef, useCallback } from 'react';
import ReactMapGL from 'react-map-gl';
// components
import {
  ContextState,
  ContextView,
  ContextSearchText,
  ContextActiveFilters,
  ContextLong,
  ContextLat,
  ContextIncidents,
} from '../Store'; 
import ClusterMarkers from './ClusterMarkers';


import MapSearch from './MapSearch'
import './MapContainer.css'



function MapContainer() {
  const onSearch = value => console.log(value);
  const minZoom = 2.75;
  const maxZoom = 17;

  // state variable for map viewport state
  const [viewport, setViewport] = useContext(ContextView);
  const [incidentsOfInterest, setIncidentsOfInterest] = useContext(ContextIncidents)

 

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

  return (
    <ReactMapGL
      {...viewport}
      
      maxZoom={maxZoom}
      minZoom={2.75}
      width={'fit'}
      height={'70vh'}
      mapboxApiAccessToken= 'pk.eyJ1IjoiYnJpZGdlc3RvcHJvc3Blcml0eSIsImEiOiJjajRpd2sxeGQwMjU5MnhxajJkNzZnODZtIn0.UrOwxq6A1Zl2yvwzYxBudQ'
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={newViewport => {
        setViewport({ ...newViewport });
      }}
      ref={mapRef}
    >
      <div className='map-menu-background'>
        <MapSearch/>
      </div>
      <ClusterMarkers
        mapRef={mapRef}
        viewport={viewport}
        bounds={bounds}
        setViewport={setViewport}
        setIncidentsOfInterest={setIncidentsOfInterest}
      />
    </ReactMapGL>
    
  );
}

export default MapContainer;