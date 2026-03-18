"use client";
import { useState, useEffect, useContext } from "react";
import { Context } from "@/app/context";
import SetWorkTime from "./SetWorkTime";
import SetBreakTime from "./SetBreakTime";

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [workTime, setWorkTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [isBreak, setIsBreak] = useState(false);
  const { saveSession, taskList } = useContext(Context)!;

  useEffect(() => {
    if (!isRunning) return;

    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          if (!isBreak) {
            setIsBreak(true);
            setTimeLeft(breakTime);
          } else {
            setIsBreak(false);
            setIsRunning(false);
            setTimeLeft(workTime);
          }
          return prev;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isRunning, isBreak]);

  function formattedTime() {
    const mins = Math.floor(timeLeft / 60);
    const secs = (timeLeft % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  const completedTasks = taskList.filter((t) => t.isChecked).map((t) => t.text);

  function toggleIsRunning() {
    if (isRunning && workTime - timeLeft > 0) {
      const actualElapsed = workTime - timeLeft;
      console.log("saving session:", workTime - timeLeft, "seconds");
      saveSession(actualElapsed, completedTasks);
    }
    setIsRunning((prev) => !prev);
  }

  return (
    <div>
      <div
        className="mt-15 mx-auto w-fit flex flex-col 
      items-center bg-darkdiv py-4 px-8 rounded-xl md:"
      >
        <div className="flex items-center justify-between gap-9 md:">
          <SetWorkTime setTimeLeft={setTimeLeft} setWorkTime={setWorkTime} />
          <SetBreakTime setBreakTime={setBreakTime} />
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
            onClick={() => toggleIsRunning()}
          >
            Stop
          </button>
        ) : (
          <button
            className="py-2 px-12 rounded-xl cursor-pointer font-bold bg-start
        active:translate-y-1 active:shadow-none shadow-md transition-all duration-100"
            onClick={() => toggleIsRunning()}
          >
            Start
          </button>
        )}
      </div>
    </div>
  );
}
