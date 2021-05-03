import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import Image from "next/image";
import Link from "next/link";

import { api } from "../services/api";
import { GetStaticProps } from "next";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import { usePlayer } from "../contexts/PlayerContext";

import s from "../styles/home.module.scss";

interface IFile {
  url: string;
  type: string;
  duration: number;
  durationAsString: string;
}

interface IEpisode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  file: IFile;
}

interface IHomesProps {
  latestEpisodes: IEpisode[];
  allEpisodes: IEpisode[];
}

export default function Home(props: IHomesProps) {
  const { latestEpisodes, allEpisodes } = props;
  const { playList } = usePlayer();

  const podcastList = [...latestEpisodes, ...allEpisodes];

  return (
    <div className={s.container}>
      <section className={s.latestEpisodes}>
        <h2>Ultimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode, index) => {
            return (
              <li key={episode.id}>
                <Image
                  width={288}
                  height={288}
                  objectFit="cover"
                  src={episode.thumbnail}
                  alt={episode.title}
                />
                <div className={s.details}>
                  <Link href={`/episode/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.published_at}</span>
                  <span>{episode.file.durationAsString}</span>
                </div>
                <button onClick={() => playList(podcastList, index)}>
                  <img src="/images/play-green.svg" alt="Tocar podcast" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={s.allEpisodes}>
        <h2>Todos os episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th colSpan={2}>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td className={s.image}>
                    <Image
                      width="120"
                      height="120"
                      objectFit="cover"
                      src={episode.thumbnail}
                      alt={episode.title}
                    />
                  </td>
                  <td>
                    <Link href={`/episode/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td className={s.date}>{episode.published_at}</td>
                  <td>{episode.file.durationAsString}</td>
                  <td>
                    <button
                      onClick={() =>
                        playList(podcastList, index + latestEpisodes.length)
                      }
                    >
                      <img src="/images/play-green.svg" alt="Tocar podcast" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode: IEpisode) => {
    const { published_at, file, ...datas } = episode;

    file.durationAsString = convertDurationToTimeString(file.duration);

    return {
      published_at: dayjs(published_at).locale("pt-br").format("D, MMM YY"),
      file,
      ...datas,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
