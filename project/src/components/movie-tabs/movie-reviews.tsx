import { FC } from 'react';
import { Review } from '../../types/review';
import ReviewComponent from '../review/review';


type Props = {
  reviews: Review[];
}

const MovieReviews: FC<Props> = (props) => {
  const { reviews } = props;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.map((review) => <ReviewComponent key={review.id} review={review} />)}
      </div>
    </div>
  );
};

export default MovieReviews;
