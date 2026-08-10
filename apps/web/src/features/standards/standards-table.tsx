import { ArrowUpRight, FileText } from "lucide-react";

import type { Standard } from "./standards-data";

type StandardsTableProps = {
  standards: Standard[];
};

export function StandardsTable({ standards }: StandardsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left">
              <th className="px-5 py-3 font-medium text-muted-foreground">
                Standard
              </th>
              <th className="px-5 py-3 font-medium text-muted-foreground">
                Category
              </th>
              <th className="px-5 py-3 font-medium text-muted-foreground">
                Version
              </th>
              <th className="px-5 py-3 font-medium text-muted-foreground">
                Status
              </th>
              <th className="px-5 py-3 font-medium text-muted-foreground">
                Owner
              </th>
              <th className="px-5 py-3 font-medium text-muted-foreground">
                Updated
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>

          <tbody className="divide-y">
            {standards.map((standard) => (
              <tr
                key={standard.id}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <FileText className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        {standard.code}
                      </p>

                      <p className="mt-1 font-medium">
                        {standard.title}
                      </p>

                      <p className="mt-1 max-w-md truncate text-xs text-muted-foreground">
                        {standard.description}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                    {standard.category}
                  </span>
                </td>

                <td className="px-5 py-4 text-muted-foreground">
                  v{standard.version}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      standard.status === "Active"
                        ? "bg-foreground text-background"
                        : standard.status === "Under Review"
                          ? "bg-muted text-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {standard.status}
                  </span>
                </td>

                <td className="px-5 py-4 text-muted-foreground">
                  {standard.owner}
                </td>

                <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">
                  {standard.lastUpdated}
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    aria-label={`Open ${standard.title}`}
                    className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-muted"
                  >
                    <ArrowUpRight className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {standards.length === 0 && (
        <div className="p-10 text-center">
          <p className="font-medium">No standards found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}