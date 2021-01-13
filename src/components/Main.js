import React from 'react';
import MapContainer from '../components/map/MapContainer';
import { Layout } from 'antd';
import Store from '../components/Store';

const Main = () => {
  return (
    <div className="mapDiv">
      <Store>
        <MapContainer />
      </Store>
    </div>
  );
};

export default Main;
