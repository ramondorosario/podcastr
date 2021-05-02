import Image from "next/image";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import s from "./styles.module.scss";

export const Player = () => {
  const { play, episodeList, currentEpisodeIndex } = useContext(PlayerContext);
  const episode = episodeList[currentEpisodeIndex];
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
          <button className={s.playButton} disabled={!episode}>
            <img src="/images/play.svg" alt="Tocar" />
          </button>
          <button disabled={!episode}>
            <img src="/images/play-next.svg" alt="Tocar próxima" />
          </button>
          <button disabled={!episode}>
            <img src="/images/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
};
