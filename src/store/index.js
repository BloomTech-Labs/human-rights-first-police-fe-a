import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';
import incidentSlice from './incidentSlice';
import mapSlice from './mapSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    api: apiSlice.reducer,
    incident: incidentSlice.reducer,
    map: mapSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;

export const { actions: apiActions } = apiSlice;
export const { actions: incidentActions } = incidentSlice;
export const { actions: mapActions } = mapSlice;
export const { actions: userActions } = userSlice;
