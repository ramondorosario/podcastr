import "../styles/global.scss";

import { Header } from "../components/components/Header";
import { Player } from "../components/components/Player";

import s from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className={s.container}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  );
}

export default MyApp;
