"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SetWorkTime({
  setTimeLeft,
  setWorkTime,
}: {
  setTimeLeft: (value: number) => void;
  setWorkTime: (value: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center bg-darkb py-2 px-3 rounded-xl cursor-pointer
            hover:bg-darkb-hover transition-colors duration-200 md:"
        onClick={toggle}
      >
        set work time {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute w-34 top-full left-0 mt-2 bg-darkb p-3 rounded-xl">
          <div className="flex items-center justify-center">
            <input
              type="number"
              placeholder="MM"
              className="w-12"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
            <span>:</span>
            <input
              type="number"
              placeholder=" SS"
              className="w-12"
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
            />
          </div>
          <button
            className="py-1 px-3 rounded-xl cursor-pointer font-bold bg-start
        active:translate-y-1 active:shadow-none shadow-md transition-all duration-100"
            onClick={() => {
              setTimeLeft(minutes * 60 + seconds);
              setWorkTime(minutes * 60 + seconds);
              toggle();
            }}
          >
            confirm
          </button>
        </div>
      )}
    </div>
  );
}
