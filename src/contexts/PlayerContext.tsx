import React, { createContext, useState } from "react";

interface IFile {
  url: string;
  type: string;
  duration: number;
}

interface IEpisode {
  title: string;
  members: string;
  thumbnail: string;
  file: IFile;
}

interface IPlayerContext {
  episodeList: IEpisode[];
  currentEpisodeIndex: number;
  play: (episode: IEpisode) => void;
}

export const PlayerContext = createContext({} as IPlayerContext);

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [episodeList, setEpisode] = useState<IEpisode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);

  const play = (episode: IEpisode) => {
    setEpisode([episode]);
    setCurrentEpisodeIndex(0);
  };

  return (
    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play }}>
      {children}
    </PlayerContext.Provider>
  );
};
