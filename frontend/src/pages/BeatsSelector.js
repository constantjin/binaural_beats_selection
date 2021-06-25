import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import BeatButton from "../components/BeatButton";
import Button from "../components/Button";
import { initBeatStore, useBeatStore, getSubjectStore } from "../stores";
import {
  stopBeat,
  stopAndUnloadCarSound,
  asyncLoadCategorySound,
  playSound,
} from "../utils/beats";
import { asyncSaveBeat } from "../utils/api";

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BeatsSelector() {
  const [pairs, setPairs] = useState([]);
  const [pairsLength, setPairsLength] = useState(0);
  const [error, setError] = useState("");
  const binaural = useBeatStore((state) => state.binaural);
  const num_listened = useBeatStore((state) => state.num_listened);
  const carSoundURL = getSubjectStore().currSound.second_url;
  const subject_id = getSubjectStore().subjectId;
  const sound_name = getSubjectStore().currSound.second_name;
  const category = getSubjectStore().currSound.category;
  let history = useHistory();

  const handleNext = async () => {
    if (num_listened < pairsLength) {
      setError("아직 듣지 않은 소리가 있습니다. 모든 소리를 들어 주세요.");
    } else if (binaural.hertz === 0 || binaural.freq === 0) {
      setError("가장 긍정적인 소리에 체크해 주세요.");
    } else {
      setError("");
      stopBeat();
      stopAndUnloadCarSound();
      try {
        await asyncSaveBeat({
          subject_id,
          category,
          sound_name,
          carrier_freq: binaural.hertz,
          band_freq: binaural.freq,
        });
        setError("");
        history.push("/post_inst");
      } catch (err) {
        setError("서버 에러가 발생했습니다");
      }
    }
  };

  useEffect(() => {
    const asyncInit = async () => {
      const hertzs = [400, 500];
      const freqs = [7, 10, 16, 40];
      let hertz_freq_pairs = hertzs.flatMap((h) => freqs.map((f) => [h, f]));
      shuffle(hertz_freq_pairs);
      setPairs(hertz_freq_pairs);
      setPairsLength(hertz_freq_pairs.length);
      initBeatStore();
      await asyncLoadCategorySound(carSoundURL, category, true);
      playSound();
    };

    asyncInit();
  }, [carSoundURL, category]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-y-2 divide-y-2">
        <p>
          현재 감정 소리 자극이 재생 중입니다. <br />
          아래 버튼(🔈)을 눌러서 소리를 듣고 가장 <b>긍정적인</b>
          <br />
          감정상태를 불러일으킨 소리에 체크해 주세요.
        </p>
        <p>
          1. 청취한 소리 (✔️ 표시) 중 한 가지 소리만 선택 가능합니다. <br />
          2. 체크를 해제하면 다시 소리를 선택할 수 있습니다.
          <br />
          3. 모든 소리를 들은 후 자유롭게 소리를 전환할 수 있습니다.
        </p>
      </div>
      <br />
      {pairsLength > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {pairs.map((pair) => {
            let [h, f] = pair;
            let k = `${h}_${f}`;
            return (
              <BeatButton
                hertz={h}
                freq={f}
                key={k}
                totalNumBeats={pairsLength}
              />
            );
          })}
        </div>
      )}
      <br />
      <Button text="다음으로" onClick={handleNext} />
      <span className="block font-medium tracking-wide text-red-500 text-base mt-1 text-center mb-3">
        {error}
      </span>
    </div>
  );
}
