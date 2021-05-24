import { createSlice } from '@reduxjs/toolkit';
// reset coordinates to the map
const initViewport = {
  latitude: 41.850033,
  longitude: -97.6500523,
  zoom: 3.2,
  bbox: [-179.9, 18.8163608007951, -66.8847646185949, 71.4202919997506],
};
// using this to set geoFilter and dateFilter
const initFocus = {
  cluster: { list: [] },
  query: {
    list: [],
    geoFilter: { list: [], active: false },
    dateFilter: { list: [], active: false },
  },
  active: null,
};

const slice = createSlice({
  name: 'map',
  initialState: {
    viewport: initViewport,
    focus: initFocus,
  },
  reducers: {
    setViewport: (state, action) => {
      state.viewport = action.payload;
    },
    cleanTransition: (state, action) => {
      if (state.viewport.transitionDuration) {
        state.viewport.transitionDuration = 0;
      }
    },
    resetViewport: state => {
      state.viewport = initViewport;
      state.latitude = initViewport.latitude;
      state.longitude = initViewport.longitude;
    },
    setFocusCluster: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.focus.cluster.list = action.payload;
        state.focus.active = 'cluster';
      }
    },
    setFocusGeoFilter: (state, action) => {
      state.focus.query.geoFilter.list = action.payload;
      state.focus.query.geoFilter.active = true;
    },
    //geoFilter works but setFocusDateFilter does not seem to be working. (check back into why it isn't working)
    setFocusDateFilter: (state, action) => {
      state.focus.query.dateFilter.list = action.payload;
      state.focus.query.dateFilter.active = true;
    },
    setFocusQuery: (state, action) => {
      state.focus.query.list = action.payload;
      state.focus.active = 'query';
    },
    resetFocus: state => {
      state.focus = initFocus;
    },
  },
});

export default slice;
