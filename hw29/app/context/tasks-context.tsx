"use client";

import { createContext, useContext, useState } from "react";

export type Task = {
  name: string;
  project: string;
  status: "Completed" | "In Progress";
  priority: "Low" | "Medium" | "High";
};

type TasksContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
};

const TasksContext = createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <TasksContext.Provider value={{ tasks, addTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside TasksProvider");
  return ctx;
}
