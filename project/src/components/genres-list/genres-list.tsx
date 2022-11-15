import React, { FC } from 'react';
import { useAppDispatch } from '../../hooks';
import { changeGenre } from '../../store/action';

type Props = {
  genres: string[];
  activeGenre: string;
};

type GenreItemProps = {
  genre: string;
  isActive: boolean;
};

const GenreItem: FC<GenreItemProps> = (props) => {
  const { genre, isActive } = props;
  const dispatch = useAppDispatch();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(changeGenre({genre: genre}));
  };

  return (
    <li className={`catalog__genres-item ${isActive ? ' catalog__genres-item--active' : ''}`}>
      <a href='#' className='catalog__genres-link' onClick={handleLinkClick}>{genre}</a>
    </li>
  );
};

const GenresList: FC<Props> = (props) => {
  const { genres, activeGenre } = props;

  return (
    <ul className='catalog__genres-list'>
      {genres.map((genre) => <GenreItem key={genre} genre={genre} isActive={genre === activeGenre}/>)}
    </ul>
  );
};

export default GenresList;
