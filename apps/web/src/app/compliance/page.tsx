"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Search,
  ShieldAlert,
} from "lucide-react";


import {
  complianceItems,
  type ComplianceStatus,
} from "@/features/compliance/compliance-data";

const statuses: Array<ComplianceStatus | "All"> = [
  "All",
  "Compliant",
  "At Risk",
  "Non-Compliant",
  "Under Review",
];

const categories = [
  "All",
  "Operations",
  "Safety",
  "Documentation",
  "Security",
  "Regulatory",
];

export default function CompliancePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState<ComplianceStatus | "All">("All");

  const filteredItems = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return complianceItems.filter((item) => {
      const matchesSearch =
        searchValue === "" ||
        item.title.toLowerCase().includes(searchValue) ||
        item.code.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue) ||
        item.standard.toLowerCase().includes(searchValue) ||
        item.owner.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesStatus = status === "All" || item.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  const compliantCount = complianceItems.filter(
    (item) => item.status === "Compliant",
  ).length;

  const atRiskCount = complianceItems.filter(
    (item) => item.status === "At Risk",
  ).length;

  const nonCompliantCount = complianceItems.filter(
    (item) => item.status === "Non-Compliant",
  ).length;

  const underReviewCount = complianceItems.filter(
    (item) => item.status === "Under Review",
  ).length;

  const complianceRate = Math.round(
    (compliantCount / complianceItems.length) * 100,
  );

  return (
      <div className="space-y-8 p-6 lg:p-8">
        {/* Header */}
        <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Compliance Management
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              Compliance Center
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Monitor compliance requirements, identify operational risks,
              and track reviews across your CargoLink workspace.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
          >
            <ClipboardCheck className="size-4" />
            Run Compliance Check
          </button>
        </section>

        {/* Summary */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <CheckCircle2 className="size-4" />
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                Overall
              </span>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Compliance Rate
            </p>

            <p className="mt-1 text-2xl font-semibold">
              {complianceRate}%
            </p>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <CheckCircle2 className="size-4" />
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Compliant
            </p>

            <p className="mt-1 text-2xl font-semibold">
              {compliantCount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Requirements currently meeting standards
            </p>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <AlertTriangle className="size-4" />
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              At Risk
            </p>

            <p className="mt-1 text-2xl font-semibold">
              {atRiskCount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Requirements needing attention
            </p>
          </div>

          <div className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <ShieldAlert className="size-4" />
              </div>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Issues & Reviews
            </p>

            <p className="mt-1 text-2xl font-semibold">
              {nonCompliantCount + underReviewCount}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {nonCompliantCount} non-compliant · {underReviewCount} under review
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
                placeholder="Search compliance requirements..."
                className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-slate-400"
              />
            </div>

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-slate-400"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All categories" : item}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value as ComplianceStatus | "All")
              }
              className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:border-slate-400"
            >
              {statuses.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All statuses" : item}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Register */}
        <section>
          <div className="mb-4">
            <h2 className="font-semibold">Compliance Register</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Showing {filteredItems.length} of {complianceItems.length}{" "}
              compliance requirements.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-sm">
                <thead className="border-b bg-muted/30">
                  <tr className="text-left">
                    <th className="px-5 py-3 font-medium">
                      Requirement
                    </th>
                    <th className="px-5 py-3 font-medium">
                      Category
                    </th>
                    <th className="px-5 py-3 font-medium">
                      Standard
                    </th>
                    <th className="px-5 py-3 font-medium">
                      Status
                    </th>
                    <th className="px-5 py-3 font-medium">
                      Owner
                    </th>
                    <th className="px-5 py-3 font-medium">
                      Due
                    </th>
                    <th className="px-5 py-3 font-medium">
                      Reviewed
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-muted/30"
                    >
                      <td className="px-5 py-4">
                        <p className="text-xs font-medium text-muted-foreground">
                          {item.code}
                        </p>

                        <p className="mt-1 font-medium">
                          {item.title}
                        </p>

                        <p className="mt-1 max-w-md truncate text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-medium">
                        {item.standard}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            item.status === "Compliant"
                              ? "bg-foreground text-background"
                              : item.status === "At Risk"
                                ? "bg-muted text-foreground"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-muted-foreground">
                        {item.owner}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                        {item.dueDate}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                        {item.lastReviewed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredItems.length === 0 && (
              <div className="p-10 text-center">
                <p className="font-medium">No compliance items found</p>

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