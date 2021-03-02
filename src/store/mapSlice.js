import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initGeoBounds = {
  minLon: -179.9,
  minLat: 18.8163608007951,
  maxLon: -66.8847646185949,
  maxLat: 71.4202919997506,
};

const initDateRange = {
  start: moment(0).toISOString(),
  end: moment().toISOString(),
};

const initViewport = { latitude: 41.850033, longitude: -97.6500523, zoom: 3.2 };

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
    search: {
      query: '',
      geoRes: {},
      geoBounds: initGeoBounds,
      dateRange: initDateRange,
    },
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
    setSearchQuery: (state, action) => {
      state.search.query = action.payload;
    },
    setSearchGeoRes: (state, action) => {
      state.search.geoRes = action.payload;
    },
    setSearchGeoBounds: (state, action) => {
      const { minLon, minLat, maxLon, maxLat } = action.payload;
      if (
        typeof minLon === 'number' &&
        typeof minLat === 'number' &&
        typeof maxLon === 'number' &&
        typeof maxLat === 'number'
      ) {
        state.search.geoBounds = { minLon, minLat, maxLon, maxLat };
      }
    },
    setSearchDateRange: (state, action) => {
      const { start, end } = action.payload;
      state.search.dateRange.start = start ? start : moment(0).toISOString();
      state.search.dateRange.end = end ? end : moment().toISOString();
    },
    resetViewport: state => {
      state.viewport = initViewport;
      state.latitude = initViewport.latitude;
      state.longitude = initViewport.longitude;
    },
    resetSearchGeo: state => {
      state.search.query = '';
      state.search.geoRes = {};
      state.search.geoBounds = initGeoBounds;
    },
    resetSearchDate: state => {
      state.search.dateRange = initDateRange;
    },
  },
});

export default slice;
