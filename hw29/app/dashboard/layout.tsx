import { TasksProvider } from "@/app/context/tasks-context";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TasksProvider>
      <div className="flex min-h-screen">
        <aside className="w-56 border-r p-4 space-y-4">
          <h2 className="font-bold text-lg">Dashboard</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard">Overview</Link>
            <Link href="/dashboard/tasks">Tasks</Link>
            <Link href="/dashboard/projects">Projects</Link>
            <Link href="/dashboard/settings">Settings</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </TasksProvider>
  );
}
