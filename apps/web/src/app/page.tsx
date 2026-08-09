import {
  ArrowUpRight,
  BookOpenCheck,
  ClipboardCheck,
  FileCheck2,
  ShieldCheck,
  Truck,
} from "lucide-react";

const metrics = [
  {
    label: "Active Standards",
    value: "128",
    change: "+12 this month",
    icon: BookOpenCheck,
  },
  {
    label: "Compliance Rate",
    value: "94.8%",
    change: "+2.4% this month",
    icon: ShieldCheck,
  },
  {
    label: "Documents",
    value: "342",
    change: "+28 this month",
    icon: FileCheck2,
  },
  {
    label: "Open Reviews",
    value: "17",
    change: "5 due this week",
    icon: ClipboardCheck,
  },
];

const recentStandards = [
  {
    code: "CL-OPS-001",
    title: "Cargo Handling & Documentation",
    category: "Operations",
    status: "Active",
    updated: "2 hours ago",
  },
  {
    code: "CL-CMP-004",
    title: "International Shipping Compliance",
    category: "Compliance",
    status: "Under Review",
    updated: "Yesterday",
  },
  {
    code: "CL-SAF-002",
    title: "Cargo Safety & Risk Management",
    category: "Safety",
    status: "Active",
    updated: "3 days ago",
  },
];

export default function Home() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Operations Overview
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Welcome to CargoLink
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Monitor standards, compliance, documentation, and operational
            readiness from one centralized workspace.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
        >
          <Truck className="size-4" />
          New Operation
        </button>
      </section>

      {/* Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.label}
              className="rounded-xl border bg-background p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4" />
                </div>

                <ArrowUpRight className="size-4 text-muted-foreground" />
              </div>

              <p className="mt-5 text-sm text-muted-foreground">
                {metric.label}
              </p>

              <p className="mt-1 text-2xl font-semibold tracking-tight">
                {metric.value}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {metric.change}
              </p>
            </div>
          );
        })}
      </section>

      {/* Main content */}
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Standards */}
        <div className="rounded-xl border bg-background shadow-sm">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <h2 className="font-semibold">Recent Standards</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Recently updated standards in your workspace.
              </p>
            </div>

            <a
              href="/standards"
              className="text-sm font-medium hover:underline"
            >
              View all
            </a>
          </div>

          <div className="divide-y">
            {recentStandards.map((standard) => (
              <div
                key={standard.code}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium text-muted-foreground">
                    {standard.code}
                  </p>

                  <h3 className="mt-1 truncate text-sm font-medium">
                    {standard.title}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {standard.category} · Updated {standard.updated}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    standard.status === "Active"
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {standard.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div>
            <h2 className="font-semibold">Compliance Overview</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Current operational compliance status.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <div className="relative flex size-40 items-center justify-center rounded-full border-[12px] border-muted">
              <div className="absolute inset-0 rounded-full border-[12px] border-foreground border-r-transparent border-b-transparent" />

              <div className="text-center">
                <p className="text-3xl font-semibold">94.8%</p>
                <p className="text-xs text-muted-foreground">Compliant</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Standards reviewed
              </span>

              <span className="font-medium">112 / 128</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Documents verified
              </span>

              <span className="font-medium">318 / 342</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Open compliance issues
              </span>

              <span className="font-medium">9</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">Quick Actions</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Common tasks for your operations team.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Browse Standards",
              description:
                "Explore the CargoLink standards and requirements library.",
              icon: BookOpenCheck,
            },
            {
              title: "Run Compliance Check",
              description:
                "Review your current compliance position against standards.",
              icon: ShieldCheck,
            },
            {
              title: "Upload Document",
              description:
                "Add operational or compliance documentation to CargoLink.",
              icon: FileCheck2,
            },
          ].map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                className="group rounded-xl border bg-background p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-4" />
                </div>

                <h3 className="mt-4 text-sm font-semibold">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {action.description}
                </p>

                <div className="mt-4 text-xs font-medium">Open →</div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}