import { createSlice } from '@reduxjs/toolkit';
import { CarsState } from './types';
import { fetchCars } from './asyncActions';

const initialState: CarsState = {
  data: [],
  loading: false,
  error: null,
};

const openSearchSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = null;
        }
      });
  },
});

export default openSearchSlice.reducer;