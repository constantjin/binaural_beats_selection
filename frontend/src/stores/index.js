import create from "zustand";

export const useBeatStore = create(() => ({
  isPlaying: false,
  checked: false,
  binaural: { hertz: 0, freq: 0 },
  num_listened: 0,
}));

export const getBeatStore = () => {
  return useBeatStore.getState();
};

export const initBeatStore = () => {
  useBeatStore.setState((state) => ({
    isPlaying: false,
    checked: false,
    binaural: { hertz: 0, freq: 0 },
    num_listened: 0,
  }));
};

export const setPlayingState = (playState) => {
  useBeatStore.setState((state) => ({ ...state, isPlaying: playState }));
};

export const setChecked = (checkState) => {
  useBeatStore.setState((state) => ({ ...state, checked: checkState }));
};

export const setBinaural = (hertz, freq) => {
  useBeatStore.setState((state) => ({ ...state, binaural: { hertz, freq } }));
};

export const markListened = () => {
  useBeatStore.setState((state) => ({
    ...state,
    num_listened: state.num_listened + 1,
  }));
};

export const useSubjectStore = create(() => ({
  subjectId: null,
  currSound: null,
  soundList: [],
  CAR_dummy: "",
  IADS_dummy: "",
  IADS_volume: 0.5,
}));

export const getSubjectStore = () => {
  return useSubjectStore.getState();
};

export const initSounds = (data) => {
  const { CAR_dummy, IADS_dummy, sounds } = data;
  useSubjectStore.setState((state) => ({
    ...state,
    CAR_dummy: CAR_dummy,
    IADS_dummy: IADS_dummy,
    soundList: sounds,
  }));
};

export const setSubjectId = (id) => {
  useSubjectStore.setState((state) => ({ ...state, subjectId: id }));
};

export const setCurrSound = () => {
  let currSoundList = [...useSubjectStore.getState().soundList];
  const soundListLength = currSoundList.length;
  if (soundListLength === 0) {
    return null;
  }
  const sound = currSoundList.pop();
  useSubjectStore.setState((state) => ({
    ...state,
    currSound: sound,
    soundList: currSoundList,
  }));
  return sound; // For debugging
};

export const setSubjectIADSVolume = (vol) => {
  useSubjectStore.setState((state) => ({ ...state, IADS_volume: vol }));
};
