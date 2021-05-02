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
  isPlaying: boolean;
  play: (episode: IEpisode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext({} as IPlayerContext);

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [episodeList, setEpisode] = useState<IEpisode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const play = (episode: IEpisode) => {
    setEpisode([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const setPlayingState = (state: boolean) => {
    setIsPlaying(state);
  };

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        play,
        togglePlay,
        setPlayingState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
