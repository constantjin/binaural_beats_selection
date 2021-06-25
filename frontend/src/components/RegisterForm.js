import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { setSubjectId } from "../stores";
import { asyncRegisterSubject } from "../utils/api";

import Button from "./Button";

export default function RegisterForm(props) {
  const [subject_number, setSubjectNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const volume = props.beatVolume;
  const IADS_volume = props.iadsVolume;
  const history = useHistory();

  const checkInt = (str) => {
    return /^\+?\d+$/.test(str);
  };

  const validateForm = () => {
    if (!(subject_number && name)) {
      // Check empty fields
      setError("피험자 번호 또는 성함을 입력해 주세요");
      return false;
    } else if (!checkInt(subject_number)) {
      setError("피험자 번호에는 숫자를 입력해 주세요");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  return (
    <form
      className="mt-5 px-10"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label
        htmlFor="subject_number"
        className="block text-base font-semibold text-black"
      >
        피험자 번호
      </label>
      <input
        id="subject_number"
        type="number"
        placeholder="피험자 번호(숫자)"
        className="block w-full h-10 text-center mt-2 text-black border-b-2"
        value={subject_number}
        onChange={(e) => setSubjectNumber(e.target.value)}
      />
      <br />
      <label
        htmlFor="name"
        className="block text-base font-semibold text-black"
      >
        성함
      </label>
      <input
        id="name"
        type="text"
        placeholder="성함"
        className="block w-full h-10 text-center mt-2 text-black border-b-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <span className="block font-medium tracking-wide text-red-500 text-base mt-1 text-center">
        {error}
      </span>
      <br />
      <Button
        text={isLoading ? "로딩 중.." : "실험 시작"}
        onClick={async () => {
          if (validateForm()) {
            console.log(`Subject number: ${subject_number}, name: ${name}`);
            setLoading(true);
            try {
              const subjectId = await asyncRegisterSubject({
                subject_number,
                name,
                volume,
                IADS_volume,
              });
              setError("");
              setSubjectId(subjectId);
              history.push("/pre_inst");
            } catch (err) {
              setLoading(false);
              setSubjectId("");
              const status_code = err.response ? err.response.status : 500;
              if (status_code === 400) {
                setError("피험자 번호가 중복됩니다");
              } else {
                setError("서버 에러가 발생했습니다");
              }
            }
          }
        }}
      />
    </form>
  );
}
