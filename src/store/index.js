import { combineReducers, configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';
import incidentSlice from './incidentSlice';
import mapSlice from './mapSlice';
import userSlice from './userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import allIncidentsSlice from './allIncidentsSlice';
import { useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  api: apiSlice.reducer,
  incident: incidentSlice.reducer,
  map: mapSlice.reducer,
  user: userSlice.reducer,
  allIncidents: allIncidentsSlice.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['incident'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // this helps to prevent empty page when we refresh incident reports page

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;

/**
 * Using this dispatch fixes the return type when you dispatch Thunks
 * so you can have proper intellisense/IDE support
 *
 * @returns {typeof store.dispatch}
 */
export const useThunkDispatch = () => useDispatch();

export const { actions: apiActions } = apiSlice;
export const { actions: incidentActions } = incidentSlice;
export const { actions: mapActions } = mapSlice;
export const { actions: userActions } = userSlice;
export const { actions: allIncidentActions } = allIncidentsSlice;
