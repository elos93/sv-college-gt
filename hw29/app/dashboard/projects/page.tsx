import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";

import { projects } from "@/app/data/projects";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Overview of your projects</p>
        </div>

        <Button asChild>
          <Link href="/dashboard/projects/create">Create Project</Link>
        </Button>
      </div>

      {/* Empty State */}
      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="You haven’t created any projects yet."
          actionLabel="Create Project"
        />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.tasks}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.status === "Completed" ? "secondary" : "default"
                    }
                  >
                    {project.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
