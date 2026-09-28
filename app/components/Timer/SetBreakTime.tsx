"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { clampTime } from "./clampTime";

export default function SetWorkTime({
  setBreakTime,
}: {
  setBreakTime: (value: number) => void;
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
        onClick={() => toggle()}
      >
        set break time {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-40 top-full right-0 mt-2 flex flex-col items-center gap-3 bg-darkb p-3 rounded-xl shadow-lg">
          <div className="flex items-center justify-center gap-1">
            <input
              type="number"
              placeholder="MM"
              aria-label="Minutes"
              min={0}
              max={180}
              className="w-14 rounded-lg bg-darkdiv px-2 py-1 text-center text-mint-cream"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
            <span>:</span>
            <input
              type="number"
              placeholder="SS"
              aria-label="Seconds"
              min={0}
              max={59}
              className="w-14 rounded-lg bg-darkdiv px-2 py-1 text-center text-mint-cream"
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
            />
          </div>
          <button
            className="py-1 px-3 rounded-xl cursor-pointer font-bold bg-start
        active:translate-y-1 active:shadow-none shadow-md transition-all duration-100"
            onClick={() => {
              setBreakTime(clampTime(minutes, seconds));
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
