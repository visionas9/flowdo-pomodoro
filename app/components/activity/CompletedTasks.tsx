"use client";
import { useContext } from "react";
import { Context } from "@/app/context";

export default function CompletedTasks() {
  const { session } = useContext(Context)!;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-extrabold">Previous Sessions</h2>

      {session.length === 0 && (
        <p className="text-lighter text-sm">
          No sessions yet. Start your first pomodoro!
        </p>
      )}

      {session.map((s: any, i: number) => (
        <div
          key={i}
          className="bg-darkb rounded-xl px-4 py-3 flex flex-col gap-2"
        >
          <div className="flex items-center justify-between">
            <p className="text-lighter text-sm">{formatDate(s.date)}</p>
            <p className="font-bold">{Math.round(s.timeDone / 60)} min</p>
          </div>

          {s.tasksDone.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {s.tasksDone.map((task: string, i: number) => (
                <li key={i} className="text-sm text-lighter">
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
