"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  MapPin,
  ShieldCheck,
  Truck,
  TriangleAlert,
} from "lucide-react";

import { operations } from "@/features/operations/operations-data";

const readiness = [
  {
    label: "Documentation",
    value: 100,
    icon: FileText,
  },
  {
    label: "Safety",
    value: 92,
    icon: ShieldCheck,
  },
  {
    label: "Compliance",
    value: 88,
    icon: FileCheck2,
  },
  {
    label: "Security",
    value: 96,
    icon: CheckCircle2,
  },
];

const documents = [
  {
    id: "doc-001",
    name: "Commercial Invoice",
    type: "Shipping Document",
    status: "Verified",
    requirement: "CL-CMP-001",
    required: true,
    owner: "Documentation",
    date: "Aug 10, 2026",
  },
  {
    id: "doc-002",
    name: "Packing List",
    type: "Cargo Document",
    status: "Verified",
    requirement: "CL-CMP-001",
    required: true,
    owner: "Documentation",
    date: "Aug 10, 2026",
  },
  {
    id: "doc-003",
    name: "Cargo Insurance Certificate",
    type: "Insurance",
    status: "Under Review",
    requirement: "CL-CMP-003",
    required: true,
    owner: "Compliance",
    date: "Aug 9, 2026",
  },
  {
    id: "doc-004",
    name: "Cargo Safety Checklist",
    type: "Safety Document",
    status: "Missing",
    requirement: "CL-CMP-003",
    required: true,
    owner: "Safety",
    date: "Required",
  },
];

const requirements = [
  {
    code: "CL-CMP-001",
    title: "Cargo Documentation Verification",
    status: "Compliant",
    due: "Aug 28, 2026",
    owner: "Documentation",
  },
  {
    code: "CL-CMP-003",
    title: "Cargo Safety Controls",
    status: "At Risk",
    due: "Aug 22, 2026",
    owner: "Safety",
  },
  {
    code: "CL-CMP-004",
    title: "International Shipping Requirements",
    status: "Compliant",
    due: "Sep 02, 2026",
    owner: "Compliance",
  },
];

const activity = [
  {
    title: "Compliance review completed",
    description:
      "International shipping requirements were reviewed against the operation.",
    time: "Today, 10:42 AM",
    icon: ShieldCheck,
  },
  {
    title: "Cargo documentation verified",
    description:
      "Commercial invoice and packing list were verified.",
    time: "Yesterday, 3:18 PM",
    icon: FileCheck2,
  },
  {
    title: "Operation updated",
    description:
      "Cargo movement details were updated by Operations.",
    time: "Aug 9, 2026",
    icon: Truck,
  },
];

export default function OperationDetailPage() {
  const params = useParams();
  const id = String(params.id);

  const operation = operations.find(
    (item) => item.id === id,
  );

  if (!operation) {
    return (
      <div className="p-6 lg:p-8">
        <Link
          href="/operations"
          className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to Operations
        </Link>

        <div className="mt-12 rounded-xl border bg-background p-10 text-center">
          <p className="font-semibold">Operation not found</p>

          <p className="mt-1 text-sm text-muted-foreground">
            The operation you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const averageReadiness = Math.round(
    readiness.reduce(
      (total, item) => total + item.value,
      0,
    ) / readiness.length,
  );

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Breadcrumb */}
      <Link
        href="/operations"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Operations
      </Link>

      {/* Header */}
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
              {operation.reference}
            </span>

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

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                operation.compliance === "Compliant"
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {operation.compliance}
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {operation.cargo}
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            Manage operational readiness, compliance requirements,
            standards, and supporting documentation for this cargo
            movement.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition hover:bg-muted"
          >
            Run Compliance Check
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
          >
            Update Operation
          </button>
        </div>
      </section>

      {/* Operation overview */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <MapPin className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Origin
          </p>

          <p className="mt-1 font-semibold">
            {operation.origin}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <MapPin className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Destination
          </p>

          <p className="mt-1 font-semibold">
            {operation.destination}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <Truck className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Responsible Owner
          </p>

          <p className="mt-1 font-semibold">
            {operation.owner}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <Clock3 className="size-4" />
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Expected Completion
          </p>

          <p className="mt-1 font-semibold">
            {operation.expectedCompletion}
          </p>
        </div>
      </section>

      {/* Readiness */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">
            Operational Readiness
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Current readiness across the key operational control areas.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
          <div className="flex items-center justify-center rounded-xl border bg-background p-8 shadow-sm">
            <div className="text-center">
              <div className="relative mx-auto flex size-44 items-center justify-center rounded-full border-[14px] border-muted">
                <div className="absolute inset-[-14px] rounded-full border-[14px] border-foreground border-r-transparent border-b-transparent" />

                <div>
                  <p className="text-4xl font-semibold">
                    {averageReadiness}%
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Ready
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-muted-foreground">
                Overall operational readiness
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {readiness.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-xl border bg-background p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-4" />
                    </div>

                    <span className="text-sm font-semibold">
                      {item.value}%
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-medium">
                    {item.label}
                  </p>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-foreground"
                      style={{
                        width: `${item.value}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {item.value >= 95
                      ? "Ready"
                      : item.value >= 90
                        ? "Good standing"
                        : "Needs attention"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Standards + Requirements */}
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="font-semibold">
              Linked Standard
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Standard governing this operation.
            </p>
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {operation.standard}
                </p>

                <h3 className="mt-1 font-semibold">
                  Cargo Operations Standard
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Operational requirements applicable to the
                  movement, handling, documentation, and control
                  of this cargo.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-md transition hover:bg-muted"
                aria-label="Open standard"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-5">
              <div>
                <p className="text-xs text-muted-foreground">
                  Version
                </p>

                <p className="mt-1 font-medium">
                  v2.1
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Requirements
                </p>

                <p className="mt-1 font-medium">
                  24
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Status
                </p>

                <p className="mt-1 font-medium">
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="font-semibold">
              Compliance Requirements
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Requirements currently associated with this operation.
            </p>
          </div>

          <div className="divide-y">
            {requirements.map((requirement) => (
              <div
                key={requirement.code}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    {requirement.code}
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {requirement.title}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {requirement.owner} · Due {requirement.due}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    requirement.status === "Compliant"
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {requirement.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents & Evidence */}
<section>
  <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
    <div>
      <h2 className="font-semibold">Documents & Evidence</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Evidence supporting compliance requirements for this operation.
      </p>
    </div>

    <button
      type="button"
      className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-foreground px-3 text-sm font-medium text-background transition hover:opacity-90"
    >
      <FileText className="size-4" />
      Upload Evidence
    </button>
  </div>

  {/* Evidence summary */}
  <div className="mb-4 grid gap-4 sm:grid-cols-3">
    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <p className="text-xs text-muted-foreground">
        Required Evidence
      </p>
      <p className="mt-1 text-xl font-semibold">4</p>
    </div>

    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <p className="text-xs text-muted-foreground">
        Verified
      </p>
      <p className="mt-1 text-xl font-semibold">2</p>
    </div>

    <div className="rounded-xl border bg-background p-4 shadow-sm">
      <p className="text-xs text-muted-foreground">
        Needs Attention
      </p>
      <p className="mt-1 text-xl font-semibold">2</p>
    </div>
  </div>

  {/* Evidence warning */}
  <div className="mb-4 flex items-start gap-3 rounded-xl border bg-muted/40 p-4">
    <TriangleAlert className="mt-0.5 size-4 shrink-0" />

    <div>
      <p className="text-sm font-medium">
        Evidence requires attention
      </p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        One required document is missing and one document is still
        under review. Resolve these items before marking the operation
        fully ready.
      </p>
    </div>
  </div>

  <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
    <div className="divide-y">
      {documents.map((document) => (
        <div
          key={document.id}
          className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FileText className="size-4" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">
                  {document.name}
                </p>

                {document.required && (
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium">
                    Required
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {document.type} · {document.owner}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Requirement {document.requirement} · {document.date}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                document.status === "Verified"
                  ? "bg-foreground text-background"
                  : document.status === "Missing"
                    ? "bg-muted text-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {document.status}
            </span>

            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-md transition hover:bg-muted"
              aria-label={`Open ${document.name}`}
            >
              <ArrowUpRight className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Activity */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">
            Activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Recent activity associated with this operation.
          </p>
        </div>

        <div className="rounded-xl border bg-background shadow-sm">
          <div className="divide-y">
            {activity.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-5"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row">
                      <p className="text-sm font-medium">
                        {item.title}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}