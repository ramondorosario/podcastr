import React, { createContext, useContext, useState } from "react";

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
  isShuflling: boolean;
  isLooping: boolean;
  play: (episode: IEpisode) => void;
  playList: (list: IEpisode[], index: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state: boolean) => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
  hasNextEpisode: boolean;
  hasPreviousEpisode: boolean;
}

export const PlayerContext = createContext({} as IPlayerContext);

export const PlayerContextProvider: React.FC = ({ children }) => {
  const [episodeList, setEpisodeList] = useState<IEpisode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [isShuflling, setIsShuffling] = useState<boolean>(false);
  const [indexsShuffled, setIndexsShuffled] = useState<number[]>([]);

  const play = (episode: IEpisode) => {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  };

  const playList = (list: IEpisode[], index: number) => {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  };

  const hasNextEpisode = currentEpisodeIndex < episodeList.length - 1;

  const hasPreviousEpisode = currentEpisodeIndex > 0;

  const playNext = () => {
    if (isShuflling) {
      let index = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(index);
    } else if (hasNextEpisode) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  };

  const playPrevious = () => {
    if (hasPreviousEpisode) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const setPlayingState = (state: boolean) => {
    setIsPlaying(state);
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const toggleShuffle = () => {
    setIsShuffling(!isShuflling);
  };

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isShuflling,
        isLooping,
        hasNextEpisode,
        hasPreviousEpisode,
        play,
        playList,
        playNext,
        playPrevious,
        togglePlay,
        setPlayingState,
        toggleShuffle,
        toggleLoop,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};
