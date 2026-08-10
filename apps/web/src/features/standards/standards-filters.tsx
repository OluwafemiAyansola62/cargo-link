"use client";

import { Search, SlidersHorizontal } from "lucide-react";

type StandardsFiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
};

export function StandardsFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
}: StandardsFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-background p-4 shadow-sm lg:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search standards..."
          className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-foreground"
        />
      </div>

      <div className="flex items-center gap-2">
        <SlidersHorizontal className="size-4 text-muted-foreground" />

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="h-10 rounded-lg border bg-background px-3 text-sm outline-none"
        >
          <option value="All">All categories</option>
          <option value="Operations">Operations</option>
          <option value="Compliance">Compliance</option>
          <option value="Safety">Safety</option>
          <option value="Documentation">Documentation</option>
          <option value="Security">Security</option>
        </select>

        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="h-10 rounded-lg border bg-background px-3 text-sm outline-none"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="Under Review">Under Review</option>
          <option value="Draft">Draft</option>
          <option value="Archived">Archived</option>
        </select>
      </div>
    </div>
  );
}