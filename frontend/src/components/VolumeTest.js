import React, { useState } from "react";
import Button from "./Button";
import IADSVolumeTest from "./IADSVolumeTest";
import BeatVolumeTest from "./BeatVolumeTest";
import { asyncLoadDummySounds } from "../utils/beats";

import { useSubjectStore } from "../stores";

export default function VolumeTest({
  setBeatVolume,
  setIADSVolume,
  setVolumeTestFinished,
}) {
  const [started, setStarted] = useState(false);
  const [iadsVolumeTestFinished, setIADSVolumeTestFinished] = useState(false);
  const car_dummy = useSubjectStore((state) => state.CAR_dummy);
  const iads_dummy = useSubjectStore((state) => state.IADS_dummy);

  return (
    <div>
      {!started ? (
        <div>
          <h3 className="font-semibold mb-2">
            실험에 참여해주셔서 감사합니다!
          </h3>
          <p className="text-base px-5 mb-5">
            간단한 사운드 테스트를 진행하겠습니다. <br />
            이어폰/헤드셋을 착용하신 후, <br />
            아래의 시작 버튼을 클릭해 주세요
          </p>
          <Button
            text="시작"
            onClick={async () => {
              await asyncLoadDummySounds(car_dummy, iads_dummy);
              setStarted(true);
            }}
          />
        </div>
      ) : iadsVolumeTestFinished ? (
        <BeatVolumeTest
          setBeatVolume={setBeatVolume}
          setVolumeTestFinished={setVolumeTestFinished}
        />
      ) : (
        <IADSVolumeTest
          setIADSVolume={setIADSVolume}
          setIADSVolumeTestFinished={setIADSVolumeTestFinished}
        />
      )}
    </div>
  );
}
