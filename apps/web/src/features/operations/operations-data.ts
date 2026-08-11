export type OperationStatus =
  | "Active"
  | "Pending"
  | "Completed"
  | "At Risk";

export type OperationCompliance =
  | "Compliant"
  | "At Risk"
  | "Non-Compliant"
  | "Under Review";

export type Operation = {
  id: string;
  reference: string;
  cargo: string;
  origin: string;
  destination: string;
  status: OperationStatus;
  compliance: OperationCompliance;
  owner: string;
  standard: string;
  expectedCompletion: string;
  lastUpdated: string;
};

export const operations: Operation[] = [
  {
    id: "op-001",
    reference: "OP-2026-001",
    cargo: "Automotive Spare Parts",
    origin: "Lagos, Nigeria",
    destination: "Accra, Ghana",
    status: "Active",
    compliance: "Compliant",
    owner: "Operations",
    standard: "CL-OPS-001",
    expectedCompletion: "Aug 14, 2026",
    lastUpdated: "1 hour ago",
  },
  {
    id: "op-002",
    reference: "OP-2026-002",
    cargo: "Industrial Equipment",
    origin: "Shanghai, China",
    destination: "Lagos, Nigeria",
    status: "Active",
    compliance: "Compliant",
    owner: "Logistics",
    standard: "CL-CMP-004",
    expectedCompletion: "Aug 19, 2026",
    lastUpdated: "3 hours ago",
  },
  {
    id: "op-003",
    reference: "OP-2026-003",
    cargo: "Consumer Electronics",
    origin: "Dubai, UAE",
    destination: "Lagos, Nigeria",
    status: "At Risk",
    compliance: "At Risk",
    owner: "Compliance",
    standard: "CL-SAF-002",
    expectedCompletion: "Aug 16, 2026",
    lastUpdated: "5 hours ago",
  },
  {
    id: "op-004",
    reference: "OP-2026-004",
    cargo: "Pharmaceutical Supplies",
    origin: "Frankfurt, Germany",
    destination: "Lagos, Nigeria",
    status: "Pending",
    compliance: "Under Review",
    owner: "Compliance",
    standard: "CL-CMP-004",
    expectedCompletion: "Aug 22, 2026",
    lastUpdated: "Yesterday",
  },
  {
    id: "op-005",
    reference: "OP-2026-005",
    cargo: "Textile Materials",
    origin: "Istanbul, Türkiye",
    destination: "Lagos, Nigeria",
    status: "Completed",
    compliance: "Compliant",
    owner: "Operations",
    standard: "CL-DOC-003",
    expectedCompletion: "Completed",
    lastUpdated: "2 days ago",
  },
  {
    id: "op-006",
    reference: "OP-2026-006",
    cargo: "Construction Materials",
    origin: "Lagos, Nigeria",
    destination: "Abidjan, Côte d'Ivoire",
    status: "Active",
    compliance: "Compliant",
    owner: "Logistics",
    standard: "CL-OPS-001",
    expectedCompletion: "Aug 18, 2026",
    lastUpdated: "Yesterday",
  },
  {
    id: "op-007",
    reference: "OP-2026-007",
    cargo: "Agricultural Equipment",
    origin: "Rotterdam, Netherlands",
    destination: "Lagos, Nigeria",
    status: "At Risk",
    compliance: "Non-Compliant",
    owner: "Safety",
    standard: "CL-SAF-008",
    expectedCompletion: "Aug 21, 2026",
    lastUpdated: "2 days ago",
  },
  {
    id: "op-008",
    reference: "OP-2026-008",
    cargo: "Food Processing Equipment",
    origin: "Milan, Italy",
    destination: "Lagos, Nigeria",
    status: "Completed",
    compliance: "Compliant",
    owner: "Operations",
    standard: "CL-OPS-006",
    expectedCompletion: "Completed",
    lastUpdated: "4 days ago",
  },
];