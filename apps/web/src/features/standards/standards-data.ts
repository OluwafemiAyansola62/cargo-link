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

/*
 * Individual compliance requirement belonging to a standard.
 */
export type StandardRequirementStatus =
  | "Active"
  | "Under Review"
  | "Draft"
  | "Archived";

export type StandardRequirement = {
  code: string;
  title: string;
  description: string;
  category: StandardCategory;
  owner: string;
  evidence: string;
  status: StandardRequirementStatus;
};

/*
 * Evidence that must be produced to demonstrate compliance
 * with a particular requirement.
 */
export type StandardEvidenceStatus =
  | "Required"
  | "Conditional"
  | "Optional";

export type StandardEvidenceType =
  | "Document"
  | "Record"
  | "Certificate"
  | "Photo"
  | "Report"
  | "Checklist"
  | "Log";

export type StandardEvidenceRequirement = {
  /*
   * Requirement code this evidence supports.
   *
   * Example:
   * CL-OPS-001-R01
   */
  requirement: string;

  /*
   * Human-readable evidence name.
   */
  name: string;

  /*
   * Type of evidence expected.
   */
  type: StandardEvidenceType;

  /*
   * Whether the evidence is always required,
   * conditionally required, or optional.
   */
  status: StandardEvidenceStatus;
};

/*
 * Historical version information for a standard.
 */
export type StandardVersionHistory = {
  version: string;
  date: string;
  author: string;
  change: string;
  current: boolean;
};

/*
 * Core standard definition.
 */
export type Standard = {
  id: string;
  code: string;
  title: string;
  description: string;
  category: StandardCategory;
  status: StandardStatus;
  version: string;
  owner: string;

  /*
   * Summary count displayed in the Standards Library.
   */
  requirements: number;

  lastUpdated: string;

  /*
   * Detailed requirements displayed on the
   * Standard Detail page.
   */
  requirementItems: StandardRequirement[];

  /*
   * Evidence required to demonstrate compliance
   * with the standard's requirements.
   */
  evidenceRequirements: StandardEvidenceRequirement[];

  /*
   * Historical versions of the standard.
   */
  versionHistory: StandardVersionHistory[];
};

/*
 * Relationship metrics used by the Standards Library.
 *
 * Standard contains the core definition of a standard.
 * StandardWithMetrics contains the operational context around it.
 *
 * This keeps the base Standard model clean while allowing the
 * Standards Library to show how each standard is actually being used.
 */
export type StandardWithMetrics = Standard & {
  linkedOperations: number;
  linkedDocuments: number;
  linkedComplianceItems: number;
  complianceRate: number | null;
  issues: number;
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

    requirementItems: [
      {
        code: "CL-OPS-001-R01",
        title: "Cargo Identification",
        description:
          "All cargo must be correctly identified, labelled, and matched against the applicable shipment records before handling.",
        category: "Operations",
        owner: "Operations",
        evidence: "Cargo identification record",
        status: "Active",
      },
      {
        code: "CL-OPS-001-R02",
        title: "Cargo Documentation Verification",
        description:
          "Required shipment and cargo documentation must be reviewed and verified before cargo is accepted for processing.",
        category: "Documentation",
        owner: "Documentation",
        evidence: "Verified shipment documentation",
        status: "Active",
      },
      {
        code: "CL-OPS-001-R03",
        title: "Cargo Condition Inspection",
        description:
          "Cargo condition must be inspected and recorded before handover, storage, or onward movement.",
        category: "Safety",
        owner: "Operations",
        evidence: "Cargo inspection checklist",
        status: "Active",
      },
      {
        code: "CL-OPS-001-R04",
        title: "Handover Confirmation",
        description:
          "Every completed cargo handover must be documented and acknowledged by the responsible parties.",
        category: "Documentation",
        owner: "Operations",
        evidence: "Handover record",
        status: "Active",
      },
    ],

    evidenceRequirements: [
      {
        requirement: "CL-OPS-001-R01",
        name: "Cargo Identification Record",
        type: "Record",
        status: "Required",
      },
      {
        requirement: "CL-OPS-001-R02",
        name: "Verified Shipment Documentation",
        type: "Document",
        status: "Required",
      },
      {
        requirement: "CL-OPS-001-R03",
        name: "Cargo Inspection Checklist",
        type: "Checklist",
        status: "Required",
      },
      {
        requirement: "CL-OPS-001-R04",
        name: "Cargo Handover Record",
        type: "Record",
        status: "Required",
      },
    ],

    versionHistory: [
      {
        version: "v2.1",
        date: "2 hours ago",
        author: "Operations Team",
        change:
          "Updated cargo handling controls and strengthened documentation verification requirements.",
        current: true,
      },
      {
        version: "v2.0",
        date: "3 months ago",
        author: "Operations Team",
        change:
          "Introduced revised cargo handover and inspection procedures.",
        current: false,
      },
      {
        version: "v1.5",
        date: "8 months ago",
        author: "Operations Team",
        change:
          "Expanded documentation and cargo identification requirements.",
        current: false,
      },
    ],
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

    requirementItems: [
      {
        code: "CL-CMP-004-R01",
        title: "Regulatory Documentation",
        description:
          "Applicable regulatory and shipping documentation must be available and verified before international cargo movement.",
        category: "Compliance",
        owner: "Compliance",
        evidence: "Regulatory documentation",
        status: "Active",
      },
      {
        code: "CL-CMP-004-R02",
        title: "Shipment Compliance Review",
        description:
          "International shipments must undergo compliance review against applicable regulatory requirements.",
        category: "Compliance",
        owner: "Compliance",
        evidence: "Compliance review record",
        status: "Active",
      },
      {
        code: "CL-CMP-004-R03",
        title: "Restricted Cargo Screening",
        description:
          "Cargo must be screened for applicable restrictions, prohibitions, and regulatory controls.",
        category: "Security",
        owner: "Compliance",
        evidence: "Screening record",
        status: "Under Review",
      },
    ],

    evidenceRequirements: [
      {
        requirement: "CL-CMP-004-R01",
        name: "Regulatory Documentation",
        type: "Document",
        status: "Required",
      },
      {
        requirement: "CL-CMP-004-R02",
        name: "Compliance Review Record",
        type: "Report",
        status: "Required",
      },
      {
        requirement: "CL-CMP-004-R03",
        name: "Cargo Screening Record",
        type: "Record",
        status: "Conditional",
      },
    ],

    versionHistory: [
      {
        version: "v1.8",
        date: "Yesterday",
        author: "Compliance Team",
        change:
          "Standard is currently under review following updates to international shipping controls.",
        current: true,
      },
      {
        version: "v1.7",
        date: "2 months ago",
        author: "Compliance Team",
        change:
          "Expanded regulatory review and restricted cargo screening requirements.",
        current: false,
      },
      {
        version: "v1.5",
        date: "6 months ago",
        author: "Compliance Team",
        change:
          "Updated international shipment compliance procedures.",
        current: false,
      },
    ],
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

    requirementItems: [
      {
        code: "CL-SAF-002-R01",
        title: "Cargo Risk Assessment",
        description:
          "Applicable cargo operations must undergo risk assessment before activities commence.",
        category: "Safety",
        owner: "Safety",
        evidence: "Risk assessment",
        status: "Active",
      },
      {
        code: "CL-SAF-002-R02",
        title: "Safe Handling Procedures",
        description:
          "Cargo must be handled according to approved safety procedures appropriate to the cargo type and operation.",
        category: "Safety",
        owner: "Safety",
        evidence: "Safety checklist",
        status: "Active",
      },
      {
        code: "CL-SAF-002-R03",
        title: "Incident Escalation",
        description:
          "Safety incidents and significant operational hazards must be recorded and escalated according to defined procedures.",
        category: "Safety",
        owner: "Safety",
        evidence: "Incident report",
        status: "Active",
      },
    ],

    evidenceRequirements: [
      {
        requirement: "CL-SAF-002-R01",
        name: "Cargo Risk Assessment",
        type: "Report",
        status: "Required",
      },
      {
        requirement: "CL-SAF-002-R02",
        name: "Safety Handling Checklist",
        type: "Checklist",
        status: "Required",
      },
      {
        requirement: "CL-SAF-002-R03",
        name: "Incident Report",
        type: "Report",
        status: "Conditional",
      },
    ],

    versionHistory: [
      {
        version: "v3.0",
        date: "3 days ago",
        author: "Safety Team",
        change:
          "Introduced updated cargo risk assessment and incident escalation controls.",
        current: true,
      },
      {
        version: "v2.4",
        date: "5 months ago",
        author: "Safety Team",
        change:
          "Expanded safe cargo handling requirements.",
        current: false,
      },
      {
        version: "v2.0",
        date: "1 year ago",
        author: "Safety Team",
        change:
          "Major revision of cargo safety and risk management framework.",
        current: false,
      },
    ],
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

    requirementItems: [
      {
        code: "CL-DOC-003-R01",
        title: "Document Creation",
        description:
          "Operational documents must be created using approved formats and contain the required information.",
        category: "Documentation",
        owner: "Documentation",
        evidence: "Controlled document",
        status: "Active",
      },
      {
        code: "CL-DOC-003-R02",
        title: "Document Verification",
        description:
          "Documents must be reviewed and verified before being used as operational records.",
        category: "Documentation",
        owner: "Documentation",
        evidence: "Verification record",
        status: "Active",
      },
      {
        code: "CL-DOC-003-R03",
        title: "Document Retention",
        description:
          "Operational records must be stored securely and retained according to applicable retention requirements.",
        category: "Documentation",
        owner: "Documentation",
        evidence: "Document retention record",
        status: "Active",
      },
    ],

    evidenceRequirements: [
      {
        requirement: "CL-DOC-003-R01",
        name: "Controlled Document",
        type: "Document",
        status: "Required",
      },
      {
        requirement: "CL-DOC-003-R02",
        name: "Document Verification Record",
        type: "Record",
        status: "Required",
      },
      {
        requirement: "CL-DOC-003-R03",
        name: "Document Retention Record",
        type: "Log",
        status: "Required",
      },
    ],

    versionHistory: [
      {
        version: "v1.5",
        date: "5 days ago",
        author: "Documentation Team",
        change:
          "Updated document verification and retention controls.",
        current: true,
      },
      {
        version: "v1.4",
        date: "4 months ago",
        author: "Documentation Team",
        change:
          "Improved operational document control procedures.",
        current: false,
      },
    ],
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

    requirementItems: [
      {
        code: "CL-SEC-001-R01",
        title: "Access Control",
        description:
          "Access to cargo areas and operational systems must be restricted to authorized personnel.",
        category: "Security",
        owner: "Security",
        evidence: "Access control record",
        status: "Active",
      },
      {
        code: "CL-SEC-001-R02",
        title: "Cargo Security Inspection",
        description:
          "Cargo must undergo applicable security inspection before release or onward movement.",
        category: "Security",
        owner: "Security",
        evidence: "Security inspection record",
        status: "Active",
      },
      {
        code: "CL-SEC-001-R03",
        title: "Security Incident Reporting",
        description:
          "Security incidents must be recorded, escalated, and reviewed by authorized personnel.",
        category: "Security",
        owner: "Security",
        evidence: "Security incident report",
        status: "Active",
      },
    ],

    evidenceRequirements: [
      {
        requirement: "CL-SEC-001-R01",
        name: "Access Control Record",
        type: "Log",
        status: "Required",
      },
      {
        requirement: "CL-SEC-001-R02",
        name: "Security Inspection Record",
        type: "Record",
        status: "Required",
      },
      {
        requirement: "CL-SEC-001-R03",
        name: "Security Incident Report",
        type: "Report",
        status: "Conditional",
      },
    ],

    versionHistory: [
      {
        version: "v2.0",
        date: "1 week ago",
        author: "Security Team",
        change:
          "Updated cargo security and authorized access requirements.",
        current: true,
      },
      {
        version: "v1.6",
        date: "7 months ago",
        author: "Security Team",
        change:
          "Expanded security inspection and incident reporting controls.",
        current: false,
      },
    ],
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

    requirementItems: [
      {
        code: "CL-OPS-006-R01",
        title: "Receiving Verification",
        description:
          "Incoming cargo must be checked against shipment documentation before acceptance.",
        category: "Operations",
        owner: "Operations",
        evidence: "Receiving checklist",
        status: "Draft",
      },
      {
        code: "CL-OPS-006-R02",
        title: "Cargo Inspection",
        description:
          "Incoming cargo must be inspected for quantity, condition, and identifying information.",
        category: "Safety",
        owner: "Operations",
        evidence: "Cargo inspection record",
        status: "Draft",
      },
    ],

    evidenceRequirements: [
      {
        requirement: "CL-OPS-006-R01",
        name: "Receiving Checklist",
        type: "Checklist",
        status: "Required",
      },
      {
        requirement: "CL-OPS-006-R02",
        name: "Cargo Inspection Record",
        type: "Record",
        status: "Required",
      },
    ],

    versionHistory: [
      {
        version: "v0.9",
        date: "1 week ago",
        author: "Operations Team",
        change:
          "Draft updated with warehouse receiving and inspection controls.",
        current: true,
      },
    ],
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

    requirementItems: [
      {
        code: "CL-CMP-007-R01",
        title: "Regulatory Review",
        description:
          "Operational activities must be periodically reviewed against applicable regulatory requirements.",
        category: "Compliance",
        owner: "Compliance",
        evidence: "Regulatory review report",
        status: "Active",
      },
      {
        code: "CL-CMP-007-R02",
        title: "Compliance Findings",
        description:
          "Identified compliance findings must be documented and assigned for corrective action.",
        category: "Compliance",
        owner: "Compliance",
        evidence: "Compliance findings record",
        status: "Active",
      },
      {
        code: "CL-CMP-007-R03",
        title: "Corrective Action Tracking",
        description:
          "Corrective actions resulting from compliance reviews must be tracked through closure.",
        category: "Compliance",
        owner: "Compliance",
        evidence: "Corrective action record",
        status: "Active",
      },
    ],

    evidenceRequirements: [
      {
        requirement: "CL-CMP-007-R01",
        name: "Regulatory Review Report",
        type: "Report",
        status: "Required",
      },
      {
        requirement: "CL-CMP-007-R02",
        name: "Compliance Findings Record",
        type: "Record",
        status: "Required",
      },
      {
        requirement: "CL-CMP-007-R03",
        name: "Corrective Action Record",
        type: "Log",
        status: "Required",
      },
    ],

    versionHistory: [
      {
        version: "v2.3",
        date: "2 weeks ago",
        author: "Compliance Team",
        change:
          "Updated regulatory review and corrective action tracking framework.",
        current: true,
      },
      {
        version: "v2.1",
        date: "6 months ago",
        author: "Compliance Team",
        change:
          "Expanded compliance findings and review requirements.",
        current: false,
      },
    ],
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

    requirementItems: [
      {
        code: "CL-SAF-008-R01",
        title: "Incident Identification",
        description:
          "Cargo incidents must be identified and recorded as soon as reasonably practicable.",
        category: "Safety",
        owner: "Safety",
        evidence: "Incident record",
        status: "Archived",
      },
      {
        code: "CL-SAF-008-R02",
        title: "Incident Escalation",
        description:
          "Significant cargo incidents must be escalated to the responsible management team.",
        category: "Safety",
        owner: "Safety",
        evidence: "Incident escalation record",
        status: "Archived",
      },
      {
        code: "CL-SAF-008-R03",
        title: "Incident Review",
        description:
          "Recorded incidents must be reviewed to identify causes, impacts, and required corrective action.",
        category: "Safety",
        owner: "Safety",
        evidence: "Incident review report",
        status: "Archived",
      },
    ],

    evidenceRequirements: [
      {
        requirement: "CL-SAF-008-R01",
        name: "Incident Record",
        type: "Record",
        status: "Required",
      },
      {
        requirement: "CL-SAF-008-R02",
        name: "Incident Escalation Record",
        type: "Report",
        status: "Conditional",
      },
      {
        requirement: "CL-SAF-008-R03",
        name: "Incident Review Report",
        type: "Report",
        status: "Required",
      },
    ],

    versionHistory: [
      {
        version: "v1.2",
        date: "1 month ago",
        author: "Safety Team",
        change:
          "Archived following replacement by the updated cargo incident management framework.",
        current: true,
      },
      {
        version: "v1.1",
        date: "8 months ago",
        author: "Safety Team",
        change:
          "Updated incident identification and escalation procedures.",
        current: false,
      },
    ],
  },
];