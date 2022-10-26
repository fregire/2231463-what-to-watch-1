import { FC, useRef, useEffect } from 'react';

type Props = {
  src: string;
  poster: string;
  muted: boolean;
  width: number;
  height: number;
  isPlaying: boolean;
}

const VideoPlayer: FC<Props> = (props) => {
  const { src, poster, muted, width, height, isPlaying } = props;
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoPlayerRef === null) {
      return;
    }

    if (isPlaying) {
      videoPlayerRef.current?.play();
    } else {
      videoPlayerRef.current?.load();
    }

  }, [isPlaying]);

  return <video ref={videoPlayerRef} width={width} height={height} src={src} poster={poster} muted={muted} />;
};

export default VideoPlayer;
