"use client";

import {
  LayoutDashboard,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  Truck,
  BarChart3,
  Settings,
  ChevronLeft,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Standards",
    icon: ClipboardCheck,
    href: "/standards",
  },
  {
    label: "Compliance",
    icon: ShieldCheck,
    href: "/compliance",
  },
  {
    label: "Documents",
    icon: FileText,
    href: "/documents",
  },
  {
    label: "Operations",
    icon: Truck,
    href: "/operations",
  },
  {
    label: "Reports",
    icon: BarChart3,
    href: "/reports",
  },
];

export function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r bg-white lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight">CargoLink</h1>
          <p className="text-xs text-muted-foreground">
            Standards & Compliance
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <a
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground"
        >
          <Settings className="h-4 w-4" />
          Settings
        </a>

        <button className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Collapse
        </button>
      </div>
    </aside>
  );
}