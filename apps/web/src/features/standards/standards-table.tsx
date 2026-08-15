import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  ShieldAlert,
  Truck,
} from "lucide-react";

import type { StandardWithMetrics } from "./standards-data";

type StandardsTableProps = {
  standards: StandardWithMetrics[];
};

export function StandardsTable({
  standards,
}: StandardsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-sm">
          <thead className="border-b bg-muted/30">
            <tr className="text-left">
              <th className="px-5 py-3 font-medium">
                Standard
              </th>

              <th className="px-5 py-3 font-medium">
                Category
              </th>

              <th className="px-5 py-3 font-medium">
                Version
              </th>

              <th className="px-5 py-3 font-medium">
                Status
              </th>

              <th className="px-5 py-3 font-medium">
                Coverage
              </th>

              <th className="px-5 py-3 font-medium">
                Compliance
              </th>

              <th className="px-5 py-3 font-medium">
                Owner
              </th>

              <th className="px-5 py-3 font-medium">
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
                {/* Standard */}
                <td className="px-5 py-4">
                  <Link
                    href={`/standards/${standard.id}`}
                    className="group flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <FileText className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">
                        {standard.code}
                      </p>

                      <p className="mt-1 font-medium group-hover:underline">
                        {standard.title}
                      </p>

                      <p className="mt-1 max-w-md truncate text-xs text-muted-foreground">
                        {standard.description}
                      </p>
                    </div>
                  </Link>
                </td>

                {/* Category */}
                <td className="px-5 py-4">
                  <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium">
                    {standard.category}
                  </span>
                </td>

                {/* Version */}
                <td className="px-5 py-4 text-muted-foreground">
                  v{standard.version}
                </td>

                {/* Status */}
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

                {/* Coverage */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Truck className="size-4" />
                    </div>

                    <div>
                      <p className="font-medium">
                        {standard.linkedOperations}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {standard.linkedOperations === 1
                          ? "operation"
                          : "operations"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Compliance */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">
                        {standard.complianceRate !== null
                          ? `${standard.complianceRate}%`
                          : "N/A"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {standard.linkedComplianceItems}{" "}
                        {standard.linkedComplianceItems === 1
                          ? "record"
                          : "records"}
                      </p>
                    </div>

                    {standard.issues > 0 && (
                      <span
                        className="inline-flex size-7 items-center justify-center rounded-full bg-muted"
                        title={`${standard.issues} compliance issue${
                          standard.issues === 1 ? "" : "s"
                        }`}
                      >
                        <ShieldAlert className="size-3.5" />
                      </span>
                    )}
                  </div>
                </td>

                {/* Owner */}
                <td className="px-5 py-4 text-muted-foreground">
                  {standard.owner}
                </td>

                {/* Updated */}
                <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                  {standard.lastUpdated}
                </td>

                {/* Action */}
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`/standards/${standard.id}`}
                    aria-label={`Open ${standard.title}`}
                    className="inline-flex size-8 items-center justify-center rounded-md transition-colors hover:bg-muted"
                  >
                    <ArrowUpRight className="size-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {standards.length === 0 && (
        <div className="p-10 text-center">
          <p className="font-medium">
            No standards found
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}