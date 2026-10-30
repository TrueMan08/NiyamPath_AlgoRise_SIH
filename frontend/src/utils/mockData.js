// NiyamPath — Authoritative Mock Data for SIH 2026 Interactive Prototype
// Team AlgoRise | Problem Statement 26262 | Demonstration Data

export const DEMO_USERS = [
  {
    id: "USR-001",
    name: "Dr. Rajesh Sharma",
    role: "REGULATORY_OFFICER",
    roleLabel: "Central Scrutiny Officer",
    department: "AICTE Regulation Bureau, New Delhi",
    email: "officer.sharma@aicte.gov.in"
  },
  {
    id: "USR-002",
    name: "Prof. S. K. Gupta",
    role: "INSTITUTION_USER",
    roleLabel: "Institutional Head / Director",
    department: "Aryavart Institute of Technology, Greater Noida",
    email: "director@aryavart.ac.in"
  },
  {
    id: "USR-003",
    name: "Smt. Sunita Rao",
    role: "ADMINISTRATOR",
    roleLabel: "Bureau Administrator",
    department: "AICTE Approval & Automation Cell",
    email: "admin.approval@aicte.gov.in"
  }
];

export const WORKFLOW_ROUTES = [
  {
    id: "ROUTE-01",
    name: "Standard Extension of Approval (Scrutiny Only)",
    description: "Applicable for existing accredited institutions with no structural changes or intake increase.",
    stages: ["Submitted", "Document Verification", "Under Scrutiny", "Decision"]
  },
  {
    id: "ROUTE-02",
    name: "Comprehensive Route (Scrutiny + EVC)",
    description: "Mandatory for new institutions, introduction of new degree programs, or significant campus expansion.",
    stages: ["Submitted", "Document Verification", "Under Scrutiny", "Deficiency Resolution", "EVC Scheduled", "Compliance Review", "Final Decision"]
  },
  {
    id: "ROUTE-03",
    name: "Special Review Route (EVC + SAC/SHC)",
    description: "Appeals, disputed inspection observations, or special standing committee reviews.",
    stages: ["Submitted", "Initial Scrutiny", "EVC Inspection", "SAC/SHC Review", "Council Decision"]
  }
];

export const APPLICATIONS = [
  {
    id: "APP-2026-001",
    applicationNumber: "AICTE-2026-N-8841",
    institutionId: "INST-101",
    institutionName: "Aryavart Institute of Technology",
    region: "Northern Region (UP)",
    city: "Greater Noida",
    applicationType: "Extension of Approval (EOA)",
    academicYear: "2026-2027",
    workflowRoute: "Scrutiny + EVC",
    currentStage: "Under Scrutiny",
    status: "Deficiency Raised",
    statusSeverity: "amber",
    submissionDate: "2026-10-15",
    daysPending: 16,
    assignedOfficer: "Dr. Rajesh Sharma",
    intakeApplied: 480,
    courses: ["B.Tech Computer Science & Engg", "B.Tech Mechanical Engg", "B.Tech Electronics & Comm"],
    deficienciesCount: 1,
    undertakingsCount: 1,
    summary: "Application flagged during preliminary scrutiny due to expired Building Safety & Structural Fitness Certificate.",
    timeline: [
      { stage: "Submitted", date: "2026-10-15", actor: "Prof. S. K. Gupta", status: "completed", note: "Application fee and 6 prescribed documents uploaded." },
      { stage: "Document Verification", date: "2026-10-17", actor: "AI Document Scrutiny", status: "completed", note: "AI extracted fields and flagged certificate expiry on page 3." },
      { stage: "Under Scrutiny", date: "2026-10-18", actor: "Dr. Rajesh Sharma", status: "in-progress", note: "Officer verified deficiency and issued notice." },
      { stage: "EVC Scheduled", date: "Pending", actor: "Regional Office", status: "upcoming", note: "Awaiting deficiency resolution." },
      { stage: "Final Decision", date: "Pending", actor: "Regulation Bureau", status: "upcoming", note: "Approval Committee review." }
    ]
  },
  {
    id: "APP-2026-002",
    applicationNumber: "AICTE-2026-W-4219",
    institutionId: "INST-102",
    institutionName: "Deccan College of Engineering & Research",
    region: "Western Region (MH)",
    city: "Pune",
    applicationType: "Increase in Intake / New Division",
    academicYear: "2026-2027",
    workflowRoute: "Scrutiny + EVC",
    currentStage: "EVC Scheduled",
    status: "EVC Inspection Scheduled",
    statusSeverity: "blue",
    submissionDate: "2026-10-08",
    daysPending: 23,
    assignedOfficer: "Shri V. K. Deshmukh",
    intakeApplied: 660,
    courses: ["B.Tech Artificial Intelligence & DS", "B.Tech Information Technology"],
    deficienciesCount: 0,
    undertakingsCount: 2,
    summary: "Document scrutiny successfully completed. Expert Visit Committee scheduled for physical campus inspection.",
    timeline: [
      { stage: "Submitted", date: "2026-10-08", actor: "Dr. M. P. Joshi", status: "completed", note: "All documents submitted with self-attested land deed." },
      { stage: "Under Scrutiny", date: "2026-10-12", actor: "Shri V. K. Deshmukh", status: "completed", note: "Land area 12.4 acres verified against APH Mega City norms." },
      { stage: "EVC Scheduled", date: "2026-10-24", actor: "Regional Officer, Mumbai", status: "in-progress", note: "Physical visit scheduled for 2026-11-12." },
      { stage: "Final Decision", date: "Pending", actor: "Regulation Bureau", status: "upcoming", note: "Awaiting inspection report." }
    ]
  },
  {
    id: "APP-2026-003",
    applicationNumber: "AICTE-2026-S-7731",
    institutionId: "INST-103",
    institutionName: "Malabar Technical Institute",
    region: "Southern Region (KL)",
    city: "Kozhikode",
    applicationType: "Extension of Approval (EOA)",
    academicYear: "2026-2027",
    workflowRoute: "Scrutiny Only",
    currentStage: "Approved",
    status: "Approved with Conditions",
    statusSeverity: "green",
    submissionDate: "2026-09-28",
    daysPending: 0,
    assignedOfficer: "Dr. K. Narayanan",
    intakeApplied: 300,
    courses: ["B.Tech Civil Engg", "B.Tech Electrical & Electronics"],
    deficienciesCount: 0,
    undertakingsCount: 1,
    summary: "Approval granted subject to submission of upgraded barrier-free access ramp certificate within 45 days.",
    timeline: [
      { stage: "Submitted", date: "2026-09-28", actor: "Dr. Thomas Mathew", status: "completed", note: "Submitted on time." },
      { stage: "Under Scrutiny", date: "2026-10-02", actor: "Dr. K. Narayanan", status: "completed", note: "Zero document deficiencies." },
      { stage: "Final Decision", date: "2026-10-14", actor: "Approval Bureau", status: "completed", note: "Approved. Undertaking tracking active." }
    ]
  },
  {
    id: "APP-2026-004",
    applicationNumber: "AICTE-2026-E-1092",
    institutionId: "INST-104",
    institutionName: "Kalinga Institute of Polytechnic & Technology",
    region: "Eastern Region (OD)",
    city: "Bhubaneswar",
    applicationType: "New Technical Institution",
    academicYear: "2026-2027",
    workflowRoute: "EVC + SAC/SHC",
    currentStage: "Under Scrutiny",
    status: "Pending Scrutiny",
    statusSeverity: "slate",
    submissionDate: "2026-10-26",
    daysPending: 5,
    assignedOfficer: "Smt. Ananya Mohapatra",
    intakeApplied: 240,
    courses: ["Diploma Mechanical Engg", "Diploma Electrical Engg"],
    deficienciesCount: 0,
    undertakingsCount: 0,
    summary: "Fresh application for establishing polytechnic campus. Initial officer scrutiny in queue.",
    timeline: [
      { stage: "Submitted", date: "2026-10-26", actor: "Trustee Board", status: "completed", note: "Initial submission." },
      { stage: "Under Scrutiny", date: "2026-10-28", actor: "Smt. Ananya Mohapatra", status: "in-progress", note: "Document verification underway." }
    ]
  },
  {
    id: "APP-2026-005",
    applicationNumber: "AICTE-2026-C-9904",
    institutionId: "INST-105",
    institutionName: "Pragati Institute of Pharmacy & Bio-Tech",
    region: "Central Region (MP)",
    city: "Bhopal",
    applicationType: "Change of Site / Location",
    academicYear: "2026-2027",
    workflowRoute: "Scrutiny + EVC",
    currentStage: "Document Verification",
    status: "Deficiency Resubmitted",
    statusSeverity: "amber",
    submissionDate: "2026-10-11",
    daysPending: 20,
    assignedOfficer: "Dr. Rajesh Sharma",
    intakeApplied: 120,
    courses: ["B.Pharm", "M.Pharm Pharmaceutics"],
    deficienciesCount: 1,
    undertakingsCount: 1,
    summary: "Institution submitted revised land conversion certificate following initial deficiency notice.",
    timeline: [
      { stage: "Submitted", date: "2026-10-11", actor: "Dr. Alok Saxena", status: "completed", note: "Application submitted." },
      { stage: "Deficiency Notice", date: "2026-10-16", actor: "Dr. Rajesh Sharma", status: "completed", note: "Revenue authority land diversion order was missing." },
      { stage: "Resubmission", date: "2026-10-25", actor: "Institution User", status: "completed", note: "Uploaded DM certified diversion order." },
      { stage: "Re-Scrutiny", date: "2026-10-29", actor: "Dr. Rajesh Sharma", status: "in-progress", note: "Under re-verification." }
    ]
  }
];

export const DOCUMENTS = [
  {
    id: "DOC-901",
    applicationId: "APP-2026-001",
    applicationNumber: "AICTE-2026-N-8841",
    institutionName: "Aryavart Institute of Technology",
    category: "Land & Building Deeds",
    title: "Registered Campus Lease Deed (30 Years)",
    fileName: "registered_lease_deed_30yr.pdf",
    fileSize: "4.8 MB",
    issueDate: "2015-06-01",
    expiryDate: "2045-05-31",
    validityStatus: "VALID",
    verificationStatus: "VERIFIED",
    verifiedBy: "Dr. Rajesh Sharma",
    extractedData: {
      lessor: "Greater Noida Industrial Development Authority (GNIDA)",
      lessee: "Aryavart Educational Trust",
      landArea: "10.5 Acres",
      leasePeriodYears: 30,
      registrationNumber: "GNIDA/REG/2015/8819",
      encumbranceFree: true
    }
  },
  {
    id: "DOC-902",
    applicationId: "APP-2026-001",
    applicationNumber: "AICTE-2026-N-8841",
    institutionName: "Aryavart Institute of Technology",
    category: "Safety Certificates",
    title: "Structural Fitness & Building Safety Certificate",
    fileName: "structural_fitness_cert_2025.pdf",
    fileSize: "2.1 MB",
    issueDate: "2023-08-15",
    expiryDate: "2026-08-31",
    validityStatus: "EXPIRED",
    verificationStatus: "DEFICIENT",
    verifiedBy: "Dr. Rajesh Sharma",
    extractedData: {
      issuingAuthority: "Chartered Municipal Structural Engineer (Reg. No. UP/SE/442)",
      campusBlock: "Academic Blocks A, B and Central Workshop",
      validityPeriodYears: 3,
      inspectionDate: "2023-08-10",
      complianceStandard: "National Building Code 2016 Part 6",
      expiryDateCalculated: "2026-08-31 (Expired 60 days prior to scrutiny)"
    }
  },
  {
    id: "DOC-903",
    applicationId: "APP-2026-001",
    applicationNumber: "AICTE-2026-N-8841",
    institutionName: "Aryavart Institute of Technology",
    category: "Safety Certificates",
    title: "Fire Safety No-Objection Certificate (NOC)",
    fileName: "fire_safety_noc_up_fire.pdf",
    fileSize: "1.9 MB",
    issueDate: "2024-04-10",
    expiryDate: "2027-04-09",
    validityStatus: "VALID",
    verificationStatus: "VERIFIED",
    verifiedBy: "Dr. Rajesh Sharma",
    extractedData: {
      issuingAuthority: "Chief Fire Officer, Gautam Buddha Nagar",
      buildingHeightMeters: 14.8,
      sprinklerCoverage: "100% Academic & Lab Areas",
      refugeAreasAvailable: true
    }
  },
  {
    id: "DOC-904",
    applicationId: "APP-2026-002",
    applicationNumber: "AICTE-2026-W-4219",
    institutionName: "Deccan College of Engineering & Research",
    category: "Land & Building Deeds",
    title: "Freehold Land Ownership Title Deed",
    fileName: "pune_land_title_freehold.pdf",
    fileSize: "6.2 MB",
    issueDate: "2010-02-14",
    expiryDate: null,
    validityStatus: "PERPETUAL",
    verificationStatus: "VERIFIED",
    verifiedBy: "Shri V. K. Deshmukh",
    extractedData: {
      titleHolder: "Deccan Research & Education Society",
      landArea: "12.4 Acres",
      surveyNumbers: "Survey 142/1, 142/2, Taluka Haveli, Pune",
      zoning: "Institutional / Educational Zone"
    }
  },
  {
    id: "DOC-905",
    applicationId: "APP-2026-003",
    applicationNumber: "AICTE-2026-S-7731",
    institutionName: "Malabar Technical Institute",
    category: "Affidavits & Undertakings",
    title: "Barrier-Free Environment & Ramp Compliance Undertaking",
    fileName: "affidavit_ramp_barrier_free.pdf",
    fileSize: "1.2 MB",
    issueDate: "2026-09-25",
    expiryDate: "2026-11-20",
    validityStatus: "EXPIRING_SOON",
    verificationStatus: "UNDER_VERIFICATION",
    verifiedBy: "Pending Officer Verification",
    extractedData: {
      deponent: "Dr. Thomas Mathew (Principal)",
      targetCompletionDate: "2026-11-20",
      workProgressPercent: "85% complete",
      elevatorsInstalled: 2
    }
  }
];

export const DEFICIENCIES = [
  {
    id: "DEF-2026-001",
    applicationId: "APP-2026-001",
    applicationNumber: "AICTE-2026-N-8841",
    institutionName: "Aryavart Institute of Technology",
    category: "Expired Safety Certificate",
    severity: "HIGH",
    documentRef: "DOC-902 (Structural Fitness & Building Safety Certificate)",
    description: "The submitted Building Safety Certificate expired on 2026-08-31. An updated certificate issued by a registered municipal structural engineer in accordance with NBC 2016 is mandatory before EVC scheduling.",
    issuedBy: "Dr. Rajesh Sharma (Central Scrutiny Officer)",
    issuedDate: "2026-10-18",
    deadline: "2026-11-05",
    daysRemaining: 5,
    status: "OPEN",
    aiAssisted: true,
    aiObservationRef: "AI-SCRUTINY-8812"
  }
];

export const EVC_SCHEDULES = [
  {
    id: "EVC-2026-101",
    applicationId: "APP-2026-002",
    applicationNumber: "AICTE-2026-W-4219",
    institutionName: "Deccan College of Engineering & Research",
    region: "Western Region",
    city: "Pune",
    visitType: "Physical Campus Inspection",
    inspectionScope: "Verification of Computing Labs for AI/DS Program (60 Intake increase) and Faculty Cadre Ratio",
    scheduledDate: "2026-11-12",
    status: "SCHEDULED",
    committeeMembers: [
      { name: "Prof. Arvind Kulkarni", affiliation: "IIT Bombay (Computer Science Dept)", role: "Chairman" },
      { name: "Dr. Meenakshi Sundaram", affiliation: "COEP Technological University", role: "Expert Member" },
      { name: "Shri R. P. Patil", affiliation: "AICTE WRO Mumbai", role: "Convener" }
    ],
    reportStatus: "PENDING_VISIT",
    instructions: "Verify physical space allocation of 120 sq.m for AI lab, licensed software agreements, and barrier-free toilets."
  },
  {
    id: "EVC-2026-102",
    applicationId: "APP-2026-001",
    applicationNumber: "AICTE-2026-N-8841",
    institutionName: "Aryavart Institute of Technology",
    region: "Northern Region",
    city: "Greater Noida",
    visitType: "Physical Campus Inspection",
    inspectionScope: "Comprehensive Triennial Infrastructure & Workshop Audit",
    scheduledDate: "Tentative: 2026-11-20",
    status: "ON_HOLD",
    committeeMembers: [
      { name: "Prof. H. S. Rawat", affiliation: "IIT Roorkee", role: "Proposed Chairman" },
      { name: "Dr. P. N. Shukla", affiliation: "KNIT Sultanpur", role: "Expert Member" }
    ],
    reportStatus: "AWAITING_SCRUTINY_CLEARANCE",
    instructions: "Inspection slot provisionally reserved; visit will be officially confirmed upon resolution of DEF-2026-001."
  }
];

export const COMPLIANCE_ITEMS = [
  {
    id: "COMP-2026-001",
    institutionId: "INST-101",
    institutionName: "Aryavart Institute of Technology",
    applicationNumber: "AICTE-2026-N-8841",
    requirement: "Structural Safety & NBC 2016 Certificate Renewal",
    category: "Safety Undertaking",
    dueDate: "2026-11-05",
    status: "DUE_SOON",
    evidenceSubmitted: "No evidence uploaded yet",
    submissionDate: null,
    assignedOfficer: "Dr. Rajesh Sharma"
  },
  {
    id: "COMP-2026-002",
    institutionId: "INST-103",
    institutionName: "Malabar Technical Institute",
    applicationNumber: "AICTE-2026-S-7731",
    requirement: "Completion of Barrier-Free Access Ramps & Lift Installation",
    category: "Infrastructure Condition",
    dueDate: "2026-11-20",
    status: "AWAITING_VERIFICATION",
    evidenceSubmitted: "Architect completion letter & geotagged photos uploaded",
    submissionDate: "2026-10-24",
    assignedOfficer: "Dr. K. Narayanan"
  },
  {
    id: "COMP-2026-003",
    institutionId: "INST-102",
    institutionName: "Deccan College of Engineering & Research",
    applicationNumber: "AICTE-2026-W-4219",
    requirement: "Faculty Appointment Ratification (AI/DS Division)",
    category: "Cadre Ratio Compliance",
    dueDate: "2026-12-15",
    status: "UPCOMING",
    evidenceSubmitted: "Selection committee minutes pending university approval",
    submissionDate: null,
    assignedOfficer: "Shri V. K. Deshmukh"
  }
];

export const NOTIFICATIONS = [
  {
    id: "NOTIF-01",
    title: "Deficiency Notice Issued",
    message: "Application AICTE-2026-N-8841 flagged for expired Structural Fitness Certificate. Resolution due in 5 days.",
    category: "DEFICIENCY",
    priority: "HIGH",
    timestamp: "2026-10-18T14:30:00Z",
    read: false,
    link: "/applications/APP-2026-001"
  },
  {
    id: "NOTIF-02",
    title: "EVC Inspection Scheduled",
    message: "Physical visit scheduled for Deccan College of Engg (AICTE-2026-W-4219) on 2026-11-12.",
    category: "EVC",
    priority: "MEDIUM",
    timestamp: "2026-10-24T10:15:00Z",
    read: true,
    link: "/evc"
  },
  {
    id: "NOTIF-03",
    title: "Compliance Evidence Submitted",
    message: "Malabar Technical Institute uploaded geotagged verification photos for ramp undertaking.",
    category: "COMPLIANCE",
    priority: "MEDIUM",
    timestamp: "2026-10-24T16:45:00Z",
    read: false,
    link: "/compliance"
  },
  {
    id: "NOTIF-04",
    title: "SLA Warning — Application Ageing",
    message: "Application AICTE-2026-W-4219 has been in EVC preparation stage for 14 days.",
    category: "ESCALATION",
    priority: "HIGH",
    timestamp: "2026-10-28T09:00:00Z",
    read: false,
    link: "/workflow"
  }
];

export const ANALYTICS_DATA = {
  stageDistribution: [
    { name: "Submission", count: 42, color: "#64748b" },
    { name: "Document Verification", count: 35, color: "#0ea5e9" },
    { name: "Under Scrutiny", count: 78, color: "#2563eb" },
    { name: "Deficiency Raised", count: 29, color: "#f59e0b" },
    { name: "EVC Scheduled", count: 31, color: "#8b5cf6" },
    { name: "Compliance Review", count: 24, color: "#10b981" },
    { name: "Approved / Closed", count: 185, color: "#059669" }
  ],
  pendencyByRegion: [
    { region: "Northern", pending: 45, delayed: 8, cleared: 120 },
    { region: "Western", pending: 52, delayed: 11, cleared: 145 },
    { region: "Southern", pending: 38, delayed: 4, cleared: 160 },
    { region: "Eastern", pending: 28, delayed: 6, cleared: 85 },
    { region: "Central", pending: 31, delayed: 5, cleared: 90 }
  ],
  monthlySubmissions: [
    { month: "Jun", submissions: 65, cleared: 40 },
    { month: "Jul", submissions: 110, cleared: 85 },
    { month: "Aug", submissions: 195, cleared: 140 },
    { month: "Sep", submissions: 240, cleared: 190 },
    { month: "Oct", submissions: 175, cleared: 130 }
  ],
  complianceStatusBreakdown: [
    { status: "Completed / Verified", percentage: 68, color: "#10b981" },
    { status: "Under Officer Review", percentage: 14, color: "#0ea5e9" },
    { status: "Due Within 15 Days", percentage: 12, color: "#f59e0b" },
    { status: "Overdue", percentage: 6, color: "#ef4444" }
  ]
};

export const AI_ASSISTANT_KNOWLEDGE = [
  {
    query: "What documents are required for Extension of Approval (EOA)?",
    response: "For a standard Extension of Approval (EOA) without increase in intake, the institution must submit: (1) Self-disclosure affidavit affirming compliance with land, built-up area and faculty ratios, (2) Valid Fire Safety Certificate, (3) Structural Stability Certificate from a municipal certified engineer, (4) Approved building plans with occupancy certificate, and (5) Latest audited balance sheet.",
    citation: "AICTE Approval Process Handbook (APH 2024-2027), Chapter I, Clause 1.4 & Appendix 16."
  },
  {
    query: "What is the mandatory land requirement for an engineering college in a Mega/Metro city?",
    response: "Under AICTE APH Chapter I guidelines, the minimum land requirement for Technical Institutions offering Degree Engineering & Technology in Mega and Metro city categories is 1.5 Acres, provided the Floor Space Index (FSI) or Floor Area Ratio (FAR) conforms to the prevailing local municipal bylaws.",
    citation: "AICTE Approval Process Handbook (APH 2024-2027), Appendix 4: Land and Built-Up Area Norms, Table 4.1."
  },
  {
    query: "Summarize the deficiency identified for Aryavart Institute of Technology (AICTE-2026-N-8841).",
    response: "Application AICTE-2026-N-8841 has one active deficiency: Structural Fitness Certificate (DOC-902) expired on 2026-08-31. An updated certificate adhering to National Building Code 2016 Part 6 must be uploaded by the institution before 2026-11-05 for EVC scheduling clearance.",
    citation: "NiyamPath Scrutiny Ledger, Record Ref: DEF-2026-001 (Assisted by AI Document Scrutiny Engine)."
  },
  {
    query: "What are the rules regarding appointment of Expert Visit Committee (EVC)?",
    response: "An EVC typically comprises three members: an academician of Professor rank from an IIT/NIT/Central University acting as Chairman, an Expert Member from the relevant discipline, and an AICTE Regional Officer as Convener. Physical infrastructure, computing facilities, and faculty records are inspected against the self-disclosure application.",
    citation: "AICTE Approval Process Handbook (APH 2024-2027), Chapter II, Section 2.7: EVC Conduct and Inspection."
  }
];

export const AI_SCRUTINY_SAMPLE = {
  documentId: "DOC-902",
  documentTitle: "Structural Fitness & Building Safety Certificate",
  classifiedType: "BUILDING_SAFETY_CERTIFICATE",
  classificationConfidence: 0.98,
  pageCount: 3,
  extractedMetadata: [
    { field: "Institution Name", value: "Aryavart Institute of Technology", page: 1, match: true },
    { field: "Issuing Authority", value: "Registered Municipal Structural Engineer (UP/SE/442)", page: 1, match: true },
    { field: "Campus Blocks", value: "Academic Blocks A, B, and Central Workshop", page: 2, match: true },
    { field: "Issue Date", value: "15 August 2023", page: 1, match: true },
    { field: "Certificate Expiry Date", value: "31 August 2026", page: 3, match: false, warning: "Expired 60 days before submission date" },
    { field: "Governing Code", value: "National Building Code 2016 Part 6", page: 2, match: true }
  ],
  checklistFindings: [
    { check: "Document Type Recognized", passed: true, note: "Classified as structural stability certificate" },
    { check: "Institution Name Matches Application Form", passed: true, note: "Exact match: Aryavart Institute of Technology" },
    { check: "Authorized Registered Engineer Seal & Sign", passed: true, note: "Signature and seal identified on page 3" },
    { check: "Validity Period Current at Submission", passed: false, note: "CRITICAL: Certificate expired on 2026-08-31" }
  ],
  suggestedObservations: [
    {
      category: "DOCUMENT_EXPIRED",
      severity: "HIGH",
      text: "The Structural Fitness Certificate (DOC-902) expired on 31-Aug-2026 prior to the 2026-10-15 application submission date.",
      suggestedAction: "Issue 15-day deficiency notice requesting updated structural fitness certificate certified by registered municipal authority."
    }
  ]
};

