export type ContextType = {
  session: SessionType[];
  setSession: React.Dispatch<React.SetStateAction<SessionType[]>>;
  taskList: TaskType[];
  setTaskList: React.Dispatch<React.SetStateAction<TaskType[]>>;
  saveSession: (timeDone: number, tasksDone: string[]) => void;
};

export type SessionType = {
  timeDone: number;
  date: string;
  tasksDone: string[];
};

export type TaskType = {
  id: number;
  text: string;
  num: number;
  isChecked: boolean;
};
