import { FC, useState, Fragment } from 'react';

const AddReviewForm: FC = () => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const MAX_RATING = 10;

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ratingInt = parseInt(e.target.value, 10);
    setRating(ratingInt);
  };

  const renderRating = (_rating: number) => {
    const ratingStr = _rating.toString();
    const isCurrentRatingChosen = _rating === rating;
    return (
      <Fragment key={_rating}>
        <input className="rating__input" checked={isCurrentRatingChosen} onChange={handleRatingChange} id={`star-${ratingStr}`} type="radio" name="rating" value={ratingStr} />
        <label className="rating__label" htmlFor={`star-${ratingStr}`}>Rating {ratingStr}</label>
      </Fragment>
    );
  };

  const ratings: JSX.Element[] = [...Array(MAX_RATING)].map((_, idx) => renderRating(idx + 1)).reverse(); // eslint-disable-line @typescript-eslint/no-unsafe-assignment

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">
            {ratings}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            className="add-review__textarea"
            name="review-text" id="review-text"
            placeholder="Review text"
            onChange={handleReviewTextChange}
            value={reviewText}
          >
          </textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;
