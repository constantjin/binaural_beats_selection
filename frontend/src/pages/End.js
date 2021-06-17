import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "../components/Button";

export default function End() {
  const [finished, setFinished] = useState(false);
  let history = useHistory();
  useEffect(() => {
    setFinished(true);
  }, []);
  return (
    <div className="m-10 px-5 py-20 border-2 rounded-md">
      <p>
        실험에 참여해 주셔서 감사합니다! <br />
        좋은 하루 되십시오!
      </p>
      <br />
      {finished && (
        <Button
          text="시작 페이지로"
          onClick={() => {
            history.push("/");
          }}
        />
      )}
    </div>
  );
}
