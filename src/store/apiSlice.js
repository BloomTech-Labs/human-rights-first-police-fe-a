import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'api',
  initialState: {
    incidents: {
      getincidents: { status: 'idle', error: null },
      gettimeline: { status: 'idle', error: null },
    },
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
    setInitialFetchStatus: (state, action) => {
      const { getincidents, gettimeline } = action.payload;

      if (getincidents) {
        const { status, error } = getincidents;
        if (status) {
          state.incidents.getincidents.status = status;
        }
        if (error) {
          state.incidents.getincidents.error = error;
        }
      }

      if (gettimeline) {
        const { status, error } = gettimeline;
        if (status) {
          state.incidents.gettimeline.status = status;
        }
        if (error) {
          state.incidents.gettimeline.error = error;
        }
      }
    },
    setUseIncidentsHookStatus: (state, action) => {
      const { status, error } = action.payload;

      if (getincidents) {
        const { status, error } = getincidents;
        if (status) {
          state.incidents.getincidents.status = status;
        }
        if (error) {
          state.incidents.getincidents.error = error;
        }
      }

      if (gettimeline) {
        const { status, error } = gettimeline;
        if (status) {
          state.incidents.gettimeline.status = status;
        }
        if (error) {
          state.incidents.gettimeline.error = error;
        }
      }
    },
  },
});

export default slice;
