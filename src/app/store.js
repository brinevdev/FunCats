import { configureStore } from '@reduxjs/toolkit';
import catReducer from '../components/catsSlice/catsSlice';
import voteReducer from './../pages/voting/votingSlice';
import galleryReducer from './../pages/gallery/gallerySlice';

export const store = configureStore({
  reducer:{
   vote:voteReducer,
   cats:catReducer,
   gallery:galleryReducer,
  },
  devTools: process.env.NODE_ENV !=='production',
});
