import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'timeline',
  initialState: [],
  reducers: {
    setTimeline: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export default slice;
