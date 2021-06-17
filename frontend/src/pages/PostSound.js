import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  initBeat,
  playBeat,
  stopBeat,
  asyncLoadCategorySound,
  asyncPlaySoundOnce,
  stopAndUnloadCarSound,
} from "../utils/beats";
import { getBeatStore, getSubjectStore } from "../stores";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function PostSound() {
  let history = useHistory();
  const binaural = getBeatStore().binaural;
  const carSoundURL = getSubjectStore().currSound.first_url;
  const category = getSubjectStore().currSound.category;
  useEffect(() => {
    const asyncInit = async () => {
      initBeat(binaural.hertz, binaural.freq);
      playBeat();
      await sleep(1000 * 60); // 1 minute
      await asyncLoadCategorySound(carSoundURL, category, false);
      await asyncPlaySoundOnce();
      stopBeat();
      stopAndUnloadCarSound();
      history.push("/post_rating");
    };

    asyncInit();
  }, [history, binaural, carSoundURL, category]);
  return (
    <div>
      <p className="text-7xl">+</p>
    </div>
  );
}
