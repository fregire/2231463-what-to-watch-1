import { FC } from 'react';

type Props = {
  name: string;
  isActive: boolean;
  onClick: (name: string) => void;
}

const MovieTabItem: FC<Props> = (props) => {
  const { name, isActive, onClick } = props;

  return (
    <li className={`film-nav__item ${isActive ? 'film-nav__item--active' : ''}`}>
      <a
        href="#!"
        className="film-nav__link"
        onClick={
          (e) => {
            e.preventDefault();
            onClick(name);
          }
        }
      >
        {name}
      </a>
    </li>
  );
};

export default MovieTabItem;
