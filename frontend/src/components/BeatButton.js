import React, { useState } from "react";
import {
  initBeat,
  playBeat,
  stopBeat,
  justStopCarSound,
  checkCarSoundPlaying,
  getSoundDurationInMs,
  playSound,
} from "../utils/beats";
import {
  useBeatStore,
  setPlayingState,
  setChecked,
  setBinaural,
  markListened,
} from "../stores";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function BeatButton({ hertz, freq }) {
  const [listened, setListened] = useState(false);
  const [thisChecked, setThisChecked] = useState(false);
  const [thisPlaying, setThisPlaying] = useState(false);
  const globalIsPlaying = useBeatStore((state) => state.isPlaying);
  const globalChecked = useBeatStore((state) => state.checked);

  const handleCheckbox = (event) => {
    if (event.target.checked) {
      setThisChecked(true);
      setChecked(true);
      setBinaural(hertz, freq);
    } else {
      setThisChecked(false);
      setChecked(false);
      setBinaural(0, 0);
    }
  };

  const disableCheckbox = () => {
    if (!listened) {
      return true;
    } else {
      if (thisChecked) {
        return false;
      } else {
        return globalChecked;
      }
    }
  };

  return (
    <div className="m-5">
      <button
        className="h-10 px-3 border-2 rounded-lg focus:outline-none"
        onClick={async (e) => {
          e.preventDefault();
          if (!globalIsPlaying) {
            if (checkCarSoundPlaying()) {
              justStopCarSound();
              stopBeat();
              await sleep(200);
            }
            initBeat(hertz, freq);
            setPlayingState(true);
            setThisPlaying(true);
            playBeat();
            let duration = getSoundDurationInMs();
            playSound();
            await sleep(duration);
            if (!listened) {
              setListened(true);
              markListened();
            }
            setPlayingState(false);
            setThisPlaying(false);
          } else {
            console.log("One beat is currently playing!");
          }
        }}
      >
        <span>{thisPlaying ? "🎵" : listened ? "✔️" : "🔈"}</span>
      </button>
      <input
        type="checkbox"
        name="select"
        disabled={disableCheckbox()}
        onChange={handleCheckbox}
        className="ml-4"
      />
    </div>
  );
}
