import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film';
import { getFilmUrl } from '../../utils';
import VideoPlayer from '../video-player/video-player';

const TIME_BEFORE_PLAYING_IN_MS = 1000;
type Props = {
  film: Film;
  onMouseOver: (film: Film) => void;
}

const FilmCard: FC<Props> = (props) => {
  const { film, onMouseOver } = props;
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isNeedVideoToPlay, setIsNeedVideoToPlay] = useState(false);

  useEffect(() => {
    let needUpdate = true;

    if (isNeedVideoToPlay) {
      setTimeout(() => needUpdate && setIsVideoPlaying(true), TIME_BEFORE_PLAYING_IN_MS);
    }

    return () => {needUpdate = false;};
  }, [isNeedVideoToPlay]);

  const handleFilmCardMouseLeave = () => {
    setIsNeedVideoToPlay(false);
    setIsVideoPlaying(false);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={(evt) => {
        onMouseOver(film);
        setIsNeedVideoToPlay(true);
      }}
      onMouseLeave={handleFilmCardMouseLeave}
    >
      <div className="small-film-card__image">
        <VideoPlayer
          width={280}
          height={175}
          poster={film.previewImage}
          muted
          src={film.videoLink}
          isPlaying={isVideoPlaying}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          to={getFilmUrl(film)}
          className="small-film-card__link"
        >
          {film.name}
        </Link>
      </h3>
    </article>
  );
};

export default FilmCard;
