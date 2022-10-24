import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film';
import { getFilmUrl } from '../../utils';

type Props = {
  film: Film;
  onMouseOver: (film: Film) => void;
}

const FilmCard: FC<Props> = (props) => {
  const { film, onMouseOver } = props;

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={(evt) => {
        onMouseOver(film);
      }}
    >
      <div className="small-film-card__image">
        <img
          src={film.previewImage}
          alt={film.name}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          to={getFilmUrl(film)}
          className="small-film-card__link"
        >
          {film.name}
        </Link>
      </h3>
    </article>
  );
};

export default FilmCard;
