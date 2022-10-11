import { configureStore } from '@reduxjs/toolkit';
import catReducer from '../components/catsSlice/catsSlice';
import voteReducer from './../pages/voting/votingSlice';

export const store = configureStore({
  reducer:{
   vote:voteReducer,
   cats:catReducer,
  },
  devTools: process.env.NODE_ENV !=='production',
});
