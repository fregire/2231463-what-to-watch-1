import { FC } from 'react';

type Props = {
  score: number;
  isChosen: boolean;
  onChange: (value: number) => void;
}

const RatingStar: FC<Props> = (props) => {
  const { score, isChosen, onChange } = props;
  const scoreStr = score.toString();
  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange(value);
  };

  return (
    <>
      <input className="rating__input" checked={isChosen} onChange={handleRatingChange} id={`star-${scoreStr}`} type="radio" name="rating" value={scoreStr} />
      <label className="rating__label" htmlFor={`star-${scoreStr}`}>Rating {scoreStr}</label>
    </>
  );
};

export default RatingStar;
