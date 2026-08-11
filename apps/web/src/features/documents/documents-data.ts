export type DocumentStatus =
  | "Verified"
  | "Pending Review"
  | "Expired"
  | "Rejected";

export type DocumentCategory =
  | "Shipping"
  | "Compliance"
  | "Safety"
  | "Operations"
  | "Identity";

export type CargoDocument = {
  id: string;
  reference: string;
  name: string;
  description: string;
  category: DocumentCategory;
  status: DocumentStatus;
  owner: string;
  fileType: string;
  size: string;
  uploaded: string;
  expires: string;
  standard: string;
};

export const documents: CargoDocument[] = [
  {
    id: "doc-001",
    reference: "DOC-2026-001",
    name: "Commercial Invoice",
    description:
      "Commercial invoice supporting the declared value and shipment details.",
    category: "Shipping",
    status: "Verified",
    owner: "Operations",
    fileType: "PDF",
    size: "1.8 MB",
    uploaded: "Today",
    expires: "Sep 30, 2026",
    standard: "CL-OPS-001",
  },
  {
    id: "doc-002",
    reference: "DOC-2026-002",
    name: "Packing List",
    description:
      "Detailed packing information including cargo quantities, dimensions, and contents.",
    category: "Shipping",
    status: "Verified",
    owner: "Operations",
    fileType: "PDF",
    size: "940 KB",
    uploaded: "Yesterday",
    expires: "Oct 15, 2026",
    standard: "CL-OPS-001",
  },
  {
    id: "doc-003",
    reference: "DOC-2026-003",
    name: "Cargo Safety Certificate",
    description:
      "Certificate confirming applicable safety requirements for cargo handling.",
    category: "Safety",
    status: "Pending Review",
    owner: "Safety",
    fileType: "PDF",
    size: "2.4 MB",
    uploaded: "2 days ago",
    expires: "Aug 25, 2026",
    standard: "CL-SAF-002",
  },
  {
    id: "doc-004",
    reference: "DOC-2026-004",
    name: "Insurance Certificate",
    description:
      "Current cargo insurance documentation covering eligible shipment risks.",
    category: "Compliance",
    status: "Verified",
    owner: "Compliance",
    fileType: "PDF",
    size: "1.2 MB",
    uploaded: "3 days ago",
    expires: "Dec 12, 2026",
    standard: "CL-CMP-004",
  },
  {
    id: "doc-005",
    reference: "DOC-2026-005",
    name: "Warehouse Access Register",
    description:
      "Operational record of authorized personnel accessing cargo storage facilities.",
    category: "Operations",
    status: "Pending Review",
    owner: "Security",
    fileType: "XLSX",
    size: "620 KB",
    uploaded: "4 days ago",
    expires: "Sep 05, 2026",
    standard: "CL-SEC-001",
  },
  {
    id: "doc-006",
    reference: "DOC-2026-006",
    name: "Dangerous Goods Declaration",
    description:
      "Declaration documenting applicable dangerous goods information and handling requirements.",
    category: "Safety",
    status: "Rejected",
    owner: "Safety",
    fileType: "PDF",
    size: "1.6 MB",
    uploaded: "1 week ago",
    expires: "Aug 18, 2026",
    standard: "CL-SAF-002",
  },
  {
    id: "doc-007",
    reference: "DOC-2026-007",
    name: "Customs Clearance Documentation",
    description:
      "Documentation supporting customs processing and regulatory clearance.",
    category: "Compliance",
    status: "Verified",
    owner: "Compliance",
    fileType: "PDF",
    size: "3.1 MB",
    uploaded: "1 week ago",
    expires: "Nov 20, 2026",
    standard: "CL-CMP-004",
  },
  {
    id: "doc-008",
    reference: "DOC-2026-008",
    name: "Driver Identification Record",
    description:
      "Identification and authorization record for personnel assigned to cargo movement.",
    category: "Identity",
    status: "Expired",
    owner: "Operations",
    fileType: "PDF",
    size: "780 KB",
    uploaded: "2 weeks ago",
    expires: "Aug 08, 2026",
    standard: "CL-OPS-001",
  },
];