import { FC, useState } from 'react';
import RatingStar from './rating-star';

const MAX_RATING = 10;

const AddReviewForm: FC = () => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const ratings: JSX.Element[] = [...Array(MAX_RATING)] // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    .map((_, idx) =>
      (
        <RatingStar
          key={idx} // eslint-disable-line react/no-array-index-key
          score={idx + 1}
          isChosen={rating === (idx + 1)}
          onChange={handleRatingChange}
        />
      )
    );

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
