import { createAction } from '@reduxjs/toolkit';
import { Film } from '../types/film';

export const changeGenre = createAction<{genre: string}>('changeGenre');
export const fillFilms = createAction<{films: Film[]}>('fillFilms');
