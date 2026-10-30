# NiyamPath — Shared API Contract Governance

> **Status:** Initial Contract Baseline (In Review)  
> **Rule:** Frontend and Backend agents must adhere strictly to these schemas. Any change to field names, types, or paths must be documented here and recorded in `HANDOFF_LOG.md` before code modification.

---

## 1. Global Standards & Conventions

1. **Format:** JSON over HTTPS (`Content-Type: application/json`).
2. **Casing:** `camelCase` for JSON payload properties; `UPPER_SNAKE_CASE` for status enums.
3. **Date/Time Standard:** ISO-8601 strings (e.g. `2026-10-30T10:30:00Z`).
4. **Standard Response Envelope (Spring Boot):**
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "timestamp": "2026-10-30T10:30:00Z"
}
```
5. **Standard Error Envelope:**
```json
{
  "success": false,
  "errorCode": "RESOURCE_NOT_FOUND",
  "message": "Application with id APP-2026-001 not found",
  "details": [],
  "timestamp": "2026-10-30T10:30:00Z"
}
```

---

## 2. Core Backend Endpoints (Spring Boot — Port 8080)

### 2.1 `GET /api/applications`
- **Purpose:** Retrieve a paginated, filterable list of institutional applications.
- **Owning Service:** Core Backend
- **Auth & Role Required:** Authenticated (`INSTITUTION`, `CENTRAL_OFFICER`, `REGIONAL_OFFICER`, `ADMIN`)
  - *Institution users only see their own applications; Regional officers see applications in their region.*
- **Query Parameters:**
  - `status` (string, optional, e.g. `UNDER_SCRUTINY`)
  - `region` (string, optional, e.g. `NORTHERN`)
  - `stage` (string, optional, e.g. `SCRUTINY`)
  - `page` (int, default `0`), `size` (int, default `10`)
- **Authoritative Mutation:** No
- **Audit Event:** None (read-only)
- **Response Schema (`data`):**
```json
{
  "content": [
    {
      "id": "APP-2026-001",
      "applicationNumber": "AICTE-2026-N-8841",
      "institutionId": "INST-101",
      "institutionName": "Aryavart Institute of Technology",
      "region": "NORTHERN",
      "applicationType": "EXTENSION_OF_APPROVAL",
      "academicYear": "2026-2027",
      "currentStage": "SCRUTINY",
      "status": "UNDER_SCRUTINY",
      "submissionDate": "2026-10-15T09:30:00Z",
      "assignedOfficerId": "OFFICER-04",
      "assignedOfficerName": "Dr. Ramesh Verma",
      "deficiencyCycleCount": 0
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "page": 0,
  "size": 10
}
```

---

### 2.2 `GET /api/applications/{id}`
- **Purpose:** Retrieve complete details of a specific application, including institutional details, uploaded documents, workflow stage history, and active deficiencies.
- **Owning Service:** Core Backend
- **Auth & Role Required:** Authenticated (`INSTITUTION`, `CENTRAL_OFFICER`, `REGIONAL_OFFICER`, `ADMIN`)
- **Authoritative Mutation:** No
- **Audit Event:** None
- **Response Schema (`data`):**
```json
{
  "id": "APP-2026-001",
  "applicationNumber": "AICTE-2026-N-8841",
  "institution": {
    "id": "INST-101",
    "name": "Aryavart Institute of Technology",
    "address": "Sector 14, Institutional Area, Greater Noida, UP",
    "region": "NORTHERN",
    "establishedYear": 2012
  },
  "applicationType": "EXTENSION_OF_APPROVAL",
  "workflowRoute": "SCRUTINY_AND_EVC",
  "currentStage": "SCRUTINY",
  "status": "UNDER_SCRUTINY",
  "submissionDate": "2026-10-15T09:30:00Z",
  "assignedOfficer": {
    "id": "OFFICER-04",
    "name": "Dr. Ramesh Verma",
    "designation": "Central Scrutiny Officer"
  },
  "documents": [
    {
      "documentId": "DOC-901",
      "documentType": "LEASE_DEED",
      "title": "Registered Campus Lease Deed (30 Years)",
      "fileUrl": "/files/lease_deed_2026.pdf",
      "issueDate": "2015-06-01",
      "expiryDate": "2045-05-31",
      "verificationStatus": "PENDING_VERIFICATION",
      "extractedMetadata": {
        "institutionName": "Aryavart Institute of Technology",
        "landAreaAcres": 10.5,
        "validityYears": 30
      }
    }
  ],
  "timeline": [
    {
      "stage": "SUBMISSION",
      "status": "COMPLETED",
      "completedAt": "2026-10-15T09:30:00Z",
      "actorName": "Prof. S. K. Gupta"
    },
    {
      "stage": "SCRUTINY",
      "status": "IN_PROGRESS",
      "startedAt": "2026-10-16T11:00:00Z",
      "actorName": "Dr. Ramesh Verma"
    }
  ],
  "deficiencies": []
}
```

---

### 2.3 `POST /api/applications`
- **Purpose:** Create a draft institutional application.
- **Owning Service:** Core Backend
- **Auth & Role Required:** `INSTITUTION`
- **Request Body:**
```json
{
  "applicationType": "EXTENSION_OF_APPROVAL",
  "academicYear": "2026-2027",
  "institutionId": "INST-101",
  "programNames": ["Computer Science and Engineering", "Mechanical Engineering"],
  "workflowRouteTemplateId": "ROUTE-SCRUTINY-EVC"
}
```
- **Authoritative Mutation:** Yes (creates record in `application`)
- **Audit Event:** `APPLICATION_CREATED`

---

### 2.4 `POST /api/applications/{id}/submit`
- **Purpose:** Formally submit an institutional application for scrutiny.
- **Owning Service:** Core Backend
- **Auth & Role Required:** `INSTITUTION`
- **Validation Rules:** All mandatory documents for the application type must be present.
- **Authoritative Mutation:** Yes (changes status to `SUBMITTED`, advances stage to `SCRUTINY`)
- **Audit Event:** `APPLICATION_SUBMITTED`

---

### 2.5 `POST /api/applications/{id}/deficiencies`
- **Purpose:** Issue an official deficiency notice to the institution.
- **Owning Service:** Core Backend
- **Auth & Role Required:** `CENTRAL_OFFICER`
- **Request Body:**
```json
{
  "deficiencyCategory": "DOCUMENT_INCOMPLETE",
  "documentId": "DOC-901",
  "description": "Building safety certificate expired on 2026-08-31. Updated fire and structural fitness certificate required.",
  "deadline": "2026-11-15T23:59:59Z",
  "isAiAssisted": true,
  "aiAnalysisReferenceId": "AI-SCRUTINY-8812"
}
```
- **Authoritative Mutation:** Yes (`status` becomes `DEFICIENCY_RAISED`, deficiency cycle incremented)
- **Audit Event:** `DEFICIENCY_ISSUED`

---

### 2.6 `PATCH /api/applications/{id}/stage`
- **Purpose:** Manually or rule-forward an application to the next authorized stage.
- **Owning Service:** Core Backend
- **Auth & Role Required:** `CENTRAL_OFFICER`, `ADMIN`
- **Request Body:**
```json
{
  "targetStage": "EVC",
  "transitionRemarks": "Scrutiny completed successfully with zero open deficiencies. Forwarded for physical EVC inspection."
}
```
- **Authoritative Mutation:** Yes (`current_stage` updated, `workflow_history` created)
- **Audit Event:** `STAGE_TRANSITIONED`

---

### 2.7 `GET /api/compliance` & `POST /api/compliance/{id}/evidence`
- **GET Purpose:** Retrieve all institutional undertakings and post-approval compliance conditions.
- **POST Purpose:** Submit institutional evidence (files, statements) fulfilling an undertaking.
- **Authoritative Mutation:** Yes for POST (`status` moves from `UPCOMING` to `SUBMITTED` / `UNDER_VERIFICATION`)
- **Audit Event:** `COMPLIANCE_EVIDENCE_SUBMITTED`

---

### 2.8 `POST /api/evc/schedules`
- **Purpose:** Schedule an Expert Visit Committee inspection for an approved stage application.
- **Owning Service:** Core Backend
- **Auth & Role Required:** `REGIONAL_OFFICER`, `ADMIN`
- **Request Body:**
```json
{
  "applicationId": "APP-2026-001",
  "scheduledDate": "2026-11-20",
  "inspectionMode": "PHYSICAL",
  "committeeMemberIds": ["USR-EVC-01", "USR-EVC-02", "USR-EVC-03"],
  "instructions": "Verify computer lab infrastructure and barrier-free access ramps."
}
```
- **Authoritative Mutation:** Yes (creates `evc_schedule`, application status becomes `EVC_SCHEDULED`)
- **Audit Event:** `EVC_SCHEDULED`

---

## 3. AI Service Endpoints (Python FastAPI — Port 8000)

> **Important:** The frontend communicates with the backend, which proxies authorized AI requests. However, these endpoints can also be tested directly on Port 8000.

### 3.1 `POST /ai/documents/analyze`
- **Purpose:** Perform OCR, classify document type, extract key metadata, and validate required fields.
- **Owning Workstream:** Workstream C (Document Intelligence)
- **Request Schema:**
```json
{
  "documentId": "DOC-901",
  "documentTypeHint": "LEASE_DEED",
  "fileUrl": "http://localhost:8080/files/lease_deed_2026.pdf",
  "fileBase64": null
}
```
- **Response Schema:**
```json
{
  "documentId": "DOC-901",
  "classifiedType": "LEASE_DEED",
  "classificationConfidence": 0.96,
  "extractedFields": {
    "institutionName": {
      "value": "Aryavart Institute of Technology",
      "confidence": 0.98,
      "pageNumber": 1
    },
    "registeredDate": {
      "value": "2015-06-01",
      "confidence": 0.94,
      "pageNumber": 1
    },
    "expiryDate": {
      "value": "2045-05-31",
      "confidence": 0.91,
      "pageNumber": 2
    },
    "landAreaAcres": {
      "value": 10.5,
      "confidence": 0.89,
      "pageNumber": 3
    }
  },
  "checklistValidation": {
    "isComplete": true,
    "missingFields": [],
    "flags": [
      {
        "field": "expiryDate",
        "severity": "INFO",
        "message": "Lease deed is valid for 19 more years."
      }
    ]
  }
}
```

---

### 3.2 `POST /ai/scrutiny/generate`
- **Purpose:** Compare all submitted documents and application data against the mandated checklist to generate draft scrutiny observations for officer review.
- **Owning Workstream:** Workstream C (Document Intelligence)
- **Request Schema:**
```json
{
  "applicationId": "APP-2026-001",
  "applicationType": "EXTENSION_OF_APPROVAL",
  "submittedDocuments": [
    { "documentType": "LAND_TITLE", "documentId": "DOC-901", "status": "UPLOADED" },
    { "documentType": "BUILDING_SAFETY_CERTIFICATE", "documentId": "DOC-902", "status": "UPLOADED" }
  ]
}
```
- **Response Schema:**
```json
{
  "applicationId": "APP-2026-001",
  "preliminaryAssessment": "DEFICIENCIES_DETECTED",
  "draftObservations": [
    {
      "requirement": "Structural Fitness & Building Safety",
      "documentType": "BUILDING_SAFETY_CERTIFICATE",
      "finding": "The submitted certificate bears an expiry date of 2026-08-31, which is prior to the application date.",
      "suggestedDeficiencyCategory": "EXPIRED_DOCUMENT",
      "suggestedAction": "Upload valid renewal certificate issued by a certified municipal structural engineer."
    }
  ],
  "disclaimer": "This is a computer-assisted preliminary observation. An authorized AICTE officer must review, modify, or reject these findings before issuing any official deficiency."
}
```

---

### 3.3 `POST /ai/assistant/ask`
- **Purpose:** RAG-powered natural-language regulatory question answering grounded strictly in ingested AICTE guidelines.
- **Owning Workstream:** Workstream D (Knowledge Intelligence)
- **Request Schema:**
```json
{
  "question": "What is the mandatory land requirement for establishing a technical institution in a mega/metro city?",
  "conversationContext": []
}
```
- **Response Schema:**
```json
{
  "question": "What is the mandatory land requirement for establishing a technical institution in a mega/metro city?",
  "answer": "According to the AICTE Approval Process Handbook, the minimum land requirement for establishing a technical institution in a Mega/Metro city category is 1.5 acres for Engineering & Technology programs, subject to building FSI/FAR compliance.",
  "citations": [
    {
      "document": "AICTE Approval Process Handbook 2024-2027",
      "chapter": "Chapter I: Grant of Approval",
      "section": "Appendix 4: Land and Built-up Requirements",
      "page": 42
    }
  ],
  "confidenceScore": 0.94,
  "isAnswerable": true
}
```

---

### 3.4 `POST /ai/insights/pendency`
- **Purpose:** Analyze application stage durations and identify operational bottlenecks.
- **Owning Workstream:** Workstream D (Knowledge & Insights)
- **Response Schema:**
```json
{
  "averageScrutinyDays": 4.2,
  "averageEvcDays": 11.5,
  "bottleneckStages": [
    {
      "stage": "EVC",
      "pendingCount": 14,
      "averageWaitDays": 14.8,
      "riskLevel": "HIGH",
      "reason": "Expert committee availability constraints in Western Region."
    }
  ],
  "atRiskApplicationsCount": 5
}
```

