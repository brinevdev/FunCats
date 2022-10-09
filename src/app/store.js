import { configureStore } from '@reduxjs/toolkit';
import reducer from '../components/catsSlice/catsSlice';

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !=='production',
});
