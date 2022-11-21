import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';

type Genre = string;

export const changeGenre = createAction<Genre>('changeGenre');
export const fillFilms = createAction<Film[]>('fillFilms');
export const setDataLoadedStatus = createAction<boolean>('setDataLoadedStatus');
