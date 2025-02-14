import React, { useState, useEffect } from "react";

import VolumeTest from "../components/VolumeTest";
import RegisterForm from "../components/RegisterForm";

import { initSounds } from "../stores";
import { asyncFetchSoundUrls } from "../utils/api";

export default function RegisterPage() {
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [beatVolume, setBeatVolume] = useState(0);
  const [iadsVolume, setIADSVolume] = useState(0);
  const [volumeTestFinished, setVolumeTestFinished] = useState(false);

  useEffect(() => {
    const asyncInit = async () => {
      const sound_responses = await asyncFetchSoundUrls();
      initSounds(sound_responses.data);
      setSoundLoaded(true);
    };

    asyncInit();
  }, []);

  return (
    <div>
      {soundLoaded &&
        (!volumeTestFinished ? (
          <VolumeTest
            setVolumeTestFinished={setVolumeTestFinished}
            setIADSVolume={setIADSVolume}
            setBeatVolume={setBeatVolume}
          />
        ) : (
          <div>
            <RegisterForm beatVolume={beatVolume} iadsVolume={iadsVolume} />
          </div>
        ))}
    </div>
  );
}
