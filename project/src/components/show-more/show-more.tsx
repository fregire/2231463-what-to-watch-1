import { FC } from 'react';


type Props = {
  onClick: () => void;
};

const ShowMore: FC<Props> = (props) => {
  const { onClick } = props;

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        onClick={onClick}
        type="button"
      >
        Show more
      </button>
    </div>
  );
};

export default ShowMore;
