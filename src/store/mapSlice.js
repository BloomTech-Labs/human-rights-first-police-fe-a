import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'map',
  initialState: {
    viewport: { latitude: 41.850033, longitude: -97.6500523, zoom: 3.2 },
    cluster: {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [],
        properties: {
          incident: null,
          cluster: false,
          incident_id: null,
        },
      },
    },
    search: '',
    latitude: 41.850033,
    longitude: -97.6500523,
    filters: null,
    incidentsOfInterest: null,
    filterData: [],
    dates: null,
  },
  reducers: {
    setViewport: (state, action) => {
      state.viewport = action.payload;
    },
    setIncidentsOfInterest: (state, action) => {
      state.incidentsOfInterest = action.payload;
    },
    setLatitude: (state, action) => {
      state.latitude = action.payload;
    },
    setLongitude: (state, action) => {
      state.longitude = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    setDates: (state, action) => {
      state.dates = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    cleanTransition: (state, action) => {
      if (state.viewport.transitionDuration) {
        state.viewport.transitionDuration = 0;
      }
    },
  },
});

export default slice;
