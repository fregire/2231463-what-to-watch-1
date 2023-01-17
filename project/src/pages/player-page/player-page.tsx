import React, { FC, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Film } from '../../types/film';
import { api } from '../../services/api';
import browserHistory from '../../browser-history';

const PlayerPage: FC = () => {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setPlaying] = useState<boolean>(true);

  const getProgress = () => currentTime / duration * 100;
  const formatTime = (time: number) => {
    const evenTime = Math.round(time);
    return new Date(evenTime * 1000).toISOString().substring(11, 19);
  };

  const runPlayerIfNecessary = (currIsPlaying: boolean) => {
    if (!videoPlayerRef.current) {
      return;
    }

    if (currIsPlaying) {
      videoPlayerRef.current?.play();
    } else {
      videoPlayerRef.current?.pause();
    }
  };

  useEffect(() => {
    const fetchFilm = async () => {
      if (!id){
        return null;
      }

      const { data: filmInfo } = await api.get<Film>(`/films/${id}`);

      setFilm(filmInfo);
    };

    fetchFilm();
  }, []);


  const handlePlayPauseButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPlaying(!isPlaying);

    runPlayerIfNecessary(!isPlaying);
  };


  const handleProgress = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  const handleVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration);
  };

  const handleFullScreenClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!videoPlayerRef.current){
      return;
    }

    videoPlayerRef.current.requestFullscreen();
  };

  const handleExitBtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    browserHistory.back();
  };

  const handleVideoPlayerEnded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setPlaying(false);
  };

  return (
    <div className="player">
      <video
        ref={videoPlayerRef}
        src={film?.videoLink}
        className="player__video"
        poster={film?.posterImage}
        onTimeUpdate={handleProgress}
        onLoadedData={handleVideoLoaded}
        onEnded={handleVideoPlayerEnded}
        autoPlay={isPlaying}
        muted
      >
      </video>
      <button type="button" className="player__exit" onClick={handleExitBtnClick}>Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={getProgress()} max="100"></progress>
            <div className="player__toggler" style={{ left: `${getProgress()}%` }}>Toggler</div>
          </div>
          <div className="player__time-value">{formatTime(duration - currentTime)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayPauseButtonClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              {isPlaying ? <use xlinkHref="#pause"></use> : <use xlinkHref="#play-s"></use>}
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{film?.name}</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreenClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerPage;
