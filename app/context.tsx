"use client";
import { createContext, useState, useEffect } from "react";
import { ContextType, SessionType, TaskType } from "@/app/types";

const Context = createContext<ContextType | null>(null);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<SessionType[]>([]);
  const [taskList, setTaskList] = useState<TaskType[]>([]);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("sessions");
    if (saved) setSession(JSON.parse(saved));
  }, []);

  // Save to localStorage whenever sessions updates
  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(session));
  }, [session]);

  // Save session function
  function saveSession(timeDone: number, tasksDone: string[]) {
    const newSession = {
      timeDone,
      date: new Date().toISOString().split("T")[0],
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
