import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../components/services/api";
import { convertDurationToTimeString } from "../../components/utils/convertDurationToTimeString";
import { useRouter } from "next/router";

interface IFile {
  url: string;
  type: string;
  duration: string;
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
  return <h2>{episode.title}</h2>;
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

  file.duration = convertDurationToTimeString(Number(file.duration));

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
