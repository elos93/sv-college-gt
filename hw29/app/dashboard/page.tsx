"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/app/data/tasks";

export default function DashboardPage() {
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [inProgress, setInProgress] = useState(0);

  useEffect(() => {
    const tasks = getTasks();
    setTotal(tasks.length);
    setCompleted(tasks.filter((t) => t.status === "Completed").length);
    setInProgress(tasks.filter((t) => t.status === "In Progress").length);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border p-6 rounded">
          <p>Total Tasks</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>
        <div className="border p-6 rounded">
          <p>Completed</p>
          <p className="text-3xl font-bold">{completed}</p>
        </div>
        <div className="border p-6 rounded">
          <p>In Progress</p>
          <p className="text-3xl font-bold">{inProgress}</p>
        </div>
      </div>
    </div>
  );
}
