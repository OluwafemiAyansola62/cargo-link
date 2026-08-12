"use client";

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
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

import { standards } from "@/features/standards/standards-data";

const requirements = [
  {
    code: "CL-CMP-001",
    title: "Cargo Documentation Verification",
    description:
      "Required cargo and shipment documentation must be complete, accurate, and verified before dispatch.",
    category: "Documentation",
    status: "Active",
    evidence: "Commercial Invoice, Packing List",
    owner: "Documentation",
  },
  {
    code: "CL-CMP-002",
    title: "Cargo Identification and Tracking",
    description:
      "Cargo must have sufficient identification and tracking information throughout the operational lifecycle.",
    category: "Operations",
    status: "Active",
    evidence: "Cargo Tracking Record",
    owner: "Operations",
  },
  {
    code: "CL-CMP-003",
    title: "Cargo Safety Controls",
    description:
      "Applicable safety controls and inspection procedures must be completed and documented.",
    category: "Safety",
    status: "Active",
    evidence: "Cargo Safety Checklist",
    owner: "Safety",
  },
  {
    code: "CL-CMP-004",
    title: "International Shipping Requirements",
    description:
      "International cargo movements must satisfy applicable shipping, customs, and regulatory requirements.",
    category: "Compliance",
    status: "Active",
    evidence: "Shipping Documentation",
    owner: "Compliance",
  },
];

const evidenceRequirements = [
  {
    name: "Commercial Invoice",
    type: "Shipping Document",
    requirement: "CL-CMP-001",
    status: "Required",
  },
  {
    name: "Packing List",
    type: "Cargo Document",
    requirement: "CL-CMP-001",
    status: "Required",
  },
  {
    name: "Cargo Safety Checklist",
    type: "Safety Evidence",
    requirement: "CL-CMP-003",
    status: "Required",
  },
  {
    name: "Cargo Insurance Certificate",
    type: "Insurance Evidence",
    requirement: "CL-CMP-003",
    status: "Conditional",
  },
];

const linkedOperations = [
  {
    reference: "CL-OPS-001",
    cargo: "Consumer Electronics",
    route: "Lagos → Accra",
    status: "Active",
    compliance: "Compliant",
  },
  {
    reference: "CL-OPS-002",
    cargo: "Industrial Equipment",
    route: "Lagos → Abuja",
    status: "At Risk",
    compliance: "Attention Required",
  },
  {
    reference: "CL-OPS-003",
    cargo: "Medical Supplies",
    route: "Apapa → Port Harcourt",
    status: "Active",
    compliance: "Compliant",
  },
];

const versionHistory = [
  {
    version: "v2.1",
    date: "Aug 8, 2026",
    author: "CargoLink Compliance",
    change:
      "Updated cargo safety controls and international shipping requirements.",
    current: true,
  },
  {
    version: "v2.0",
    date: "Jun 14, 2026",
    author: "CargoLink Compliance",
    change:
      "Introduced structured evidence requirements and operational compliance checks.",
    current: false,
  },
  {
    version: "v1.4",
    date: "Mar 21, 2026",
    author: "CargoLink Operations",
    change:
      "Updated documentation verification requirements.",
    current: false,
  },
];

export default function StandardDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const standard = standards.find((item) => item.id === id);

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

        <div className="mt-12 rounded-xl border bg-background p-10 text-center">
          <p className="font-semibold">Standard not found</p>

          <p className="mt-1 text-sm text-muted-foreground">
            The standard you are looking for does not exist.
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
              Active
            </span>

            <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
              v2.1
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {standard.title}
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Operational standard governing cargo movement, documentation,
            safety, compliance, and supporting evidence across CargoLink
            operations.
          </p>
        </div>

        <div className="flex gap-2">
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

          <p className="mt-1 text-2xl font-semibold">24</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Active requirements
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <FileText className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Evidence Types
          </p>

          <p className="mt-1 text-2xl font-semibold">12</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Supporting evidence types
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <Truck className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Linked Operations
          </p>

          <p className="mt-1 text-2xl font-semibold">18</p>

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

          <p className="mt-1 text-2xl font-semibold">94%</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Across linked operations
          </p>
        </div>
      </section>

      {/* Standard Scope */}
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="font-semibold">Standard Scope</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Areas covered by this operational standard.
            </p>
          </div>

          <div className="p-5">
            <p className="text-sm leading-7 text-muted-foreground">
              This standard establishes the operational controls required
              to manage cargo movements from registration through delivery.
              It provides a common framework for documentation verification,
              cargo identification, safety controls, compliance review,
              dispatch readiness, and supporting evidence.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Cargo documentation",
                "Operational controls",
                "Safety verification",
                "Compliance requirements",
                "Evidence management",
                "Dispatch readiness",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3"
                >
                  <CheckCircle2 className="size-4 shrink-0" />

                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="font-semibold">Standard Information</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current standard metadata.
            </p>
          </div>

          <div className="divide-y">
            <div className="p-5">
              <p className="text-xs text-muted-foreground">Code</p>
              <p className="mt-1 font-medium">{standard.code}</p>
            </div>

            <div className="p-5">
              <p className="text-xs text-muted-foreground">Version</p>
              <p className="mt-1 font-medium">v2.1</p>
            </div>

            <div className="p-5">
              <p className="text-xs text-muted-foreground">Owner</p>
              <p className="mt-1 font-medium">CargoLink Compliance</p>
            </div>

            <div className="p-5">
              <p className="text-xs text-muted-foreground">
                Effective Date
              </p>
              <p className="mt-1 font-medium">Aug 8, 2026</p>
            </div>

            <div className="p-5">
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="mt-1 font-medium">Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">Compliance Requirements</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Requirements defined by this standard and applied to cargo
            operations.
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
                      <span>Category: {requirement.category}</span>
                      <span>Owner: {requirement.owner}</span>
                      <span>Evidence: {requirement.evidence}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex size-8 shrink-0 items-center justify-center rounded-md transition hover:bg-muted"
                  aria-label={`Open ${requirement.code}`}
                >
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Requirements */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">Evidence Requirements</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Evidence types that may be required to demonstrate compliance.
          </p>
        </div>

        <div className="rounded-xl border bg-background shadow-sm">
          <div className="divide-y">
            {evidenceRequirements.map((evidence) => (
              <div
                key={evidence.name}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                    <FileText className="size-4" />
                  </div>

                  <div>
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
        </div>
      </section>

      {/* Linked Operations */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">Linked Operations</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Cargo operations currently governed by this standard.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="divide-y">
            {linkedOperations.map((operation) => (
              <div
                key={operation.reference}
                className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <Truck className="size-4" />
                  </div>

                  <div>
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
                      {operation.route}
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

                  <Link
                    href={`/operations/${operation.reference
                      .toLowerCase()
                      .replace("cl-ops-", "")}`}
                    className="inline-flex size-8 items-center justify-center rounded-md transition hover:bg-muted"
                    aria-label={`Open ${operation.reference}`}
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="font-semibold">Governance & Ownership</h2>

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
                <p className="text-sm font-medium">Standard Owner</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  CargoLink Compliance
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <ShieldCheck className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">Compliance Team</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Responsible for requirement interpretation and review.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <Truck className="size-4" />
              </div>

              <div>
                <p className="text-sm font-medium">Operations Team</p>
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
            <h2 className="font-semibold">Version History</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Changes made to this standard over time.
            </p>
          </div>

          <div className="divide-y">
            {versionHistory.map((version) => (
              <div key={version.version} className="p-5">
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