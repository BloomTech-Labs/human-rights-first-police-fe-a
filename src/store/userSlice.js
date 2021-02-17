import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    status: { authenticated: false, pending: false },
    tokens: { access: null, id: null },
    info: null,
  },
  reducers: {
    setUser: (state, action) => {
      for (const prop in action.payload) {
        state[prop] = action.payload[prop];
      }
    },
  },
});

export default slice;
