import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'incident',
  initialState: {},
  reducers: {
    setAllIncidents: (state, action) => {
      action.payload.forEach(x => {
        state[x.incident_id] = x;
      });
    },
  },
});

export default slice;
