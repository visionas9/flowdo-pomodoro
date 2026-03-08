"use client";
import { useState, useEffect } from "react";
import SetWorkTime from "./SetWorkTime";
import SetBreakTime from "./SetBreakTime";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1500);

  useEffect(() => {
    const countdown =
      isRunning && timeLeft >= 0
        ? setInterval(() => {
            setTimeLeft((prev) => prev - 1);
          }, 1000)
        : "";

    return () => clearInterval(countdown);
  }, [isRunning]);

  function formattedTime() {
    const mins = Math.floor(timeLeft / 60);
    const secs = (timeLeft % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function toggleIsRuning() {
    setIsRunning((prev) => !prev);
  }

  return (
    <div>
      <div
        className="mt-15 mx-auto w-fit flex flex-col 
      items-center bg-darkdiv py-4 px-8 rounded-xl md:"
      >
        <div className="flex items-center justify-between gap-9 md:">
          <SetWorkTime
            setTimeLeft={setTimeLeft}
            minutes={minutes}
            seconds={seconds}
            setMinutes={setMinutes}
            setSeconds={setSeconds}
          />
          <SetBreakTime />
        </div>
        <div className="w-64 flex items-center justify-center">
          <p className="font-numbers text-9xl">{formattedTime()}</p>
        </div>
      </div>

      <div className="mt-6 text-3xl flex items-center justify-center md:">
        {isRunning ? (
          <button
            className="py-2 px-12 rounded-xl cursor-pointer font-bold bg-stop
        active:translate-y-1 active:shadow-none shadow-md transition-all duration-100"
            onClick={() => toggleIsRuning()}
          >
            Stop
          </button>
        ) : (
          <button
            className="py-2 px-12 rounded-xl cursor-pointer font-bold bg-start
        active:translate-y-1 active:shadow-none shadow-md transition-all duration-100"
            onClick={() => toggleIsRuning()}
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
}
