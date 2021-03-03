import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'incident',
  initialState: { data: {}, ids: [], timeline: [] },
  reducers: {
    onInitialFetch: (state, action) => {
      state.data = action.payload.incidents;
      state.ids = action.payload.ids;
      state.timeline = action.payload.timeline;
    },
  },
});

export default slice;
