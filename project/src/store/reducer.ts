import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, fillFilms, setDataLoadedStatus, changeAuthorizationStatus, setUser, setFavoriteFilms } from './action';
import { ALL_GENRES } from '../const';
import { Film } from '../types/film';
import { User } from '../types/user';
import { AuthorizationStatus } from '../const';

type AppState = {
  films: Film[];
  activeGenre: string;
  isDataLoaded: boolean;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
  favoriteFilms: Film[];
};

const initialState: AppState = {
  films: [],
  activeGenre: ALL_GENRES,
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  favoriteFilms: []
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
    })
    .addCase(changeAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    });
});
