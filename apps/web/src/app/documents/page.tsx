"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Clock3,
  FileCheck2,
  FileText,
  Search,
  Upload,
} from "lucide-react";

import {
  documents,
  type DocumentCategory,
  type DocumentStatus,
} from "@/features/documents/documents-data";

const statuses: Array<DocumentStatus | "All"> = [
  "All",
  "Verified",
  "Pending Review",
  "Expired",
  "Rejected",
];

const categories: Array<DocumentCategory | "All"> = [
  "All",
  "Shipping",
  "Compliance",
  "Safety",
  "Operations",
  "Identity",
];

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState<DocumentCategory | "All">("All");
  const [status, setStatus] =
    useState<DocumentStatus | "All">("All");

  const filteredDocuments = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return documents.filter((document) => {
      const matchesSearch =
        searchValue === "" ||
        document.name.toLowerCase().includes(searchValue) ||
        document.reference.toLowerCase().includes(searchValue) ||
        document.description.toLowerCase().includes(searchValue) ||
        document.owner.toLowerCase().includes(searchValue) ||
        document.standard.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || document.category === category;

      const matchesStatus =
        status === "All" || document.status === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, category, status]);

  const verifiedCount = documents.filter(
    (document) => document.status === "Verified",
  ).length;

  const pendingCount = documents.filter(
    (document) => document.status === "Pending Review",
  ).length;

  const expiredCount = documents.filter(
    (document) => document.status === "Expired",
  ).length;

  const rejectedCount = documents.filter(
    (document) => document.status === "Rejected",
  ).length;

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Documentation Management
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Document Center
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Manage operational documents, verification status, expiry dates,
            and compliance documentation from one centralized workspace.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
        >
          <Upload className="size-4" />
          Upload Document
        </button>
      </section>

      {/* Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <FileCheck2 className="size-4" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Verified Documents
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {verifiedCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Documents meeting verification requirements
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <Clock3 className="size-4" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Pending Review
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {pendingCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Documents awaiting verification
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <AlertTriangle className="size-4" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Expired
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {expiredCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Documents requiring renewal
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <FileText className="size-4" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Rejected
          </p>

          <p className="mt-1 text-2xl font-semibold">
            {rejectedCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Documents requiring corrective action
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
              placeholder="Search documents..."
              className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm outline-none transition focus:border-slate-400"
            />
          </div>

          <select
            value={category}
            onChange={(event) =>
              setCategory(
                event.target.value as DocumentCategory | "All",
              )
            }
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
              setStatus(
                event.target.value as DocumentStatus | "All",
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
        </div>
      </section>

      {/* Document Register */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">Document Register</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Showing {filteredDocuments.length} of {documents.length}{" "}
            documents.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-sm">
              <thead className="border-b bg-muted/30">
                <tr className="text-left">
                  <th className="px-5 py-3 font-medium">
                    Document
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
                    Uploaded
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Expires
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {filteredDocuments.map((document) => (
                  <tr
                    key={document.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <FileText className="size-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs font-medium text-muted-foreground">
                            {document.reference}
                          </p>

                          <p className="mt-1 font-medium">
                            {document.name}
                          </p>

                          <p className="mt-1 max-w-md truncate text-xs text-muted-foreground">
                            {document.description}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {document.fileType} · {document.size}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                        {document.category}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {document.standard}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          document.status === "Verified"
                            ? "bg-foreground text-background"
                            : document.status === "Pending Review"
                              ? "bg-muted text-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {document.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {document.owner}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {document.uploaded}
                    </td>

                    <td
                      className={`whitespace-nowrap px-5 py-4 ${
                        document.status === "Expired"
                          ? "font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {document.expires}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDocuments.length === 0 && (
            <div className="p-10 text-center">
              <p className="font-medium">
                No documents found
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