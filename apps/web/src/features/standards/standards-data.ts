export type StandardStatus =
  | "Active"
  | "Under Review"
  | "Draft"
  | "Archived";

export type StandardCategory =
  | "Operations"
  | "Compliance"
  | "Safety"
  | "Documentation"
  | "Security";

export type Standard = {
  id: string;
  code: string;
  title: string;
  description: string;
  category: StandardCategory;
  status: StandardStatus;
  version: string;
  owner: string;
  requirements: number;
  lastUpdated: string;
};

export const standards: Standard[] = [
  {
    id: "std-001",
    code: "CL-OPS-001",
    title: "Cargo Handling & Documentation",
    description:
      "Operational requirements for cargo handling, documentation, verification, and handover procedures.",
    category: "Operations",
    status: "Active",
    version: "2.1",
    owner: "Operations",
    requirements: 24,
    lastUpdated: "2 hours ago",
  },
  {
    id: "std-002",
    code: "CL-CMP-004",
    title: "International Shipping Compliance",
    description:
      "Requirements for maintaining compliance across international cargo movements and shipping processes.",
    category: "Compliance",
    status: "Under Review",
    version: "1.8",
    owner: "Compliance",
    requirements: 31,
    lastUpdated: "Yesterday",
  },
  {
    id: "std-003",
    code: "CL-SAF-002",
    title: "Cargo Safety & Risk Management",
    description:
      "Safety controls and risk management requirements for cargo operations and associated activities.",
    category: "Safety",
    status: "Active",
    version: "3.0",
    owner: "Safety",
    requirements: 28,
    lastUpdated: "3 days ago",
  },
  {
    id: "std-004",
    code: "CL-DOC-003",
    title: "Cargo Documentation Control",
    description:
      "Standards governing the creation, verification, storage, and retention of operational documents.",
    category: "Documentation",
    status: "Active",
    version: "1.5",
    owner: "Documentation",
    requirements: 18,
    lastUpdated: "5 days ago",
  },
  {
    id: "std-005",
    code: "CL-SEC-001",
    title: "Cargo Security Management",
    description:
      "Security requirements for protecting cargo, operational information, facilities, and authorized access.",
    category: "Security",
    status: "Active",
    version: "2.0",
    owner: "Security",
    requirements: 22,
    lastUpdated: "1 week ago",
  },
  {
    id: "std-006",
    code: "CL-OPS-006",
    title: "Warehouse Receiving Procedures",
    description:
      "Standardized procedures for receiving, inspecting, recording, and storing incoming cargo.",
    category: "Operations",
    status: "Draft",
    version: "0.9",
    owner: "Operations",
    requirements: 16,
    lastUpdated: "1 week ago",
  },
  {
    id: "std-007",
    code: "CL-CMP-007",
    title: "Regulatory Compliance Review",
    description:
      "Framework for reviewing operational activities against applicable regulatory requirements.",
    category: "Compliance",
    status: "Active",
    version: "2.3",
    owner: "Compliance",
    requirements: 27,
    lastUpdated: "2 weeks ago",
  },
  {
    id: "std-008",
    code: "CL-SAF-008",
    title: "Cargo Incident Reporting",
    description:
      "Requirements for identifying, recording, escalating, and reviewing cargo-related incidents.",
    category: "Safety",
    status: "Archived",
    version: "1.2",
    owner: "Safety",
    requirements: 14,
    lastUpdated: "1 month ago",
  },
];