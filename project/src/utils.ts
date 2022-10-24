import { AppRoute } from './const';
import { Film } from './types/film';

export const getFilmUrl = (film: Film): string => {
  const bodyUrl = AppRoute.Film.split(':')[0];
  return `${bodyUrl}${film.id}`;
};
