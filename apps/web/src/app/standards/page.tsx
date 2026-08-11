"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";


import {
  StandardsFilters,
} from "@/features/standards/standards-filters";
import { StandardsTable } from "@/features/standards/standards-table";
import { standards } from "@/features/standards/standards-data";

export default function StandardsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredStandards = useMemo(() => {
    return standards.filter((standard) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        searchValue === "" ||
        standard.title.toLowerCase().includes(searchValue) ||
        standard.code.toLowerCase().includes(searchValue) ||
        standard.description.toLowerCase().includes(searchValue) ||
        standard.owner.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || standard.category === category;

      const matchesStatus =
        status === "All" || standard.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  const activeCount = standards.filter(
    (standard) => standard.status === "Active",
  ).length;

  const reviewCount = standards.filter(
    (standard) => standard.status === "Under Review",
  ).length;

  const draftCount = standards.filter(
    (standard) => standard.status === "Draft",
  ).length;

  const archivedCount = standards.filter(
    (standard) => standard.status === "Archived",
  ).length;

  return (
      <div className="space-y-6">
        {/* Header */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Standards Management
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Standards Library
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Browse, review, and manage the operational standards that
              govern your CargoLink activities.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
          >
            <Plus className="size-4" />
            New Standard
          </button>
        </section>

        {/* Summary */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Total Standards
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {standards.length}
            </p>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Active
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {activeCount}
            </p>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Under Review
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {reviewCount}
            </p>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-sm text-muted-foreground">
              Draft / Archived
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {draftCount + archivedCount}
            </p>
          </div>
        </section>

        {/* Filters */}
        <StandardsFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          status={status}
          onStatusChange={setStatus}
        />

        {/* Results */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">All Standards</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Showing {filteredStandards.length} of {standards.length}{" "}
                standards.
              </p>
            </div>
          </div>

          <StandardsTable standards={filteredStandards} />
        </section>
      </div>
  );
}