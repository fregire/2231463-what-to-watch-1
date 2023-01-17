import { FC } from 'react';
import FilmsList from '../../components/films-list/films-list';
import UserBlock from '../../components/user-block/user-block';
import Logo from '../../components/logo/logo';
import { useAppSelector } from '../../hooks';


const MyListPage: FC = () => {
  // const { films } = props;
  const { favoriteFilms } = useAppSelector((state) => state);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Logo />
        </div>

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>
        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={favoriteFilms} />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <Logo light />
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyListPage;
