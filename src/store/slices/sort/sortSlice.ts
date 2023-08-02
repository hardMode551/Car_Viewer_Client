import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableState } from './types';

const initialState: TableState = {
  selectedMark: [],
  selectedModels: [],
  markCounts: {},
  currentPage: 1,
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSelectedMark: (state, action: PayloadAction<string[]>) => {
      state.selectedMark = action.payload;
    },
    setSelectedModels: (state, action: PayloadAction<string[]>) => {
      state.selectedModels = action.payload;
    },
    setMarkCounts: (state, action: PayloadAction<Record<string, number>>) => {
      state.markCounts = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setSelectedMark, setSelectedModels, setMarkCounts, setCurrentPage } = sortSlice.actions;
export default sortSlice.reducer;
