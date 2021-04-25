import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import s from "./styles.module.scss";

export const Header = () => {
  const currentDate = dayjs().locale("pt-br").format("ddd, D MMMM");

  return (
    <header className={s.container}>
      <img src="/images/logo.svg" alt="Podcastr" />
      <div className={s.separate} />
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
    </header>
  );
};
