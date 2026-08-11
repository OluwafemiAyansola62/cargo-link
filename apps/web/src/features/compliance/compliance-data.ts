export type ComplianceStatus =
  | "Compliant"
  | "At Risk"
  | "Non-Compliant"
  | "Under Review";

export type ComplianceCategory =
  | "Operations"
  | "Safety"
  | "Documentation"
  | "Security"
  | "Regulatory";

export type ComplianceItem = {
  id: string;
  code: string;
  title: string;
  description: string;
  category: ComplianceCategory;
  status: ComplianceStatus;
  standard: string;
  owner: string;
  dueDate: string;
  lastReviewed: string;
};

export const complianceItems: ComplianceItem[] = [
  {
    id: "cmp-001",
    code: "CL-CMP-001",
    title: "Cargo Documentation Verification",
    description:
      "Verification of required cargo documentation before shipment processing.",
    category: "Documentation",
    status: "Compliant",
    standard: "CL-DOC-003",
    owner: "Documentation",
    dueDate: "Aug 28, 2026",
    lastReviewed: "Today",
  },
  {
    id: "cmp-002",
    code: "CL-CMP-002",
    title: "International Shipping Requirements",
    description:
      "Review of documentation and operational requirements for international cargo movements.",
    category: "Regulatory",
    status: "Compliant",
    standard: "CL-CMP-004",
    owner: "Compliance",
    dueDate: "Sep 02, 2026",
    lastReviewed: "Yesterday",
  },
  {
    id: "cmp-003",
    code: "CL-CMP-003",
    title: "Cargo Safety Controls",
    description:
      "Assessment of required safety controls across cargo handling activities.",
    category: "Safety",
    status: "At Risk",
    standard: "CL-SAF-002",
    owner: "Safety",
    dueDate: "Aug 22, 2026",
    lastReviewed: "2 days ago",
  },
  {
    id: "cmp-004",
    code: "CL-CMP-004",
    title: "Warehouse Access Control",
    description:
      "Review of personnel authorization and access controls for warehouse operations.",
    category: "Security",
    status: "Compliant",
    standard: "CL-SEC-001",
    owner: "Security",
    dueDate: "Sep 10, 2026",
    lastReviewed: "3 days ago",
  },
  {
    id: "cmp-005",
    code: "CL-CMP-005",
    title: "Receiving Procedure Review",
    description:
      "Assessment of warehouse receiving procedures against current operational requirements.",
    category: "Operations",
    status: "Under Review",
    standard: "CL-OPS-006",
    owner: "Operations",
    dueDate: "Aug 25, 2026",
    lastReviewed: "4 days ago",
  },
  {
    id: "cmp-006",
    code: "CL-CMP-006",
    title: "Incident Reporting Compliance",
    description:
      "Review of cargo incident identification, reporting, escalation, and documentation.",
    category: "Safety",
    status: "Non-Compliant",
    standard: "CL-SAF-008",
    owner: "Safety",
    dueDate: "Aug 18, 2026",
    lastReviewed: "1 week ago",
  },
];