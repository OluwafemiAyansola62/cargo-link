"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  Plus,
  Search,
  TriangleAlert,
  Truck,
} from "lucide-react";

import {
  operations,
  type OperationCompliance,
  type OperationStatus,
} from "@/features/operations/operations-data";

const statuses: Array<OperationStatus | "All"> = [
  "All",
  "Active",
  "Pending",
  "Completed",
  "At Risk",
];

const complianceStatuses: Array<OperationCompliance | "All"> = [
  "All",
  "Compliant",
  "At Risk",
  "Non-Compliant",
  "Under Review",
];

export default function OperationsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<OperationStatus | "All">("All");
  const [compliance, setCompliance] =
    useState<OperationCompliance | "All">("All");

  const filteredOperations = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return operations.filter((operation) => {
      const matchesSearch =
        searchValue === "" ||
        operation.reference.toLowerCase().includes(searchValue) ||
        operation.cargo.toLowerCase().includes(searchValue) ||
        operation.origin.toLowerCase().includes(searchValue) ||
        operation.destination.toLowerCase().includes(searchValue) ||
        operation.owner.toLowerCase().includes(searchValue) ||
        operation.standard.toLowerCase().includes(searchValue);

      const matchesStatus =
        status === "All" || operation.status === status;

      const matchesCompliance =
        compliance === "All" ||
        operation.compliance === compliance;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCompliance
      );
    });
  }, [search, status, compliance]);

  const activeCount = operations.filter(
    (operation) => operation.status === "Active",
  ).length;

  const pendingCount = operations.filter(
    (operation) => operation.status === "Pending",
  ).length;

  const completedCount = operations.filter(
    (operation) => operation.status === "Completed",
  ).length;

  const atRiskCount = operations.filter(
    (operation) => operation.status === "At Risk",
  ).length;

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Operations Management
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Operations Center
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Monitor cargo movements, operational readiness, compliance
            position, and completion status across your CargoLink workspace.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
        >
          <Plus className="size-4" />
          New Operation
        </button>
      </section>

      {/* Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Truck className="size-4" />
            </div>

            <ArrowUpRight className="size-4 text-muted-foreground" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Active Operations
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {activeCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Currently in progress
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <Clock3 className="size-4" />
            </div>

            <ArrowUpRight className="size-4 text-muted-foreground" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Pending
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {pendingCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Awaiting operational action
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <CheckCircle2 className="size-4" />
            </div>

            <ArrowUpRight className="size-4 text-muted-foreground" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Completed
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {completedCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Successfully completed
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
              <TriangleAlert className="size-4" />
            </div>

            <ArrowUpRight className="size-4 text-muted-foreground" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            At Risk
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {atRiskCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Requiring operational attention
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="rounded-xl border bg-background p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search operations, cargo, locations..."
              className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-slate-400"
            />
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as OperationStatus | "All",
              )
            }
            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-slate-400"
          >
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All statuses" : item}
              </option>
            ))}
          </select>

          <select
            value={compliance}
            onChange={(event) =>
              setCompliance(
                event.target.value as
                  | OperationCompliance
                  | "All",
              )
            }
            className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-slate-400"
          >
            {complianceStatuses.map((item) => (
              <option key={item} value={item}>
                {item === "All"
                  ? "All compliance"
                  : item}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Operations Register */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">Operations Register</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredOperations.length} of{" "}
            {operations.length} operations.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] text-sm">
              <thead className="border-b bg-muted/30">
                <tr className="text-left">
                  <th className="px-5 py-3 font-medium">
                    Operation
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Route
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Status
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Compliance
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Owner
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Standard
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Completion
                  </th>

                  <th className="px-5 py-3 font-medium" />
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredOperations.map((operation) => (
                  <tr
                    key={operation.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <Package className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-medium text-muted-foreground">
                            {operation.reference}
                          </p>

                          <p className="mt-1 font-medium">
                            {operation.cargo}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Updated {operation.lastUpdated}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                        <div>
                          <p className="font-medium">
                            {operation.origin}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            → {operation.destination}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          operation.status === "Active"
                            ? "bg-foreground text-background"
                            : operation.status === "At Risk"
                              ? "bg-muted text-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {operation.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          operation.compliance === "Compliant"
                            ? "bg-foreground text-background"
                            : operation.compliance === "Non-Compliant"
                              ? "bg-muted text-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {operation.compliance}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {operation.owner}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {operation.standard}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {operation.expectedCompletion}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        aria-label={`Open ${operation.reference}`}
                        className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-muted"
                      >
                        <ArrowUpRight className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOperations.length === 0 && (
            <div className="p-10 text-center">
              <p className="font-medium">
                No operations found
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}