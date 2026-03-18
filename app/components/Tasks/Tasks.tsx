"use client";
import { useState, useContext } from "react";
import { Context } from "@/app/context";

export default function Tasks() {
  const [task, setTask] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { taskList, setTaskList } = useContext(Context)!;

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  function toggleCheck(id: number) {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isChecked: !t.isChecked } : t)),
    );
  }

  function removeTask(id: number) {
    setTaskList((prev) => prev.filter((t) => t.id !== id));
  }

  const saveTask = () => {
    if (!task) return;
    setTaskList((prev) => [
      ...prev,
      { id: Date.now(), text: task, num: taskList.length, isChecked: false },
    ]);
    setTask("");
  };

  const activeTasks = taskList
    .filter((t) => !t.isChecked)
    .map((t) => (
      <div
        key={t.id}
        className="w-full bg-darkb rounded-xl flex items-center gap-3 px-3 py-2"
      >
        <span className="text-lighter text-sm">{t.num + 1}.</span>
        <label
          htmlFor={`${t.id}`}
          className="flex-1 text-mint-cream cursor-pointer"
        >
          {t.text}
        </label>
        <input
          type="checkbox"
          className="accent-start w-4 h-4 cursor-pointer"
          id={`${t.id}`}
          checked={t.isChecked}
          onChange={() => toggleCheck(t.id)}
        />
        <button
          onClick={() => removeTask(t.id)}
          className="text-lighter hover:text-mint-cream cursor-pointer"
        >
          ✕
        </button>
      </div>
    ));

  const completedTasks = taskList
    .filter((t) => t.isChecked)
    .map((t) => (
      <div
        key={t.id}
        className="w-full bg-darkb rounded-xl flex items-center gap-3 px-3 py-2 opacity-50"
      >
        <span className="text-lighter text-sm">{t.num + 1}.</span>
        <label
          htmlFor={`${t.id}`}
          className="flex-1 text-mint-cream cursor-pointer line-through"
        >
          {t.text}
        </label>
        <input
          type="checkbox"
          className="accent-start w-4 h-4 cursor-pointer"
          id={`${t.id}`}
          checked={t.isChecked}
          onChange={() => toggleCheck(t.id)}
        />
        <button
          onClick={() => removeTask(t.id)}
          className="text-lighter hover:text-mint-cream cursor-pointer"
        >
          ✕
        </button>
      </div>
    ));

  return (
    <div className="mt-6 w-[90%] md:max-w-2xl mx-auto flex flex-col gap-3 bg-darkdiv py-4 px-5 rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Tasks</h2>
        <button className="bg-darkb p-2 rounded-lg hover:bg-darkb-hover transition-colors duration-200 cursor-pointer">
          <span className="text-xl leading-none">⋮</span>
        </button>
      </div>

      <div className="w-full border-b border-darkb" />

      <button
        className={`w-full border-2 border-dashed border-darkb rounded-xl py-3 
        ${isOpen ? "flex flex-col items-center" : "flex items-center justify-center"} gap-2 
        hover:bg-darkb transition-colors duration-200 cursor-pointer`}
        onClick={toggle}
      >
        <div>
          <span className="text-xl">⊕</span>
          <span>Add Task</span>
        </div>
      </button>

      {isOpen && (
        <div className="w-[90%] flex gap-2 m-auto">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveTask(); // your function here
              }
            }}
            autoFocus
            className="bg-white flex-1 p-1 text-dark-text rounded-xl focus:outline-none"
            placeholder="presentation e.g."
          />
          <button
            className="bg-start px-2 rounded-xl cursor-pointer"
            onClick={saveTask}
          >
            Add
          </button>
        </div>
      )}

      {activeTasks}

      {completedTasks.length > 0 && (
        <>
          <div className="w-full border-b border-darkb" />
          <p className="text-lighter text-sm">Completed</p>
          {completedTasks}
        </>
      )}
    </div>
  );
}
