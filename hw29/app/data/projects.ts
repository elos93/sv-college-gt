export type ProjectStatus = "Active" | "Completed";

export type Project = {
  name: string;
  tasks: number;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    name: "Website",
    tasks: 6,
    status: "Active",
  },
  {
    name: "Backend",
    tasks: 4,
    status: "Active",
  },
  {
    name: "QA",
    tasks: 2,
    status: "Completed",
  },
];
