import { FC, useState } from 'react';
import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';

type Props = {
  films: Film[];
};

const FilmsList: FC<Props> = (props) => {
  const { films } = props;
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);

  const handleMouseOver = (film: Film) => {
    setActiveFilm(film);
  };

  return (
    <>
      <div style={{display: 'none'}}>{activeFilm?.name}</div>
      <div className="catalog__films-list">
        {films.map((film) => <FilmCard key={film.id} onMouseOver={handleMouseOver} film={film}/>)}
      </div>
    </>
  );
};

export default FilmsList;
