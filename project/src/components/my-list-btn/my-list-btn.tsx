import React, { FC } from 'react';

type Props = {
  isFavorite: boolean;
  filmsCount: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const MyListBtn: FC<Props> = (props) => {
  const { isFavorite, filmsCount, onClick } = props;

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={onClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        {isFavorite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
      </svg>
      <span>My list</span>
      <span className="film-card__count">{filmsCount}</span>
    </button>
  );
};

export default MyListBtn;
