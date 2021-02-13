import { useSelector, useDispatch } from 'react-redux';
import { mapActions } from './../store';

import { LinearInterpolator, FlyToInterpolator } from 'react-map-gl';

// Hook for seamlessly handling the interaction between the Redux store and
// react-map-gl viewport objects, which contain non-serializable data
export default function useViewport() {
  const dispatch = useDispatch();

  const serial = useSelector(state => state.map.viewport);

  const setViewport = v => {
    delete v.transitionEasing;
    if (v.transitionInterpolator instanceof LinearInterpolator) {
      v.interpolator = 'linear';
    } else if (v.transitionInterpolator instanceof FlyToInterpolator) {
      v.interpolator = 'flyTo';
    }
    delete v.transitionInterpolator;

    dispatch(mapActions.setViewport(v));
  };

  return {
    viewport: {
      ...serial,
      transitionEasing: t => t,
      transitionInterpolator:
        serial.interpolator === 'flyTo'
          ? new FlyToInterpolator()
          : new LinearInterpolator(),
    },
    setViewport,
  };
}
