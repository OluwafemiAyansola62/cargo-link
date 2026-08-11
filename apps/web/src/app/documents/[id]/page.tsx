import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  FileText,
} from "lucide-react";

import { documents } from "@/features/documents/documents-data";

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
      <div className="p-6 lg:p-8">
        <Link
          href="/documents"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Documents
        </Link>

        <div className="mt-8 rounded-xl border bg-background p-10 text-center shadow-sm">
          <FileText className="mx-auto size-10 text-muted-foreground" />

          <h1 className="mt-4 text-xl font-semibold">
            Document not found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            The requested document does not exist in the CargoLink document
            register.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div>
        <Link
          href="/documents"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Documents
        </Link>

        <div className="mt-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {document.reference}
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight">
              {document.name}
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {document.description}
            </p>
          </div>

          <span
            className={`inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-medium ${
              document.status === "Verified"
                ? "bg-foreground text-background"
                : document.status === "Pending Review"
                  ? "bg-muted text-foreground"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            {document.status}
          </span>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Category
          </p>
          <p className="mt-2 font-semibold">
            {document.category}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Standard
          </p>
          <p className="mt-2 font-semibold">
            {document.standard}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Owner
          </p>
          <p className="mt-2 font-semibold">
            {document.owner}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            File
          </p>
          <p className="mt-2 font-semibold">
            {document.fileType} · {document.size}
          </p>
        </div>
      </section>

      <section className="rounded-xl border bg-background shadow-sm">
        <div className="border-b p-5">
          <h2 className="font-semibold">
            Document Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Operational and verification details for this document.
          </p>
        </div>

        <div className="grid gap-6 p-5 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Reference
            </p>
            <p className="mt-1 text-sm font-medium">
              {document.reference}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Standard
            </p>
            <p className="mt-1 text-sm font-medium">
              {document.standard}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Uploaded
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium">
              <CalendarDays className="size-4 text-muted-foreground" />
              {document.uploaded}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Expiration
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium">
              <CalendarDays className="size-4 text-muted-foreground" />
              {document.expires}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
