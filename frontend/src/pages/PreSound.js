import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  asyncLoadCategorySound,
  asyncPlaySoundOnce,
  stopAndUnloadCarSound,
} from "../utils/beats";
import { getSubjectStore } from "../stores";

export default function PreSound() {
  let history = useHistory();
  const carSoundURL = getSubjectStore().currSound.first_url;
  const category = getSubjectStore().currSound.category;

  useEffect(() => {
    const asyncInit = async () => {
      await asyncLoadCategorySound(carSoundURL, category);
      await asyncPlaySoundOnce();
      stopAndUnloadCarSound();
      history.push("/pre_rating");
    };

    asyncInit();
  }, [history, carSoundURL, category]);
  return (
    <div>
      <p className="text-7xl">+</p>
    </div>
  );
}
