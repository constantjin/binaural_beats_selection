import React, { useState } from "react";
import Button from "./Button";
import {
  playCarDummySound,
  playIADSDummySound,
  stopCarDummySound,
  stopIADSDummySound,
  stopAndUnloadDummySounds,
  stopBeat,
  setVolume,
} from "../utils/beats";

export default function BeatVolumeTest({
  setBeatVolume,
  setVolumeTestFinished,
}) {
  const [currVolume, setCurrVolume] = useState(-35);
  const [carPlaying, setCarPlaying] = useState(false);
  const [iadsPlaying, setIADSPlaying] = useState(false);

  return (
    <div>
      <p>
        현재 삐- 소리의 <b>기계음</b>이 재생중입니다.
        <br />
        <br />
        이전과 마찬가지로, 두 소리를 번갈아 들으면서
        <br />
        <b>기계음</b>의 크기를 <b className="text-red-400">집중하면</b> 들을 수
        <br />
        있을 정도로 조절해 주세요.
      </p>
      <hr className="border-1 w-full my-4" />
      <div className="mb-5 grid space-y-3">
        <Button
          text={carPlaying ? "자동차 소리 정지" : "자동차 소리 시작"}
          onClick={() => {
            if (carPlaying) {
              stopCarDummySound();
              setCarPlaying(false);
            } else {
              playCarDummySound();
              setCarPlaying(true);
            }
          }}
        />
        <Button
          text={iadsPlaying ? "환호성 소리 정지" : "환호성 소리 시작"}
          onClick={() => {
            if (iadsPlaying) {
              stopIADSDummySound();
              setIADSPlaying(false);
            } else {
              playIADSDummySound();
              setIADSPlaying(true);
            }
          }}
        />
      </div>
      <label htmlFor="volume" className="mr-5">
        🔈 기계음 볼륨
      </label>
      <input
        type="range"
        id="volume"
        name="volume"
        min="-50"
        max="-35"
        step="0.01"
        value={currVolume}
        onChange={(event) => {
          setCurrVolume(event.target.value);
          setVolume(currVolume);
        }}
        className="block w-full h-3 mt-3"
      />
      <br />
      <Button
        text="다음 단계로"
        onClick={() => {
          stopBeat();
          stopAndUnloadDummySounds();
          setBeatVolume(currVolume);
          setVolumeTestFinished(true);
        }}
      />
    </div>
  );
}
