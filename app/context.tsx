"use client";
import { createContext, useState, useEffect } from "react";
import { ContextType, SessionType, TaskType } from "@/app/types";

const Context = createContext<ContextType | null>(null);

// The local day: toISOString is UTC, which is still yesterday just after midnight in Warsaw.
function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<SessionType[]>([]);
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on first render — sessions and the task list, so a
  // refresh no longer throws the tasks away.
  useEffect(() => {
    const sessions = localStorage.getItem("sessions");
    const tasks = localStorage.getItem("tasks");
    if (sessions) setSession(JSON.parse(sessions));
    if (tasks) setTaskList(JSON.parse(tasks));
    setLoaded(true);
  }, []);

  // Save whenever they change — but not before the load, or the empty
  // starting lists would overwrite what was stored.
  useEffect(() => {
    if (loaded) localStorage.setItem("sessions", JSON.stringify(session));
  }, [session, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("tasks", JSON.stringify(taskList));
  }, [taskList, loaded]);

  // Save session function
  function saveSession(timeDone: number, tasksDone: string[]) {
    const newSession = {
      timeDone,
      date: localDate(),
      tasksDone,
    };
    setSession((prev) => [...prev, newSession]);
  }

  return (
    <Context.Provider
      value={{ session, setSession, taskList, setTaskList, saveSession }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context };
