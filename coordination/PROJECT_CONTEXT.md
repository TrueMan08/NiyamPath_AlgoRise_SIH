# NiyamPath — Master Project Context Specification

> **Notice to AI Coding Agents:** This file is the primary context anchor for NiyamPath. Every new coding agent joining the project must read this document in full before creating or editing files.

---

## 1. Project Identity & Metadata

- **Product Name:** NiyamPath
- **Product Description:** AI-Assisted Regulatory Workflow Automation and Compliance Management Platform
- **Tagline:** *Every Process. Every Requirement. On Track.*
- **Hackathon:** Smart India Hackathon 2026
- **Problem Statement ID:** 26262
- **Problem Statement Title:** Integrated AICTE Approval Workflow Automation, Compliance Monitoring and Alert Management System
- **Organisation:** All India Council for Technical Education (AICTE) — Regulation Bureau
- **Category:** Software
- **Theme:** Smart Automation
- **Team Name:** AlgoRise
- **Master PRD Reference:** [NiyamPath PRD v3](file:///Users/vedkumarsingh/NiyamPATH/docs/product/NiyamPath_Comprehensive_Team_PRD_v3.docx)

---

## 2. Core Problem Analysis & Objectives

AICTE governs thousands of technical education institutions across India. Approval applications, post-approval conditions, and periodic compliances currently involve disparate systems, manual file coordination, and time-consuming scrutiny.

### Problem Areas Solved:
1. **Application Lifecycle Management:** Tracking applications across submission, initial scrutiny, deficiency issuance, institutional resubmission, EVC inspections, and final regulatory determinations without blind spots or lost files.
2. **Workflow Fragmentation:** Different application categories follow distinct processing routes (e.g. Scrutiny Only, Scrutiny + EVC, EVC + SAC/SHC). Rigid, hardcoded workflows cause operational errors. NiyamPath introduces a configurable workflow engine.
3. **Scrutiny & Deficiency Management:** Documenting specific scrutiny observations, linking them to exact requirements/documents, notifying institutions, receiving corrected submissions, and tracking multi-cycle deficiency resolution.
4. **EVC & Inspection Management:** Scheduling Expert Visit Committees, preventing scheduling conflicts, tracking inspection reports, and flagging inspection pendency.
5. **Post-Approval Compliance:** Tracking institutional undertakings and conditional approvals with explicit due dates, evidence submissions, and officer verification.
6. **Document Validity & Expiry:** Managing validity periods for lease deeds, land titles, and safety certificates with automated renewal alerts.
7. **Notification & Escalation:** In-app reminders and automated escalations to senior officials when SLAs or statutory deadlines are breached.
8. **Monitoring & Accountability:** Real-time dashboards showing pendency ageing, stage distribution, and regional workloads derived directly from authoritative records.

---

## 3. Product Architecture: The Two-Layer Model

NiyamPath is structured into two tightly integrated layers:

### Layer 1: Core Regulatory Workflow Platform
1. **Application Management:** Submission, detail views, institutional metadata, and lifecycle statuses.
2. **Workflow Management:** Configurable state machine supporting multi-stage transitions (Scrutiny, EVC, SAC/SHC) and audit logging.
3. **Dashboard & Pendency Monitoring:** Role-specific KPIs, pendency ageing, and workload distribution.
4. **EVC Management:** Inspection scheduling, committee formation, and report status tracking.
5. **Compliance Management:** Conditional undertakings, deadline monitoring, and evidence verification.
6. **Document Management:** Centralized repository, validity tracking, renewal requests, and version history.
7. **Notifications & Escalations:** Event-driven in-app notifications and SLA breach escalations.
8. **Reports & Analytics:** Stage-wise workload summaries, regional breakdowns, and pendency metrics.
9. **Audit Trail:** Immutable, actor-attributed logging of every transition, document change, and AI review.
10. **Role-Based Access Control (RBAC):** Strict backend enforcement across 5 distinct personas.

### Layer 2: AI Intelligence Layer
1. **AI Document Intelligence:** PDF text extraction, OCR, document type classification, metadata extraction, missing mandatory field detection, and cross-document discrepancy detection.
2. **AI-Assisted Application Scrutiny:** Checklist verification, deficiency drafting, and evidence-grounded preliminary scrutiny notes.
3. **AI Compliance Assistant:** Automated gap analysis of institutional compliance, identifying missing evidence and recommending next actions.
4. **AI Regulatory Knowledge Assistant (RAG):** Natural-language Q&A grounded in official AICTE regulations with source citations (chapter/section/page).
5. **AI Application Summarisation:** Concise synopses of application journeys, deficiency cycles, and inspection outcomes.
6. **AI-Generated Draft Reports:** Provisional deficiency notices and scrutiny summaries formatted for one-click officer editing and sign-off.
7. **Predictive Pendency & Bottleneck Insights:** Descriptive analytics and workflow bottleneck detection to flag at-risk applications.

---

## 4. User Personas & Role Boundaries

| Persona | Primary Responsibilities | Permitted Actions | Restricted Actions |
|---|---|---|---|
| **Institution User** | Prepares applications, uploads documents, tracks compliance | Create application, upload documents, respond to deficiencies, submit compliance evidence | Cannot scrutinize, approve, schedule EVC, or verify compliance |
| **Central / Bureau Officer** | Reviews applications, conducts scrutiny, issues deficiencies | Scrutinize documents, issue official deficiencies, review AI scrutiny drafts, forward application, verify compliance | Cannot access unauthorized regional queues |
| **Regional Officer** | Oversees regional workload, monitors inspections & compliance | View regional dashboards, assign EVC committees, track regional pendency | Cannot make central policy overrides |
| **EVC Member** | Conducts physical/virtual institutional inspections | View assigned inspection details, submit inspection findings/reports | Cannot issue deficiencies or alter workflow routes |
| **Platform Administrator** | System governance, master data, configuration | Manage users, edit workflow templates, view system-wide audit logs and analytics | Cannot submit applications as an institution |

---

## 5. Technology Stack & Workstream Boundaries

```
                    [ React 18 Frontend ] (Workstream A)
                              │
                              │ REST / JSON (Authoritative API)
                              ▼
            [ Spring Boot 3 Core Backend ] (Workstream B) ──► [ PostgreSQL ]
                              │
                              │ Authorised Context Only
                              ▼
            [ FastAPI AI Intelligence Service ]
              ├── Document Intelligence (Workstream C)
              └── Knowledge Intelligence & RAG (Workstream D)
```

- **Workstream A (Frontend):** React 18, Vite, JavaScript, Tailwind CSS, React Router, Lucide React, Recharts. (Owns `/frontend`).
- **Workstream B (Core Backend):** Java 17/21, Spring Boot 3.3.x, Spring Data JPA, Spring Security, PostgreSQL, Flyway. (Owns `/backend`).
- **Workstream C (AI Document Intelligence):** Python 3.11+, FastAPI, PyMuPDF, pdfplumber, Tesseract OCR. (Owns `/ai-service/app/document_intelligence`).
- **Workstream D (AI Knowledge & Insights):** Python 3.11+, FastAPI, Gemini API / Embeddings, ChromaDB, RAG pipeline. (Owns `/ai-service/app/knowledge_intelligence`).

---

## 6. Strict AI Safety & Governance Principles

1. **Human-in-the-Loop Imperative:** AI is purely assistive. It **never** approves an application, rejects an application, issues a statutory deficiency, or marks a compliance item verified.
2. **Provisional UI Representation:** All AI-generated outputs (extracted metadata, scrutiny drafts, discrepancy flags) must be visibly tagged as **"Draft / AI Suggestion"** and require an authorized officer's explicit review and action.
3. **No Direct Database Mutation:** The AI service has no direct database access. Context is passed from the Spring Boot backend, and AI responses are persisted through the backend with audit attribution.
4. **Grounded Knowledge Retrieval:** The Knowledge Assistant must cite exact regulatory sources. When information is not present in the ingested knowledge base, the model must explicitly state that the answer is unavailable rather than hallucinating.

---

## 7. Assumptions & Unresolved Questions

1. **SAC and SHC Expansions:** The problem statement references workflow routes containing "SAC/SHC". Do not invent speculative acronym expansions. The workflow engine treats these as configurable review stages.
2. **Approval Process Handbook (APH) Alignment:** Regulatory requirements and checklists are modeled after AICTE APH 2024-2027 standards but remain configurable via database templates.
3. **Simulation vs Live Services:** During prototype execution, simulated AI processing and mock document repositories are clearly labeled to prevent false claims during demonstrations.

