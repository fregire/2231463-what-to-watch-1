import { createReducer } from '@reduxjs/toolkit';
import { AppState } from '../types/store';
import { changeGenre, fillFilms } from './action';
import { films as loadedFilms } from '../mocks/films';
import { ALL_GENRES } from '../const';

const initialState: AppState = {
  activeGenre: ALL_GENRES,
  films: loadedFilms
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const { genre } = action.payload;

      state.activeGenre = genre;
    })
    .addCase(fillFilms, (state, action) => {
      const { films } = action.payload;
      state.films = films;
    });
});
