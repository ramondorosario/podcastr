import "../styles/global.scss";

import { Header } from "../components/Header";
import { Player } from "../components/Player";

import Head from "next/head";

import s from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
    </>
  );
}

export default MyApp;
