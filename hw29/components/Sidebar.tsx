"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/tasks", label: "Tasks" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white p-4">
      <h2 className="mb-6 text-lg font-bold">Dashboard</h2>

      <nav className="space-y-1">
        {links.map((link) => {
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "block rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-slate-100 font-semibold text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
