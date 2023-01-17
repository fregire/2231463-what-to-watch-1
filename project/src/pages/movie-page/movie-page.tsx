import React, { FC, useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { AxiosError } from 'axios';
import { APIRoute, AuthorizationStatus } from '../../const';
import { Film } from '../../types/film';
import { Review } from '../../types/review';
import { api } from '../../services/api';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../const';
import FilmsList from '../../components/films-list/films-list';
import MovieTabs from '../../components/movie-tabs/movie-tabs';
import UserBlock from '../../components/user-block/user-block';
import Logo from '../../components/logo/logo';
import Loader from '../../components/loader/loader';
import MyListBtn from '../../components/my-list-btn/my-list-btn';
import { store } from '../../store';
import { fetchFavoriteFilms } from '../../store/api-actions';

const MoviePage: FC = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [film, setFilm] = useState<null | Film>(null);
  const [similarFilms, setSimilarFilms] = useState<null | Film[]>(null);
  const [reviews, setReviews] = useState<null | Review[]>(null);
  const { authorizationStatus, favoriteFilms } = useAppSelector((state) => state);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scroll({top: 0, behavior: 'smooth'});

    const fetchFilm = async () => {
      const { data: filmInfo } = await api.get<Film>(`/films/${id || -1}`);
      setFilm(filmInfo);
    };
    const fetchSimilarFilms = async () => {
      const { data: films } = await api.get<Film[]>(`/films/${id || -1}/similar`);
      setSimilarFilms(films);
    };
    const fetchFilmReviews = async () => {
      const { data: filmReviews } = await api.get<Review[]>(`/comments/${id || -1}`);
      setReviews(filmReviews);
    };

    setDataLoaded(false);
    fetchFilm()
      .then(() => fetchSimilarFilms())
      .then(() => fetchFilmReviews())
      .then(() => setDataLoaded(true))
      .catch((err: AxiosError) => {
        if (err.response && err.response.status === StatusCodes.NOT_FOUND) {
          dispatch(redirectToRoute(AppRoute.NotFound));
        }
      });
  }, [id]);


  const handleMyListClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!film){
      return;
    }

    const changeFilmFavoriteStatus = async () => {
      const { data: changedFilm } = await api.post<Film>(`${APIRoute.Favorite}/${film.id}/${film.isFavorite ? 0 : 1}`);

      return changedFilm;
    };

    changeFilmFavoriteStatus()
      .then((changedFilm) => {
        setFilm(changedFilm);
        store.dispatch(fetchFavoriteFilms());
      });
  };

  const handlePlayeBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!film) {
      return;
    }

    dispatch(redirectToRoute(`/player/${film.id}`));
  };

  if (!dataLoaded) {
    return <Loader />;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <UserBlock />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film?.genre}</span>
                <span className="film-card__year">{film?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={handlePlayeBtnClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {film && <MyListBtn isFavorite={film.isFavorite} onClick={handleMyListClick} filmsCount={favoriteFilms.length} /> }
                {
                  authorizationStatus === AuthorizationStatus.Auth &&
                  <a href={id ? `/films/${id}/review` : '#'} className="btn film-card__button">Add review</a>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
            </div>

            {film && reviews && <MovieTabs film={film} reviews={reviews} />}
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          {similarFilms && <FilmsList films={similarFilms} />}
        </section>

        <footer className="page-footer">
          <Logo light />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MoviePage;
