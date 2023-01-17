import { FC, useState, useEffect } from 'react';
import FilmsList from '../../components/films-list/films-list';
import GenresList from '../../components/genres-list/genres-list';
import ShowMore from '../../components/show-more/show-more';
import { Film } from '../../types/film';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { ALL_GENRES } from '../../const';
import UserBlock from '../../components/user-block/user-block';
import MyListBtn from '../../components/my-list-btn/my-list-btn';
import { api } from '../../services/api';
import { APIRoute } from '../../const';
import { redirectToRoute } from '../../store/action';


const SHOWED_FILMS_STEP = 8;

const MainPage: FC = () => {
  const [promoFilm, setPromoFilm] = useState<Film | null>(null);
  const [showedFilmsCount, setShowedFilmsCount] = useState(SHOWED_FILMS_STEP);
  const { films, activeGenre } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const genres = [ALL_GENRES]
    .concat([...new Set(films.map((film) => film.genre))]);
  const filteredFilms = films
    .filter((film) => film.genre === activeGenre || activeGenre === ALL_GENRES)
    .slice(0, showedFilmsCount);

  const handleMoreBtnClick = () => {
    setShowedFilmsCount(showedFilmsCount + SHOWED_FILMS_STEP);
  };

  const handlePlayeBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!promoFilm) {
      return;
    }

    dispatch(redirectToRoute(`/player/${promoFilm.id}`));
  };

  useEffect(() => {
    const fetchPromoFilm = async () => {
      const { data: actualPromoFilm } = await api.get<Film>(APIRoute.Promo);

      setPromoFilm(actualPromoFilm);
    };

    fetchPromoFilm();
  }, []);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src={promoFilm?.backgroundImage}
            alt={promoFilm?.name}
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={promoFilm?.posterImage}
                alt={promoFilm?.name}
                width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={handlePlayeBtnClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {
                  promoFilm
                  && <MyListBtn filmId={promoFilm.id} />
                }
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres} activeGenre={activeGenre}/>

          <FilmsList films={filteredFilms} />

          {filteredFilms.length % SHOWED_FILMS_STEP === 0 && <ShowMore onClick={handleMoreBtnClick}/>}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MainPage;
