"use client";

import {
  Bell,
  Search,
  ChevronDown,
  Plus,
} from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4">
        <div className="relative w-64 sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            placeholder="Search standards, documents..."
            className="h-9 w-full rounded-lg border bg-slate-50 pl-9 pr-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="hidden items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-slate-50 sm:flex"
        >
          <Plus className="h-4 w-4" />
          Quick Action
        </button>

        <button
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-muted-foreground transition hover:bg-slate-100 hover:text-foreground"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            CL
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-medium">CargoLink Admin</p>
            <p className="text-xs text-muted-foreground">
              Administrator
            </p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
        </button>
      </div>
    </header>
  );
}