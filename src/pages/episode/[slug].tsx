import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import Image from "next/image";
import Link from "next/link";

import { api } from "../../services/api";
import { GetStaticPaths, GetStaticProps } from "next";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import { usePlayer } from "../../contexts/PlayerContext";

import s from "./styles.module.scss";

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
  description: string;
  file: IFile;
}

interface IEpisodeProps {
  episode: IEpisode;
}

const Episode = ({ episode }: IEpisodeProps) => {
  const { play } = usePlayer();

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.thumbnail}>
          <Link href="/">
            <button>
              <img src="/images/arrow-left.svg" alt="Voltar página" />
            </button>
          </Link>
          <Image
            width={720}
            height={220}
            objectFit="cover"
            src={episode.thumbnail}
          />
          <button onClick={() => play(episode)}>
            <img src="/images/play.svg" alt="Tocar agora" />
          </button>
        </div>
        <div className={s.description}>
          <div className={s.header}>
            <h2>{episode.title}</h2>
            <span>{episode.members}</span>
            <span>{episode.published_at}</span>
            <span>{episode.file.durationAsString}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: episode.description }} />
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;
  const { data } = await api.get(`episodes/${slug}`);

  const { published_at, file, ...datas }: IEpisode = data;

  file.durationAsString = convertDurationToTimeString(file.duration);

  const episode = {
    published_at: dayjs(published_at).locale("pt-br").format("D, MMM YY"),
    file,
    ...datas,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default Episode;
