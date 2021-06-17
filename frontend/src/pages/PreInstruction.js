import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setCurrSound } from "../stores";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function PreInstruction() {
  let history = useHistory();
  useEffect(() => {
    const asyncInitRun = async () => {
      const selectedCarSound = setCurrSound();
      if (!selectedCarSound) {
        history.push("/end");
      } else {
        await sleep(3000);
        history.push("/pre_sound");
      }
    };

    asyncInitRun();
  }, [history]);

  return (
    <div>
      <p className="text-xl">조금 뒤 실험이 시작됩니다</p>
      <hr className="border-1 w-full my-4" />
      <ul className="text-left space-y-3">
        <li>
          <span>🔈</span> 이어폰으로 들리는 소리에 <b>집중</b>해 주세요
        </li>
        <li>
          <span>✔️</span> 응답은 <b>빠르고 정확하게</b> 해 주세요
        </li>
        <li>
          <span>⏱️</span> <b>20초</b>간 미응답시 자동으로 넘어갑니다
        </li>
      </ul>
    </div>
  );
}
