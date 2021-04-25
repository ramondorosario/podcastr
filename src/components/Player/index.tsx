import s from "./styles.module.scss";

export const Player = () => {
  return (
    <div className={s.container}>
      <header>
        <img src="/images/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>
      <div className={s.card}>
        <strong>Selecione um podcast para ouvir</strong>
      </div>
      <footer className={s.emptyFooter}>
        <div className={s.progress}>
          <span>00:00</span>
          <div className={s.bar} />
          <span>00:00</span>
        </div>
        <div className={s.buttons}>
          <button>
            <img src="/images/shuffle.svg" alt="Embaralhar" />
          </button>
          <button>
            <img src="/images/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button className={s.playButton}>
            <img src="/images/play.svg" alt="Tocar" />
          </button>
          <button>
            <img src="/images/play-next.svg" alt="Tocar próxima" />
          </button>
          <button>
            <img src="/images/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
};
