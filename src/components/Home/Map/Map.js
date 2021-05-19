import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMapGL, {
  NavigationControl,
  WebMercatorViewport,
  FlyToInterpolator,
} from 'react-map-gl';
import styled from 'styled-components';
import { mapActions } from '../../../store';
import _ from 'lodash';
import Search from './Search';
import Clusters from './Clusters';
import IncidentFocus from './IncidentFocus';
import HomeIcon from './HomeIcon';

const {
  setViewport: setReduxViewport,
  resetViewport: resetReduxViewport,
  resetFocus,
} = mapActions;

const NavControlContainer = styled.div`
  position: absolute;
  top: 82px;
  left: 26px;
  z-index: 1;
  @media (max-width: 375px) {
    position: absolute;
    top: 490px;
    left: 26px;
    z-index: 1;
  }
  @media (max-width: 414px) {
    position: absolute;
    top: 540px;
    left: 26px;
    z-index: 1;
  }
`;
const initialPosition = {
  latitude: 39.850033,
  longitude: -97.6500523,
  zoom: 3.0,
};

// See relevant react-map-gl docs: http://visgl.github.io/react-map-gl/docs/api-reference/interactive-map
export default function Map() {
  const dispatch = useDispatch();
  const fetchStatus = useSelector(
    state => state.api.incidents.getincidents.status
  );
  const [viewport, setViewport] = useState(initialPosition);

  // Mapbox interactive settings
  const settings = {
    dragPan: true,
    dragRotate: true,
    //map can be zoomed in and out mouse scroll, revisit this scroll (Stakeholder asked for map not to scroll)
    scrollZoom: false,
    touchZoom: false,
    touchRotate: false,
    keyboard: false,
    doubleClickZoom: false,
  };

  useEffect(() => {
    const serializable = { ...viewport }; // keep non-serializable data out of Redux
    delete serializable.transitionEasing; // function
    delete serializable.transitionInterpolator; // class instance

    // Get coordinates for current map boundaries
    const mercator = new WebMercatorViewport(viewport);
    serializable.bbox = _.flatten(mercator.getBounds());

    dispatch(setReduxViewport(serializable));
  }, [viewport, dispatch]);

  const zoomOnCluster = (zoom, longitude, latitude) => {
    setViewport({
      ...viewport,
      zoom,
      longitude,
      latitude,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: x =>
        x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2, // Quadratic easing function
      transitionDuration: 2000,
    });
  };

  // Reset incident focus filters and viewport on component unmount
  useEffect(() => {
    return () => {
      dispatch(resetFocus());
      dispatch(resetReduxViewport());
    };
  }, [dispatch]);

  return (
    <div className="Map">
      <div className="mapDiv">
        <ReactMapGL
          {...viewport}
          {...settings}
          onViewportChange={vp => {
            setViewport(vp);
          }}
          width="fit"
          height="calc(90vh - 59px)"
          minZoom={2.75}
          maxZoom={17}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mikeybz2/ckjkr7gz207a819pd888lmd43"
        >
          {fetchStatus === 'success' ? (
            <>
              <Search zoomOnCluster={zoomOnCluster} />
              <NavControlContainer>
                <NavigationControl />
                <HomeIcon
                  zoomOnCluster={zoomOnCluster}
                  initialPosition={initialPosition}
                  setViewport={setViewport}
                />
              </NavControlContainer>
              <Clusters zoomOnCluster={zoomOnCluster} />
            </>
          ) : (
            ''
          )}
        </ReactMapGL>
      </div>
      {fetchStatus === 'success' ? (
        <IncidentFocus zoomOnCluster={zoomOnCluster} />
      ) : (
        ''
      )}
    </div>
  );
}
