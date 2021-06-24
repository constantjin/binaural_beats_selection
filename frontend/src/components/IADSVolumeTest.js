import React, { useState } from "react";
import Button from "./Button";
import {
  playCarDummySound,
  playIADSDummySound,
  stopCarDummySound,
  stopIADSDummySound,
  setIADSDummySoundVolume,
  testBeat,
  playBeat,
} from "../utils/beats";
import { setSubjectIADSVolume } from "../stores";

export default function IADSVolumeTest({
  setIADSVolume,
  setIADSVolumeTestFinished,
}) {
  const [currVolume, setCurrVolume] = useState(0.5);
  const [carPlaying, setCarPlaying] = useState(false);
  const [iadsPlaying, setIADSPlaying] = useState(false);

  return (
    <div>
      <p>
        아래의 두 버튼의 소리를 번갈아 들으면서, <br />
        <b>환호성 소리의 크기</b>가 <b>자동차 소리</b>와 <br />
        <b className="text-red-400">비슷하게</b> 조절해 주세요.
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
        👏 환호성 볼륨
      </label>
      <input
        type="range"
        id="volume"
        name="volume"
        min="0.0"
        max="0.5"
        step="0.01"
        value={currVolume}
        onChange={(event) => {
          setCurrVolume(event.target.value);
          setIADSDummySoundVolume(currVolume);
        }}
        className="block w-full h-3 mt-3"
      />
      <br />
      <Button
        text="다음 단계로"
        onClick={() => {
          stopCarDummySound();
          stopIADSDummySound();
          setIADSVolume(currVolume);
          setSubjectIADSVolume(currVolume);
          testBeat();
          playBeat();
          setIADSVolumeTestFinished(true);
        }}
      />
    </div>
  );
}
