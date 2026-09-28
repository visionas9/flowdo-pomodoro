"use client";
import { useContext } from "react";
import { Context } from "@/app/context";
import type { SessionType } from "@/app/types";

export default function CompletedTasks() {
  const { session, setSession } = useContext(Context)!;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      timeZone: "UTC",
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  function removeSession(index: number) {
    setSession((prev: SessionType[]) => prev.filter((_, i) => i !== index));
  }
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-extrabold">Previous Sessions</h2>

      {session.length === 0 && (
        <p className="text-lighter text-sm">
          No sessions yet. Start your first pomodoro!
        </p>
      )}

      {/* Newest first; the index travels along because removal works by position. */}
      {session
        .map((s, i) => ({ s, i }))
        .reverse()
        .map(({ s, i }) => (
          <div
            key={i}
            className="bg-darkb rounded-xl px-4 py-3 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <p className="text-lighter text-sm">{formatDate(s.date)}</p>
              <div className="flex items-center gap-2">
                <p className="font-bold">
                  {s.timeDone < 60
                    ? `${s.timeDone} s`
                    : `${Math.round(s.timeDone / 60)} min`}
                </p>
                <button
                  onClick={() => removeSession(i)}
                  aria-label="Remove session"
                  className="text-lighter hover:text-mint-cream cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            {s.tasksDone.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {s.tasksDone.map((task, t) => (
                  <li key={t} className="text-sm text-lighter">
                    ✓ {task}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-lighter">No tasks completed</p>
            )}
          </div>
        ))}
    </div>
  );
}
