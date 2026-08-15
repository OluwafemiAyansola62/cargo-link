"use client";

import { useMemo, useState } from "react";
import {
  FileText,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  StandardsFilters,
} from "@/features/standards/standards-filters";
import { StandardsTable } from "@/features/standards/standards-table";
import {
  standards,
  type StandardWithMetrics,
} from "@/features/standards/standards-data";
import { operations } from "@/features/operations/operations-data";
import { documents } from "@/features/documents/documents-data";
import { complianceItems } from "@/features/compliance/compliance-data";

export default function StandardsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  /*
   * Build the operational relationships for every standard.
   *
   * A relationship is established through the standard code:
   *
   * Operation.standard
   * Document.standard
   * ComplianceItem.standard
   *
   * This gives the Standards Library a single operational view
   * without changing the underlying domain data.
   */
  const standardMetrics = useMemo<StandardWithMetrics[]>(() => {
    return standards.map((standard) => {
      const linkedOperations = operations.filter(
        (operation) => operation.standard === standard.code,
      );

      const linkedDocuments = documents.filter(
        (document) => document.standard === standard.code,
      );

      const linkedComplianceItems = complianceItems.filter(
        (item) => item.standard === standard.code,
      );

      const compliantOperations = linkedOperations.filter(
        (operation) => operation.compliance === "Compliant",
      ).length;

      const complianceRate =
        linkedOperations.length > 0
          ? Math.round(
              (compliantOperations / linkedOperations.length) * 100,
            )
          : null;

      const issues = linkedComplianceItems.filter(
        (item) =>
          item.status === "At Risk" ||
          item.status === "Non-Compliant" ||
          item.status === "Under Review",
      ).length;

      return {
        ...standard,
        linkedOperations: linkedOperations.length,
        linkedDocuments: linkedDocuments.length,
        linkedComplianceItems: linkedComplianceItems.length,
        complianceRate,
        issues,
      };
    });
  }, []);

  /*
   * Search and filter the enriched standard collection.
   */
  const filteredStandards = useMemo(() => {
    return standardMetrics.filter((standard) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        searchValue === "" ||
        standard.title.toLowerCase().includes(searchValue) ||
        standard.code.toLowerCase().includes(searchValue) ||
        standard.description.toLowerCase().includes(searchValue) ||
        standard.owner.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" ||
        standard.category === category;

      const matchesStatus =
        status === "All" ||
        standard.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [
    search,
    category,
    status,
    standardMetrics,
  ]);

  /*
   * Standard status counts.
   */
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

  /*
   * Operational relationship totals.
   */
  const totalLinkedOperations = standardMetrics.reduce(
    (total, standard) =>
      total + standard.linkedOperations,
    0,
  );

  const totalLinkedDocuments = standardMetrics.reduce(
    (total, standard) =>
      total + standard.linkedDocuments,
    0,
  );

  const totalComplianceRecords = standardMetrics.reduce(
    (total, standard) =>
      total + standard.linkedComplianceItems,
    0,
  );

  const standardsWithOperations = standardMetrics.filter(
    (standard) => standard.linkedOperations > 0,
  ).length;

  const standardsWithIssues = standardMetrics.filter(
    (standard) => standard.issues > 0,
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

      {/* Status Summary */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Total Standards
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {standards.length}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Registered standards
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Active
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {activeCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Currently active
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Under Review
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {reviewCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Awaiting review
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Draft / Archived
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {draftCount + archivedCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Non-active standards
          </p>
        </div>
      </section>

      {/* Operational Summary */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <Truck className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Linked Operations
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {totalLinkedOperations}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Across {standardsWithOperations} standards
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <FileText className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Evidence Documents
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {totalLinkedDocuments}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Registered against standards
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <ShieldCheck className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Compliance Records
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {totalComplianceRecords}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Linked compliance records
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <ShieldAlert className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Standards With Issues
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {standardsWithIssues}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Require compliance attention
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
            <h2 className="font-semibold">
              All Standards
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Showing {filteredStandards.length} of{" "}
              {standards.length} standards.
            </p>
          </div>
        </div>

        <StandardsTable
          standards={filteredStandards}
        />
      </section>
    </div>
  );
}