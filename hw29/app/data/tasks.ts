export type Task = {
  id: string;
  name: string;
  description?: string;
  project: string;
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
};

const STORAGE_KEY = "tasks";

export function getTasks(): Task[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(task: Omit<Task, "id">) {
  const tasks = getTasks();
  const newTask: Task = {
    ...task,
    id: crypto.randomUUID(),
  };
  saveTasks([...tasks, newTask]);
}

export function deleteTask(taskId: string) {
  const tasks = getTasks();
  const updated = tasks.filter((t) => t.id !== taskId);
  saveTasks(updated);
}
