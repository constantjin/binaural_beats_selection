import React, { useState } from "react";

const ratingNumberList = [...Array(9).keys()].map((n) => n + 1); // 1-9 scale

export default function RatingScale({
  ratingTitle,
  leftText,
  rightText,
  setRating,
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  return (
    <div>
      <p className="text-2xl">{ratingTitle}</p>
      <div className="grid grid-cols-9 gap-x-1.5 mt-5">
        {ratingNumberList.map((n, i) => (
          <div
            className={
              "text-xl text-bold border-2 rounded-md px-1 text-center " +
              (i === activeIndex ? "border-red-500" : "")
            }
            key={n}
            onClick={() => {
              setActiveIndex(i);
              setRating(n);
            }}
          >
            {n}
          </div>
        ))}
        <div className="col-start-1 col-span-2 text-sm mt-2">{leftText}</div>
        <div className="col-start-8 col-span-2 text-sm mt-2">{rightText}</div>
      </div>
    </div>
  );
}
