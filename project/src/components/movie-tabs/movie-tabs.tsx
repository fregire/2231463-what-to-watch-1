import { FC, useState } from 'react';
import MovieTabItem from './movie-tab-item';
import MovieReviews from './movie-reviews';
import MovieDetails from './movie-details';
import MovieOverview from './movie-overview';
import { Film } from '../../types/film';
import { Review } from '../../types/review';

const TABS = ['Overview', 'Details', 'Reviews'];

type Props = {
  film: Film;
  reviews: Review[];
}

const MovieTabs: FC<Props> = (props) => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const { film, reviews } = props;

  const handleTabClick = (name: string) => {
    setActiveTab(name);
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            TABS.map((tabName) =>
              <MovieTabItem key={tabName} name={tabName} isActive={tabName === activeTab} onClick={handleTabClick} />)
          }
        </ul>
      </nav>

      {activeTab === 'Reviews' && <MovieReviews reviews={reviews} />}
      {activeTab === 'Overview' && <MovieOverview film={film} />}
      {activeTab === 'Details' && <MovieDetails film={film} />}
    </div>
  );
};

export default MovieTabs;
