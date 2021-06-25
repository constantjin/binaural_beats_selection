import React, { useState } from "react";
import { initBeat, playBeat, stopBeat } from "../utils/beats";
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

export default function BeatButton({ hertz, freq, totalNumBeats }) {
  const [listened, setListened] = useState(false);
  const [thisChecked, setThisChecked] = useState(false);
  const [buttonText, setButtonText] = useState("🔈");
  const [clicked, setClicked] = useState("false");
  const globalIsPlaying = useBeatStore((state) => state.isPlaying);
  const globalChecked = useBeatStore((state) => state.checked);
  const globalNumListened = useBeatStore((state) => state.num_listened);

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
          setClicked(true);
          if (!globalIsPlaying || globalNumListened === totalNumBeats) {
            stopBeat();
            await sleep(300);
            initBeat(hertz, freq);
            setPlayingState(true);
            setButtonText("🎵");
            playBeat();
            if (!listened) {
              await sleep(5000);
              setListened(true);
              markListened();
              setButtonText("✔️");
            } else {
              await sleep(100);
            }
            setPlayingState(false);
          } else {
            setButtonText("❌");
            await sleep(100);
            setButtonText(listened ? "✔️" : "🔈");
            console.log("One beat is currently playing!");
          }
          setClicked(false);
        }}
      >
        <span>{clicked ? buttonText : listened ? "✔️" : "🔈"}</span>
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
