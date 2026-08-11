export type VerificationAction =
  | "Submitted"
  | "Under Review"
  | "Verified"
  | "Rejected";

export type VerificationRecord = {
  id: string;
  documentId: string;
  action: VerificationAction;
  reviewer: string;
  date: string;
  note: string;
};

export const verificationRecords: VerificationRecord[] = [
  {
    id: "ver-001",
    documentId: "doc-001",
    action: "Verified",
    reviewer: "Compliance Admin",
    date: "Today",
    note:
      "Commercial invoice reviewed and confirmed against CL-OPS-001 documentation requirements.",
  },
  {
    id: "ver-002",
    documentId: "doc-003",
    action: "Submitted",
    reviewer: "Safety",
    date: "2 days ago",
    note:
      "Cargo safety certificate submitted for verification.",
  },
  {
    id: "ver-003",
    documentId: "doc-003",
    action: "Under Review",
    reviewer: "Safety Reviewer",
    date: "Today",
    note:
      "Certificate is currently being reviewed against cargo safety requirements.",
  },
  {
    id: "ver-004",
    documentId: "doc-006",
    action: "Rejected",
    reviewer: "Safety Reviewer",
    date: "1 week ago",
    note:
      "Document requires correction before it can satisfy the applicable safety requirements.",
  },
  {
    id: "ver-005",
    documentId: "doc-008",
    action: "Rejected",
    reviewer: "Compliance Admin",
    date: "Today",
    note:
      "Document has passed its stated expiry date and requires renewal.",
  },
];