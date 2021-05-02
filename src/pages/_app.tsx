import "../styles/global.scss";

import { Header } from "../components/Header";
import { Player } from "../components/Player";

import Head from "next/head";

import s from "../styles/app.module.scss";
import { PlayerContextProvider } from "../contexts/PlayerContext";

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <Head>
        <title>Podcastr</title>
      </Head>
      <div className={s.container}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
