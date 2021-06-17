import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button
      className="h-10 px-6 text-base font-semibold border-2"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {text}
    </button>
  );
}
