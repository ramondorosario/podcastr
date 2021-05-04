import Image from "next/image";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { Repeat } from "../svg/Repeat";
import { Shuffle } from "../svg/Shuffle";

import { useEffect, useRef, useState } from "react";
import { usePlayer } from "../../contexts/PlayerContext";

import s from "./styles.module.scss";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";

export const Player = () => {
  const {
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleLoop,
    isLooping,
    isShuflling,
    hasNextEpisode,
    hasPreviousEpisode,
    isPlaying,
    episodeList,
    currentEpisodeIndex,
  } = usePlayer();

  const [progress, setProgress] = useState<number>(0);

  const episode = episodeList[currentEpisodeIndex];
  const audioRef = useRef<HTMLAudioElement>(null);

  const setupProgressListener = () => {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  };

  const handleSeek = (amount: number) => {
    audioRef.current.currentTime = amount;
    setProgress(amount);
  };

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className={s.container}>
      <header>
        <img src="/images/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>
      {episode ? (
        <div className={s.playingPodcast}>
          <Image
            width={320}
            height={400}
            objectFit="cover"
            src={episode.thumbnail}
          />
          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={s.emptyPlayer}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}
      <footer className={!episode ? s.emptyFooter : ""}>
        <div className={s.progress}>
          <span>{convertDurationToTimeString(progress)}</span>
          {episode ? (
            <Slider
              max={episode.file.duration}
              value={progress}
              onChange={handleSeek}
              className={s.playingBar}
              trackStyle={{ backgroundColor: "#04D361" }}
              railStyle={{ backgroundColor: "#9F75FF" }}
              handleStyle={{ borderColor: "#04D361", borderWidth: 4 }}
            />
          ) : (
            <div className={s.emptyBar} />
          )}
          <span>
            {convertDurationToTimeString(episode?.file.duration ?? 0)}
          </span>
        </div>
        <div className={s.buttons}>
          <button
            disabled={!episode || episodeList.length === 1}
            className={isShuflling ? s.shuffle : ""}
            onClick={() => {
              toggleShuffle();
            }}
          >
            <Shuffle />
          </button>
          <button
            disabled={!episode || (!hasPreviousEpisode && !isShuflling)}
            onClick={playPrevious}
          >
            <img src="/images/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button
            className={s.playButton}
            disabled={!episode}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/images/pause.svg" alt="Pausar" />
            ) : (
              <img src="/images/play.svg" alt="Tocar" />
            )}
          </button>
          <button
            disabled={!episode || (!hasNextEpisode && !isShuflling)}
            onClick={playNext}
          >
            <img src="/images/play-next.svg" alt="Tocar próxima" />
          </button>
          <button
            className={isLooping ? s.repeat : ""}
            disabled={!episode}
            onClick={() => {
              toggleLoop();
            }}
          >
            <Repeat />
          </button>
        </div>

        {episode && (
          <audio
            ref={audioRef}
            src={episodeList[currentEpisodeIndex].file.url}
            loop={isLooping}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onLoadedMetadataCapture={setupProgressListener}
          />
        )}
      </footer>
    </div>
  );
};
