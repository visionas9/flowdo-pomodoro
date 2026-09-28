"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { Context } from "@/app/context";
import SetWorkTime from "./SetWorkTime";
import SetBreakTime from "./SetBreakTime";

// A short two-note chime through the Web Audio API when a focus period or a
// break ends. The page already had a click (Start), so the browser allows it.
function chime() {
  try {
    const ctx = new AudioContext();
    [880, 1175].forEach((frequency, i) => {
      const start = ctx.currentTime + i * 0.25;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.8);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.8);
    });
  } catch {
    // No audio available — the timer still works.
  }
}

export default function Timer() {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [workTime, setWorkTime] = useState(1500);
  const [breakTime, setBreakTime] = useState(300);
  const [isBreak, setIsBreak] = useState(false);
  const { saveSession, taskList } = useContext(Context)!;

  // Focus seconds not yet saved. Saving empties it, so a Stop, a Start and
  // another Stop never count the same minutes twice, and break time never counts.
  const unsavedFocus = useRef(0);

  const completedTasks = taskList.filter((t) => t.isChecked).map((t) => t.text);

  function saveFocus() {
    if (unsavedFocus.current > 0) {
      saveSession(unsavedFocus.current, completedTasks);
      unsavedFocus.current = 0;
    }
  }

  // One tick a second while running. When a period runs out it chimes and
  // moves on: focus → break (and the focus is saved), break → stopped.
  useEffect(() => {
    if (!isRunning) return;

    const tick = setTimeout(() => {
      if (!isBreak) unsavedFocus.current += 1;

      if (timeLeft > 1) {
        setTimeLeft(timeLeft - 1);
        return;
      }

      chime();
      if (!isBreak) {
        saveFocus();
        setIsBreak(true);
        setTimeLeft(breakTime);
      } else {
        setIsBreak(false);
        setIsRunning(false);
        setTimeLeft(workTime);
      }
    }, 1000);

    return () => clearTimeout(tick);
    // Only the clock restarts the tick — a re-render from typing a task must not.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, isBreak, timeLeft, breakTime, workTime]);

  function formattedTime() {
    const mins = Math.floor(timeLeft / 60);
    const secs = (timeLeft % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  // The time in the browser tab, so it can be followed from another tab.
  useEffect(() => {
    document.title = isRunning
      ? `${formattedTime()} · ${isBreak ? "Break" : "Focus"} — FlowDo`
      : "FlowDo";
  });

  function toggleIsRunning() {
    if (isRunning) saveFocus();
    setIsRunning((prev) => !prev);
  }

  function reset() {
    saveFocus();
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workTime);
  }

  const buttonBase =
    "py-2 px-10 rounded-xl cursor-pointer font-bold active:translate-y-1 active:shadow-none shadow-md transition-all duration-100";

  return (
    <div>
      <div className="mt-10 mx-auto w-full max-w-md flex flex-col items-center bg-darkdiv py-5 px-4 sm:px-8 rounded-xl">
        <div className="flex w-full items-center justify-between gap-3">
          <SetWorkTime setTimeLeft={setTimeLeft} setWorkTime={setWorkTime} />
          <SetBreakTime setBreakTime={setBreakTime} />
        </div>

        <p
          className={`mt-4 text-sm tracking-widest uppercase ${isBreak ? "text-start" : "text-lighter"}`}
          aria-live="polite"
        >
          {isBreak ? "Break" : "Focus"}
        </p>
        <div className="font-numbers tabular-nums text-7xl sm:text-9xl leading-none py-2">
          {formattedTime()}
        </div>
      </div>

      <div className="mt-6 text-2xl sm:text-3xl flex items-center justify-center gap-3">
        <button
          className={`${buttonBase} ${isRunning ? "bg-stop" : "bg-start"}`}
          onClick={toggleIsRunning}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="py-2 px-4 rounded-xl cursor-pointer text-base text-lighter bg-darkdiv hover:text-mint-cream transition-colors"
          onClick={reset}
          aria-label="Reset timer"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
