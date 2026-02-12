"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";

import { getTasks, deleteTask, Task } from "@/app/data/tasks";

type Status = "All" | "Completed" | "In Progress";

export default function TasksPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<Status>("All");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const filteredTasks =
    status === "All" ? tasks : tasks.filter((t) => t.status === status);

  const handleDelete = (task: Task) => {
    if (confirm(`Delete task "${task.name}"? This action cannot be undone.`)) {
      deleteTask(task.id);
      setTasks(getTasks());
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage and track your tasks</p>
        </div>

        <Button asChild>
          <Link href="/dashboard/tasks/create">Create Task</Link>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={status} onValueChange={(v) => setStatus(v as Status)}>
        <TabsList>
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
          <TabsTrigger value="In Progress">In Progress</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Empty State */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No tasks found"
          description={
            status === "All"
              ? "You haven’t created any tasks yet."
              : `No tasks with status "${status}".`
          }
          actionLabel="Create Task"
          onAction={() => router.push("/dashboard/tasks/create")}
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>{task.project}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(task)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
