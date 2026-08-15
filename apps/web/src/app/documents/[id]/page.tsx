import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { documents } from "@/features/documents/documents-data";
import { verificationRecords } from "@/features/documents/document-verification-data";
import { standards } from "@/features/standards/standards-data";

type DocumentDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DocumentDetailPage({
  params,
}: DocumentDetailPageProps) {
  const { id } = await params;

  const document = documents.find((item) => item.id === id);

  if (!document) {
    return (
      <div className="space-y-6 p-6 lg:p-8">
        <Link
          href="/documents"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Documents
        </Link>

        <div className="rounded-xl border bg-background p-12 text-center shadow-sm">
          <FileText className="mx-auto size-10 text-muted-foreground" />

          <h1 className="mt-4 text-xl font-semibold">
            Document not found
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            The requested document could not be found in the CargoLink
            document register.
          </p>
        </div>
      </div>
    );
  }

  /*
   * Resolve the document's standard code to the actual standard record.
   *
   * Example:
   * document.standard = "CL-OPS-001"
   * standard.id = "std-001"
   *
   * This allows us to navigate to /standards/std-001 rather than
   * incorrectly navigating to /standards/CL-OPS-001.
   */
  const standard = standards.find(
    (item) => item.code === document.standard,
  );

  /*
   * Get the verification history belonging specifically to this document.
   */
  const documentVerifications = verificationRecords.filter(
    (item) => item.documentId === document.id,
  );

  const isVerified = document.status === "Verified";
  const isPending = document.status === "Pending Review";
  const isExpired = document.status === "Expired";
  const isRejected = document.status === "Rejected";

  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/documents"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Document Center
        </Link>
      </div>

      {/* Header */}
      <section className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            {document.reference}
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {document.name}
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
            {document.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
              {document.category}
            </span>

            <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
              {document.standard}
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                isVerified
                  ? "bg-foreground text-background"
                  : isPending
                    ? "bg-muted text-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {document.status}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium transition hover:bg-muted"
          >
            <Download className="size-4" />
            Download
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90"
          >
            <RefreshCw className="size-4" />
            Replace Document
          </button>
        </div>
      </section>

      {/* Status Overview */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <ShieldCheck className="size-4" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Verification Status
          </p>

          <p className="mt-1 text-lg font-semibold">
            {document.status}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <FileText className="size-4" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            File
          </p>

          <p className="mt-1 text-lg font-semibold">
            {document.fileType}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {document.size}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <CalendarDays className="size-4" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Uploaded
          </p>

          <p className="mt-1 text-lg font-semibold">
            {document.uploaded}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <Clock3 className="size-4" />
          </div>

          <p className="mt-5 text-sm text-muted-foreground">
            Expiration
          </p>

          <p className="mt-1 text-lg font-semibold">
            {document.expires}
          </p>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* Main record */}
        <div className="space-y-6">
          {/* Document Information */}
          <section className="rounded-xl border bg-background shadow-sm">
            <div className="border-b p-5">
              <h2 className="font-semibold">
                Document Information
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Core information associated with this operational document.
              </p>
            </div>

            <div className="grid gap-x-8 gap-y-6 p-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Document Reference
                </p>

                <p className="mt-1 text-sm font-medium">
                  {document.reference}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Document Category
                </p>

                <p className="mt-1 text-sm font-medium">
                  {document.category}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Applicable Standard
                </p>

                {standard ? (
                  <Link
                    href={`/standards/${standard.id}`}
                    className="mt-1 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    {standard.code}
                    <span className="text-muted-foreground">↗</span>
                  </Link>
                ) : (
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {document.standard}
                  </p>
                )}
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Document Owner
                </p>

                <p className="mt-1 text-sm font-medium">
                  {document.owner}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  File Type
                </p>

                <p className="mt-1 text-sm font-medium">
                  {document.fileType}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  File Size
                </p>

                <p className="mt-1 text-sm font-medium">
                  {document.size}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Uploaded
                </p>

                <p className="mt-1 text-sm font-medium">
                  {document.uploaded}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Expires
                </p>

                <p
                  className={`mt-1 text-sm font-medium ${
                    isExpired ? "text-destructive" : ""
                  }`}
                >
                  {document.expires}
                </p>
              </div>
            </div>
          </section>

          {/* Verification History */}
          <section className="rounded-xl border bg-background shadow-sm">
            <div className="border-b p-5">
              <h2 className="font-semibold">
                Verification History
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Activity associated with the verification lifecycle of this
                document.
              </p>
            </div>

            <div className="divide-y">
              {/* Upload event */}
              <div className="flex gap-4 p-5">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                  <FileText className="size-4" />
                </div>

                <div className="min-w-0">
                  <p className="font-medium">
                    Document uploaded
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {document.reference} was added to the CargoLink document
                    register.
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {document.uploaded}
                  </p>
                </div>
              </div>

              {/* Verification records */}
              {documentVerifications.length > 0 ? (
                documentVerifications.map((record) => (
                  <div
                    key={record.id}
                    className="flex gap-4 p-5"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                      {record.action === "Verified" ? (
                        <CheckCircle2 className="size-4" />
                      ) : (
                        <Clock3 className="size-4" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                        <p className="font-medium">
                          {record.action}
                        </p>

                        <span className="w-fit rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                          {record.action}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {record.note}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-xs text-muted-foreground">
                        <span>{record.reviewer}</span>
                        <span>·</span>
                        <span>{record.date}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-5">
                  <p className="text-sm text-muted-foreground">
                    No additional verification activity has been recorded
                    for this document.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Compliance Relationship */}
          <section className="rounded-xl border bg-background p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <ShieldCheck className="size-4" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Compliance Relationship
                </h2>

                <p className="text-xs text-muted-foreground">
                  Linked standard
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border bg-muted/20 p-4">
              <p className="text-xs font-medium text-muted-foreground">
                Applicable Standard
              </p>

              {standard ? (
                <>
                  <p className="mt-1 font-semibold">
                    {standard.code}
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {standard.title}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {standard.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Version
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        v{standard.version}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Status
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {standard.status}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/standards/${standard.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    View standard
                    <span>↗</span>
                  </Link>
                </>
              ) : (
                <>
                  <p className="mt-1 font-semibold">
                    {document.standard}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Standard information is currently unavailable for this
                    document.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* Record Actions */}
          <section className="rounded-xl border bg-background p-5 shadow-sm">
            <h2 className="font-semibold">
              Record Actions
            </h2>

            <div className="mt-4 space-y-2">
              {isPending && (
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
                >
                  Submit for Review
                </button>
              )}

              {isRejected && (
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
                >
                  Correct & Resubmit
                </button>
              )}

              {!isVerified && !isRejected && (
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                >
                  Request Verification
                </button>
              )}

              <button
                type="button"
                className="flex w-full items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
              >
                Download Document
              </button>
            </div>
          </section>

          {/* Record ID */}
          <section className="rounded-xl border bg-background p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Record ID
            </p>

            <p className="mt-1 font-mono text-sm">
              {document.id}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}