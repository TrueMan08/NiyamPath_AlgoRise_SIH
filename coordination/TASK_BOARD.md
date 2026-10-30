# NiyamPath — Project Task Board

> **Board Status:** Active  
> **Team:** AlgoRise | **Project:** NiyamPath (SIH 2026, PS 26262)  
> **Note:** Tasks are assigned by workstream (A: Frontend, B: Backend, C: AI Document Intelligence, D: AI Knowledge/Insights, PM: Architecture/Coordination).

---

## 1. Task Board Overview

| Status | Meaning |
|---|---|
| **Completed** | Deliverable built, verified, documented, and logged in `HANDOFF_LOG.md`. |
| **In Review** | Implementation or specification ready for teammate/lead review. |
| **In Progress** | Active development underway. |
| **Not Started** | Defined and ready to be picked up once prerequisites are met. |
| **Blocked** | Impeded by dependencies, missing credentials, or unapproved architectural decisions. |

---

## 2. Phase 0: Foundation & Governance (Completed)

| Task ID | Workstream | Priority | Task Title | Status | Deliverable |
|---|---|---|---|---|---|
| **TASK-001** | PM / Arch | P0 | Repository Structure & Coordination System Initialization | **Completed** | Clean monorepo, coordination docs, handoff template, HL-001 |
| **TASK-002** | PM / Arch | P0 | Master Project Context & PRD Preservation | **Completed** | `PROJECT_CONTEXT.md`, PRD v3 preservation in `docs/product/` |
| **TASK-003** | PM / Arch | P0 | Core Architecture Specifications Authoring | **Completed** | 5 architecture documents in `docs/architecture/` |
| **TASK-004** | PM / Arch | P0 | API Contracts Definition & Governance Setup | **Completed** | `API_CONTRACTS.md` with request/response schemas |
| **TASK-005** | PM / Arch | P0 | Relational Database Schema Design & Migration Strategy | **Completed** | `DATABASE_SCHEMA.md` with 20 entities & enums |

---

## 3. Phase 1: Presentation-Ready Prototype & Research Report (Completed)

### Workstream A: Frontend & User Experience
| Task ID | Priority | Task Title | Status | Deliverable |
|---|---|---|---|---|
| **TASK-A01** | P0 | React App Shell, Vite Config & Tailwind Theme Setup | **Completed** | Working dev server & production build, government enterprise theme |
| **TASK-A02** | P0 | Role Switcher & Application Layout Hierarchy | **Completed** | Header, Sidebar, Role Context switcher (Officer, Institution, Admin) |
| **TASK-A03** | P0 | Mock Data Layer & LocalStorage State Adapter | **Completed** | Rich demo dataset across all entities in `utils/mockData.js` |
| **TASK-A04** | P0 | Application Management & Workflow Stepper UI | **Completed** | Application list, search/filter, detail view, visual stage stepper |
| **TASK-A05** | P0 | Deficiency Management & Resubmission Interface | **Completed** | Scrutiny observation drawer, deficiency notice, resubmission tracking |
| **TASK-A06** | P0 | EVC Queue & Inspection Scheduling Interface | **Completed** | EVC pending list, committee assignment, inspection schedule modal |
| **TASK-A07** | P0 | Compliance Management & Undertaking Verification UI | **Completed** | Undertaking list, status filters, proof upload modal, officer verify |
| **TASK-A08** | P0 | Document Repository & Expiry Badges UI | **Completed** | Document grid, validity status badges (valid, expiring, expired) |
| **TASK-A09** | P0 | Notification Center & SLA Escalation UI | **Completed** | Notification cards, priority filters, simulated SLA escalation trigger |
| **TASK-A10** | P0 | AI Review Pane (Document Findings & Regulatory Q&A) | **Completed** | 3-pane AI Scrutiny desk, citation-grounded Regulatory Assistant drawer |
| **TASK-REP** | P0 | Standalone HTML Research Report (14 Sections) | **Completed** | `docs/NIYAMPATH_RESEARCH_REPORT.html` with print-to-PDF styles |

---

## 4. Phase 2: Core Backend & AI Service Implementation (Upcoming)

### Workstream B: Core Backend & Data
| Task ID | Priority | Task Title | Status | Dependencies | Deliverable |
|---|---|---|---|---|---|
| **TASK-B01** | P1 | Spring Boot 3 Baseline Application & Config Setup | Not Started | TASK-001 | Executable Spring Boot service on port 8080 with Actuator & OpenAPI |
| **TASK-B02** | P1 | Flyway Baseline Schema Migration (V1__init_schema.sql) | Not Started | TASK-005 | PostgreSQL DDL script creating all 20 relational tables, indexes, enums |
| **TASK-B03** | P1 | JPA Entities, Enums & Base Auditable Entity Setup | Not Started | TASK-B02 | Java entity classes in `org.algorise.niyampath.*` |
| **TASK-B04** | P1 | Spring Security & JWT Filter Setup | Not Started | TASK-B03 | RBAC role checks, user authentication endpoints, security context |
| **TASK-B05** | P1 | Application CRUD & Configurable Workflow Engine | Not Started | TASK-B03 | Stage transition validation, deficiency cycle tracking, history recording |

### Workstream C & D: AI Services
| Task ID | Priority | Task Title | Status | Dependencies | Deliverable |
|---|---|---|---|---|---|
| **TASK-C01** | P1 | FastAPI Scaffolding, Health Check & Pydantic Schemas | Not Started | TASK-001 | FastAPI app on port 8000, OpenAPI docs, request/response models |
| **TASK-C02** | P1 | PDF Parsing & Local OCR Extraction Pipeline | Not Started | TASK-C01 | PyMuPDF text parser with Tesseract fallback for scanned documents |
| **TASK-D01** | P1 | Regulatory Document Ingestion & Legal Chunker | Not Started | TASK-C01 | Markdown/PDF chunker preserving AICTE APH chapter, section, and page metadata |
| **TASK-D02** | P1 | Vector Store & Semantic Retrieval Pipeline | Not Started | TASK-D01 | ChromaDB integration with dense embedding model |
