import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  ShieldCheck,
} from "lucide-react";

import { standards } from "@/features/standards/standards-data";

interface StandardDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function StandardDetailPage({
  params,
}: StandardDetailPageProps) {
  const { id } = await params;

  const standard = standards.find((item) => item.id === id);

  if (!standard) {
    return (
      <div className="p-6 lg:p-8">
        <Link
          href="/standards"
          className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to Standards
        </Link>

        <div className="mt-10 rounded-xl border bg-background p-8 text-center">
          <h1 className="text-xl font-semibold">
            Standard not found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The standard you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Breadcrumb / Back */}
      <div>
        <Link
          href="/standards"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Standards
        </Link>
      </div>

      {/* Header */}
      <section className="flex flex-col justify-between gap-6 border-b pb-8 lg:flex-row lg:items-start">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
              {standard.code}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                standard.status === "Active"
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {standard.status}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            {standard.title}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {standard.description}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
        >
          <ClipboardCheck className="size-4" />
          Run Compliance Check
        </button>
      </section>

      {/* Metadata */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <BookOpenCheck className="size-4" />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Category
          </p>

          <p className="mt-1 font-semibold">
            {standard.category}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <ShieldCheck className="size-4" />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Owner
          </p>

          <p className="mt-1 font-semibold">
            {standard.owner}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <FileText className="size-4" />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Version
          </p>

          <p className="mt-1 font-semibold">
            v{standard.version}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <CheckCircle2 className="size-4" />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Requirements
          </p>

          <p className="mt-1 font-semibold">
            {standard.requirements}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Requirements */}
        <div className="rounded-xl border bg-background shadow-sm">
          <div className="border-b p-5">
            <h2 className="font-semibold">
              Requirements
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Operational requirements defined by this standard.
            </p>
          </div>

          <div className="divide-y">
            {[
              "Documentation and verification requirements",
              "Operational process and handling requirements",
              "Compliance review and approval requirements",
              "Record keeping and retention requirements",
              "Incident reporting and escalation requirements",
            ].map((requirement, index) => (
              <div
                key={requirement}
                className="flex gap-4 p-5"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {index + 1}
                </div>

                <div>
                  <p className="text-sm font-medium">
                    {requirement}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Requirement {index + 1} of{" "}
                    {standard.requirements} for{" "}
                    {standard.code}.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Standard information */}
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <h2 className="font-semibold">
            Standard Information
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-xs text-muted-foreground">
                Standard ID
              </p>
              <p className="mt-1 text-sm font-medium">
                {standard.id}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Standard Code
              </p>
              <p className="mt-1 text-sm font-medium">
                {standard.code}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Current Version
              </p>
              <p className="mt-1 text-sm font-medium">
                v{standard.version}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Last Updated
              </p>
              <p className="mt-1 text-sm font-medium">
                {standard.lastUpdated}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Responsible Owner
              </p>
              <p className="mt-1 text-sm font-medium">
                {standard.owner}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}