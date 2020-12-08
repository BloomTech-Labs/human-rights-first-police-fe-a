import React from 'react';
import ReactMapGL from 'react-map-gl';
// components
import ClusterMarkers from './ClusterMarkers';
import { Input, Collapse, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './MapContainer.css'

const { Search } = Input;
const { Panel } = Collapse;

const suffix = (
  <SearchOutlined 
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
function callback(key) {
  console.log(key);
}

function MapContainer({ setIncidentsOfInterest }) {
  const onSearch = value => console.log(value);
  const minZoom = 2.75;
  const maxZoom = 17;

  // state variable for map viewport state
  const [viewport, setViewport] = React.useState({
    latitude: 41.850033,
    longitude: -97.6500523,
    zoom: minZoom,
  });

  // state variable for interacting with MapboxGL map
  const [settings, setSettings] = React.useState({
    dragRotate: false,
    scrollZoom: true,
    touchZoom: false,
    touchRotate: false,
    keyboard: false,
    doubleClickZoom: false,
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

  return (
    <ReactMapGL
      {...viewport}
      {...settings}
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
        <div className='map-menu'>
      <Input  
      className='map-search' 
      placeholder="Search" 
      allowClear onSearch={onSearch} 
      suffix={suffix}
      bordered={false}  />
      <Divider style={{margin: '0px'}} />
      <Collapse
       style={{color: 'white'}}
        defaultActiveKey={['1']}
         onChange={callback}
          bordered={false}
          expandIconPosition='right'
          ghost
          >
          
    <Panel bordered={false} 
    style={{color: 'white', padding:'0px'}} 
     header="More Info"
      key="1"
      >
        <Divider style={{margin: '0px'}} />
        <p>text</p>
      
    </Panel>
    </Collapse>
    </div>
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