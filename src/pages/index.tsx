export default function Home(props) {
  return <span>{props.episodes}</span>;
}

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:3333/episodes");
  const data = await response.json();

  return {
    props: {
      episodes: JSON.stringify(data),
    },
    revalidate: 60 * 60 * 8,
  };
};
