"use client";
import { useState } from "react";

type TaskType = {
  id: any;
  text: string;
  num: number;
  isChecked: boolean;
};

export default function Tasks() {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState<TaskType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  function toggleCheck() {
    setIsChecked((prev) => !prev);
  }

  const createTask = taskList.map((t, i) => (
    <div
      key={t.id}
      className="w-full border-2  border-darkb rounded-xl 
    flex items-center p-1"
    >
      <p>{t.num + 1}.</p>
      <label htmlFor={`${t.id}`} className="flex flex-1">
        {t.text}
      </label>
      <input
        type="checkbox"
        className="accent-start w-4 h-4 cursor-pointer"
        id={t.id}
        onClick={() => toggleCheck()}
      />
    </div>
  ));

  const saveTask = () => {
    if (!task) return;
    setTaskList((prev) => [
      ...prev,
      { id: Date.now(), text: task, num: taskList.length, isChecked: false },
    ]);
    setTask("");
  };

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
        className={`w-full border-2 border-dashed border-darkb rounded-xl 
    py-3 ${isOpen ? "flex flex-col items-center" : "flex items-center justify-center"} gap-2 
    hover:bg-darkb transition-colors duration-200 cursor-pointer`}
        onClick={() => toggle()}
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
            className=" bg-white flex-1 p-1 text-dark-text rounded-xl focus: outline-none"
            placeholder="presentation e.g."
            required
          />
          <button
            className="bg-start px-2 rounded-xl cursor-pointer"
            onClick={saveTask}
          >
            Add
          </button>
        </div>
      )}

      {createTask}
    </div>
  );
}
