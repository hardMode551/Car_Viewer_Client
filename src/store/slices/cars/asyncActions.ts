import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api/axios';

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  const { data } = await axios.get('/api/stock');
  return data;
});