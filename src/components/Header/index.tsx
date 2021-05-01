import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import Link from "next/link";

import s from "./styles.module.scss";

export const Header = () => {
  const currentDate = dayjs().locale("pt-br").format("ddd, D MMMM");

  return (
    <header className={s.container}>
      <Link href="/">
        <a>
          <img src="/images/logo.svg" alt="Podcastr" />
        </a>
      </Link>
      <div className={s.separate} />
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
    </header>
  );
};
