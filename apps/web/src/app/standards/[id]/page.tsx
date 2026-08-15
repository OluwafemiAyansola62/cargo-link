"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  FileText,
  History,
  ShieldAlert,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

import { standards } from "@/features/standards/standards-data";
import { operations } from "@/features/operations/operations-data";
import { documents } from "@/features/documents/documents-data";
import { complianceItems } from "@/features/compliance/compliance-data";

export default function StandardDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const standard = standards.find((item) => item.id === id);

  /*
   * Operations are linked through operations-data.ts.
   *
   * Each operation contains:
   *
   * standard: "CL-OPS-001"
   *
   * so we derive the operations belonging to this standard.
   */
  const linkedOperations = useMemo(() => {
    if (!standard) {
      return [];
    }

    return operations.filter(
      (operation) => operation.standard === standard.code,
    );
  }, [standard]);

  /*
   * Documents are linked through documents-data.ts.
   */
  const linkedDocuments = useMemo(() => {
    if (!standard) {
      return [];
    }

    return documents.filter(
      (document) => document.standard === standard.code,
    );
  }, [standard]);

  /*
   * Compliance records are linked through compliance-data.ts.
   */
  const linkedComplianceItems = useMemo(() => {
    if (!standard) {
      return [];
    }

    return complianceItems.filter(
      (item) => item.standard === standard.code,
    );
  }, [standard]);

  /*
   * Requirements now live directly inside the standard record.
   */
  const requirements = standard?.requirementItems ?? [];

  /*
   * Evidence requirements now live directly inside the standard record.
   */
  const evidenceRequirements =
    standard?.evidenceRequirements ?? [];

  /*
   * Version history now lives directly inside the standard record.
   */
  const versionHistory = standard?.versionHistory ?? [];

  const activeRequirements = requirements.filter(
    (requirement) => requirement.status === "Active",
  ).length;

  const compliantOperations = linkedOperations.filter(
    (operation) => operation.compliance === "Compliant",
  ).length;

  const complianceRate =
    linkedOperations.length > 0
      ? Math.round(
          (compliantOperations / linkedOperations.length) * 100,
        )
      : 0;

  const issueCount = linkedComplianceItems.filter(
    (item) =>
      item.status === "At Risk" ||
      item.status === "Non-Compliant" ||
      item.status === "Under Review",
  ).length;

  if (!standard) {
    return (
      <div className="p-6 lg:p-8">
        <Link
          href="/standards"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Standards
        </Link>

        <div className="mt-12 rounded-xl border bg-background p-10 text-center shadow-sm">
          <ShieldAlert className="mx-auto size-10 text-muted-foreground" />

          <p className="mt-4 font-semibold">
            Standard not found
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            The standard you are looking for does not exist in the
            CargoLink standards register.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Breadcrumb */}
      <Link
        href="/standards"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Standards
      </Link>

      {/* Header */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
              {standard.code}
            </span>

            <span className="rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
              {standard.status}
            </span>

            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
              v{standard.version}
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {standard.title}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            {standard.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition hover:bg-muted"
          >
            <History className="size-4" />
            Version History
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
          >
            Update Standard
          </button>
        </div>
      </section>

      {/* Standard Overview */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <ClipboardCheck className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Requirements
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {standard.requirements}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Active requirements
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
            {linkedDocuments.length}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Documents linked to this standard
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <Truck className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Linked Operations
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {linkedOperations.length}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Current cargo operations
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <ShieldCheck className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Compliance Rate
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {linkedOperations.length > 0
              ? `${complianceRate}%`
              : "N/A"}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Across linked operations
          </p>
        </div>
      </section>

      {/* Standard Scope */}
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="font-semibold">
              Standard Scope
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Areas covered by this operational standard.
            </p>
          </div>

          <div className="p-5">
            <p className="text-sm leading-7 text-muted-foreground">
              {standard.description} This standard provides the
              operational framework used by CargoLink to manage
              applicable cargo activities, documentation, compliance,
              safety, and supporting evidence.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                standard.category,
                "Operational controls",
                "Compliance requirements",
                "Evidence management",
                "Documentation",
                "Review and governance",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3"
                >
                  <CheckCircle2 className="size-4 shrink-0" />

                  <span className="text-sm font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="font-semibold">
              Standard Information
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current standard metadata.
            </p>
          </div>

          <div className="divide-y">
            <div className="p-5">
              <p className="text-xs text-muted-foreground">
                Code
              </p>

              <p className="mt-1 font-medium">
                {standard.code}
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs text-muted-foreground">
                Version
              </p>

              <p className="mt-1 font-medium">
                v{standard.version}
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs text-muted-foreground">
                Category
              </p>

              <p className="mt-1 font-medium">
                {standard.category}
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs text-muted-foreground">
                Owner
              </p>

              <p className="mt-1 font-medium">
                {standard.owner}
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs text-muted-foreground">
                Last Updated
              </p>

              <p className="mt-1 font-medium">
                {standard.lastUpdated}
              </p>
            </div>

            <div className="p-5">
              <p className="text-xs text-muted-foreground">
                Status
              </p>

              <p className="mt-1 font-medium">
                {standard.status}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">
            Compliance Requirements
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Requirements currently defined for this standard.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="divide-y">
            {requirements.map((requirement) => (
              <div
                key={requirement.code}
                className="flex flex-col gap-4 p-5 lg:flex-row lg:items-start lg:justify-between"
              >
                <div className="flex min-w-0 gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <FileCheck2 className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {requirement.code}
                      </span>

                      <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-medium text-background">
                        {requirement.status}
                      </span>
                    </div>

                    <h3 className="mt-1 text-sm font-semibold">
                      {requirement.title}
                    </h3>

                    <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                      {requirement.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                      <span>
                        Category: {requirement.category}
                      </span>

                      <span>
                        Owner: {requirement.owner}
                      </span>

                      <span>
                        Evidence: {requirement.evidence}
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground"
                  aria-label={`Requirement ${requirement.code}`}
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          Showing {activeRequirements} configured requirement
          {activeRequirements === 1 ? "" : "s"} from this
          standard&apos;s current requirement framework.
        </p>
      </section>

      {/* Evidence Requirements */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">
            Evidence Requirements
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Evidence types required or conditionally required to
            demonstrate compliance with this standard.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          {evidenceRequirements.length > 0 ? (
            <div className="divide-y">
              {evidenceRequirements.map((evidence) => (
                <div
                  key={`${evidence.requirement}-${evidence.name}`}
                  className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <FileText className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {evidence.name}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {evidence.type} · Requirement{" "}
                        {evidence.requirement}
                      </p>
                    </div>
                  </div>

                  <span
                    className={
                      evidence.status === "Required"
                        ? "w-fit rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background"
                        : "w-fit rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                    }
                  >
                    {evidence.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <FileText className="mx-auto size-8 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">
                No evidence requirements configured
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                No evidence requirements have been defined for{" "}
                {standard.code}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Evidence Documents */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">
            Evidence Documents
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Documents currently registered against this standard.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          {linkedDocuments.length > 0 ? (
            <div className="divide-y">
              {linkedDocuments.map((document) => (
                <Link
                  key={document.id}
                  href={`/documents/${document.id}`}
                  className="flex flex-col gap-4 p-5 transition hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <FileText className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium">
                          {document.name}
                        </p>

                        <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium">
                          {document.reference}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {document.category} · {document.owner} ·{" "}
                        {document.fileType} · {document.size}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        document.status === "Verified"
                          ? "bg-foreground text-background"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {document.status}
                    </span>

                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <FileText className="mx-auto size-8 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">
                No evidence documents linked
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                No documents in the CargoLink document register
                currently reference {standard.code}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Linked Operations */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">
            Linked Operations
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Cargo operations currently governed by this standard.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          {linkedOperations.length > 0 ? (
            <div className="divide-y">
              {linkedOperations.map((operation) => (
                <Link
                  key={operation.id}
                  href={`/operations/${operation.id}`}
                  className="flex flex-col gap-4 p-5 transition hover:bg-muted/30 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Truck className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold">
                          {operation.reference}
                        </p>

                        <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium">
                          {operation.status}
                        </span>
                      </div>

                      <p className="mt-1 text-sm">
                        {operation.cargo}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {operation.origin} → {operation.destination}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:justify-end">
                    <span
                      className={
                        operation.compliance === "Compliant"
                          ? "rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background"
                          : "rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      }
                    >
                      {operation.compliance}
                    </span>

                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Truck className="mx-auto size-8 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">
                No linked operations
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                No operations currently reference {standard.code}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Compliance Relationship */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">
            Compliance Relationship
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Compliance records associated with this standard.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          {linkedComplianceItems.length > 0 ? (
            <div className="divide-y">
              {linkedComplianceItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        {item.code}
                      </span>

                      <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="mt-1 text-sm font-semibold">
                      {item.title}
                    </h3>

                    <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                      <span>
                        Owner: {item.owner}
                      </span>

                      <span>
                        Due: {item.dueDate}
                      </span>

                      <span>
                        Last reviewed: {item.lastReviewed}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                      item.status === "Compliant"
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <ShieldCheck className="mx-auto size-8 text-muted-foreground" />

              <p className="mt-3 text-sm font-medium">
                No compliance records linked
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                No compliance register entries currently reference{" "}
                {standard.code}.
              </p>
            </div>
          )}
        </div>

        {issueCount > 0 && (
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldAlert className="size-4" />

            <span>
              {issueCount} linked compliance record
              {issueCount === 1 ? "" : "s"} require
              {issueCount === 1 ? "s" : ""} attention.
            </span>
          </div>
        )}
      </section>

      {/* Governance */}
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="font-semibold">
              Governance & Ownership
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Teams responsible for maintaining and applying this
              standard.
            </p>
          </div>

          <div className="divide-y">
            <div className="flex items-center gap-4 p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <Users className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Standard Owner
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {standard.owner}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <ShieldCheck className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Compliance Team
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Responsible for requirement interpretation and
                  compliance review.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <Truck className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  Operations Team
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Responsible for applying requirements during cargo
                  operations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Version History */}
        <div className="rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="font-semibold">
              Version History
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Changes made to this standard over time.
            </p>
          </div>

          <div className="divide-y">
            {versionHistory.map((version) => (
              <div
                key={version.version}
                className="p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">
                        {version.version}
                      </p>

                      {version.current && (
                        <span className="rounded-full bg-foreground px-2.5 py-1 text-[10px] font-medium text-background">
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {version.date} · {version.author}
                    </p>
                  </div>

                  {!version.current && (
                    <button
                      type="button"
                      className="inline-flex size-8 items-center justify-center rounded-md transition hover:bg-muted"
                      aria-label={`Open ${version.version}`}
                    >
                      <ArrowUpRight className="size-4" />
                    </button>
                  )}
                </div>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {version.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}