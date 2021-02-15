import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'api',
  initialState: {
    legacyHooks: {
      useIncidents: {
        status: 'idle',
        error: null,
      },
      useTimeline: {
        status: 'idle',
        error: null,
      },
    },
  },
  reducers: {
    setUseIncidentsHookStatus: (state, action) => {
      const { status, error } = action.payload;

      if (error) {
        state.legacyHooks.useIncidents.status = 'error';
        state.legacyHooks.useIncidents.error = error;
      } else {
        state.legacyHooks.useIncidents.status = status;
      }
    },
    setUseTimelineHookStatus: (state, action) => {
      const { status, error } = action.payload;

      if (error) {
        state.legacyHooks.useTimeline.status = 'error';
        state.legacyHooks.useTimeline.error = error;
      } else {
        state.legacyHooks.useTimeline.status = status;
      }
    },
  },
});

export default slice;
