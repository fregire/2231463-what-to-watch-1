import { FC } from 'react';
import { Film } from '../../types/film';
import AddReviewForm from '../../components/add-review/add-review';
import UserBlock from '../../components/user-block/user-block';
import Logo from '../../components/logo/logo';

type Props = {
  film: Film;
}

const AddReviewPage: FC<Props> = (props) => {
  const { film } = props;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{film.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm />
    </section>
  );
};

export default AddReviewPage;
