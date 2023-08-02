import { configureStore } from '@reduxjs/toolkit'
import cars from './slices/cars/carsSlice'
import sort from './slices/sort/sortSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: {
    cars,
    sort,
  },
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
