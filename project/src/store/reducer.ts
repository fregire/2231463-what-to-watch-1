import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, fillFilms, setDataLoadedStatus } from './action';
import { ALL_GENRES } from '../const';
import { Film } from '../types/film';


type AppState = {
  films: Film[];
  activeGenre: string;
  isDataLoaded: boolean;
};

const initialState: AppState = {
  films: [],
  activeGenre: ALL_GENRES,
  isDataLoaded: false
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(fillFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});
