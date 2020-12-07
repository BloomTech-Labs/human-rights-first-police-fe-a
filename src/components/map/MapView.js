import * as React from 'react';
// components


import MapContainer from './MapContainer';
// styles
import 'mapbox-gl/dist/mapbox-gl.css';

function MapView() {
  // state variable
  const [incidentsOfInterest, setIncidentsOfInterest] = React.useState();
  return (
    <>
      
      <div style={{ display: 'flex', width: '100vw' }}>
        <div style={{ width: '75vw' }}>
          <MapContainer setIncidentsOfInterest={setIncidentsOfInterest} />
        </div>
       
      </div>
    </>
  );
}

export default MapView;
