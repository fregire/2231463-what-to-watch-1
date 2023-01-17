import React, { FC, useState } from 'react';
import { APIRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { api } from '../../services/api';
import { Film } from '../../types/film';
import { AuthorizationStatus } from '../../const';
import { redirectToRoute } from '../../store/action';
import { store } from '../../store';
import { fetchFavoriteFilms } from '../../store/api-actions';

type Props = {
  filmId: number;
};


const MyListBtn: FC<Props> = (props) => {
  const { filmId } = props;
  const { favoriteFilms, authorizationStatus } = useAppSelector((state) => state);
  const [isFavorite, setFavorite] = useState(favoriteFilms.some((film) => film.id === filmId));

  const dispatch = useAppDispatch();

  const handleMyListClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (authorizationStatus !== AuthorizationStatus.Auth){
      dispatch(redirectToRoute(APIRoute.Login));
      return;
    }

    const changeFilmFavoriteStatus = async () => {
      const { data: changedFilm } = await api.post<Film>(`${APIRoute.Favorite}/${filmId}/${isFavorite ? 0 : 1}`);

      setFavorite(changedFilm.isFavorite);
    };

    changeFilmFavoriteStatus()
      .then(() => store.dispatch(fetchFavoriteFilms()));
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleMyListClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        {isFavorite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
};

export default MyListBtn;
