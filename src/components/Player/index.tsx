import Image from "next/image";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import s from "./styles.module.scss";

export const Player = () => {
  const {
    togglePlay,
    setPlayingState,
    isPlaying,
    episodeList,
    currentEpisodeIndex,
  } = useContext(PlayerContext);

  const episode = episodeList[currentEpisodeIndex];
  const audioRef = useRef<HTMLAudioElement>(null);

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
          <span>00:00</span>
          {episode ? (
            <Slider
              className={s.playingBar}
              trackStyle={{ backgroundColor: "#04D361" }}
              railStyle={{ backgroundColor: "#9F75FF" }}
              handleStyle={{ borderColor: "#04D361", borderWidth: 4 }}
            />
          ) : (
            <div className={s.emptyBar} />
          )}
          <span>00:00</span>
        </div>
        <div className={s.buttons}>
          <button disabled={!episode}>
            <img src="/images/shuffle.svg" alt="Embaralhar" />
          </button>
          <button disabled={!episode}>
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
          <button disabled={!episode}>
            <img src="/images/play-next.svg" alt="Tocar próxima" />
          </button>
          <button disabled={!episode}>
            <img src="/images/repeat.svg" alt="Repetir" />
          </button>
        </div>

        {episode && (
          <audio
            ref={audioRef}
            src={episode.file.url}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        )}
      </footer>
    </div>
  );
};
