# NiyamPath — Project Task Board

> **Board Status:** Active  
> **Team:** AlgoRise | **Project:** NiyamPath (SIH 2026, PS 26262)  
> **Note:** Tasks are assigned by workstream (A: Frontend, B: Backend, C: AI Document Intelligence, D: AI Knowledge/Insights, PM: Architecture/Coordination). Individual developers will claim tasks upon allocation.

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

## 2. Phase 0: Foundation & Governance (Current Phase)

| Task ID | Workstream | Priority | Task Title | Status | Dependencies | Deliverable |
|---|---|---|---|---|---|---|
| **TASK-001** | PM / Arch | P0 | Repository Structure & Coordination System Initialization | **Completed** | None | Clean monorepo, coordination docs, handoff template, HL-001 |
| **TASK-002** | PM / Arch | P0 | Master Project Context & PRD Preservation | **Completed** | TASK-001 | `PROJECT_CONTEXT.md`, PRD v3 preservation in `docs/product/` |
| **TASK-003** | PM / Arch | P0 | Core Architecture Specifications Authoring | **Completed** | TASK-001 | 5 architecture documents in `docs/architecture/` |
| **TASK-004** | PM / Arch | P0 | API Contracts Definition & Governance Setup | **In Review** | TASK-001 | `API_CONTRACTS.md` with request/response schemas |
| **TASK-005** | PM / Arch | P0 | Relational Database Schema Design & Migration Strategy | **In Review** | TASK-001 | `DATABASE_SCHEMA.md` with 20 entities & enums |

---

## 3. Phase 1: Foundations & Scaffolding (Upcoming)

### Workstream A: Frontend & User Experience
| Task ID | Priority | Task Title | Status | Dependencies | Deliverable |
|---|---|---|---|---|---|
| **TASK-A01** | P1 | React App Shell, Vite Config & Tailwind Theme Setup | Not Started | TASK-001 | Working dev server, custom branding, color palette, responsive container |
| **TASK-A02** | P1 | Role Switcher & Application Layout Hierarchy | Not Started | TASK-A01 | Header, Sidebar, Role Context switcher (Institution, Central, Regional, EVC, Admin) |
| **TASK-A03** | P1 | Mock Data Layer & LocalStorage State Adapter | Not Started | TASK-A02 | Pre-populated demo state mirroring backend contracts for offline execution |
| **TASK-A04** | P1 | Application Management & Workflow Stepper UI | Not Started | TASK-A03 | Application list, search/filter, detail view, visual stage stepper |
| **TASK-A05** | P2 | Deficiency Management & Resubmission Interface | Not Started | TASK-A04 | Scrutiny observation drawer, deficiency notice, institution upload modal |
| **TASK-A06** | P2 | EVC Queue & Inspection Scheduling Interface | Not Started | TASK-A04 | EVC pending list, committee assignment modal, schedule calendar |
| **TASK-A07** | P2 | Compliance Management & Undertaking Verification UI | Not Started | TASK-A03 | Undertaking list, deadline badges, evidence submission, officer verification |
| **TASK-A08** | P2 | Document Repository & Expiry Badges UI | Not Started | TASK-A03 | Document table, validity status badges (valid, expiring, expired), renewal flow |
| **TASK-A09** | P2 | Notification Center & SLA Escalation UI | Not Started | TASK-A03 | Notification bell, filterable drawer, simulated escalation trigger |
| **TASK-A10** | P2 | AI Review Pane (Document Findings & Regulatory Q&A) | Not Started | TASK-A04 | AI Scrutiny review card, suggested deficiencies, Regulatory Assistant chat drawer |

### Workstream B: Core Backend & Data
| Task ID | Priority | Task Title | Status | Dependencies | Deliverable |
|---|---|---|---|---|---|
| **TASK-B01** | P1 | Spring Boot 3 Baseline Application & Config Setup | Not Started | TASK-001 | Executable Spring Boot service on port 8080 with Actuator & OpenAPI |
| **TASK-B02** | P1 | Flyway Baseline Schema Migration (V1__init_schema.sql) | Not Started | TASK-005 | PostgreSQL DDL script creating all 20 relational tables, indexes, enums |
| **TASK-B03** | P1 | JPA Entities, Enums & Base Auditable Entity Setup | Not Started | TASK-B02 | Java entity classes in `org.algorise.niyampath.*` |
| **TASK-B04** | P1 | Spring Security & Mock/JWT Authentication Filter | Not Started | TASK-B03 | RBAC role checks, user authentication endpoints, security context |
| **TASK-B05** | P1 | Application CRUD & Configurable Workflow Engine | Not Started | TASK-B03 | Stage transition validation, deficiency cycle tracking, history recording |
| **TASK-B06** | P2 | EVC Management & Inspection Scheduling Endpoints | Not Started | TASK-B05 | Committee assignment, schedule persistence, inspection status updates |
| **TASK-B07** | P2 | Compliance & Undertaking Tracking Endpoints | Not Started | TASK-B05 | Compliance requirement tracking, evidence submission, verification logic |
| **TASK-B08** | P2 | Document Metadata & Expiry Calculation Service | Not Started | TASK-B03 | Document registration, expiration calculation, renewal queue |
| **TASK-B09** | P2 | Event-Driven Notification & Escalation Service | Not Started | TASK-B05 | Notification dispatch on stage change/deficiency, SLA breach escalation |
| **TASK-B10** | P2 | AI Service Client Gateway & Audit Record Logging | Not Started | TASK-B03 | Outbound HTTP client to FastAPI AI service, AI analysis persistence |

### Workstream C: AI Document Intelligence
| Task ID | Priority | Task Title | Status | Dependencies | Deliverable |
|---|---|---|---|---|---|
| **TASK-C01** | P1 | FastAPI Scaffolding, Health Check & Pydantic Schemas | Not Started | TASK-001 | FastAPI app on port 8000, OpenAPI docs, request/response models |
| **TASK-C02** | P1 | PDF Parsing & Local OCR Extraction Pipeline | Not Started | TASK-C01 | PyMuPDF text parser with Tesseract fallback for scanned documents |
| **TASK-C03** | P2 | Document Type Classification & Metadata Extractor | Not Started | TASK-C02 | Classifier for lease deeds, land titles, safety certificates, undertakings |
| **TASK-C04** | P2 | AICTE Checklist Validation & Missing-Field Detection | Not Started | TASK-C03 | Automated verification against mandatory checklist items |
| **TASK-C05** | P2 | Cross-Document Discrepancy Detection Engine | Not Started | TASK-C03 | Discrepancy detector comparing institution name, address, survey numbers |
| **TASK-C06** | P2 | Draft Scrutiny Report & Deficiency Suggestion Generator | Not Started | TASK-C04 | Evidence-cited preliminary deficiency draft generator for officer review |

### Workstream D: AI Knowledge & Insights
| Task ID | Priority | Task Title | Status | Dependencies | Deliverable |
|---|---|---|---|---|---|
| **TASK-D01** | P1 | Regulatory Document Ingestion & Legal Chunker | Not Started | TASK-C01 | Markdown/PDF chunker preserving AICTE APH chapter, section, and page metadata |
| **TASK-D02** | P1 | Vector Store & Semantic Retrieval Pipeline | Not Started | TASK-D01 | ChromaDB / FAISS integration with dense embedding model |
| **TASK-D03** | P2 | Source-Grounded Regulatory Assistant (RAG) | Not Started | TASK-D02 | LLM prompt with strict citation constraints & unknown-query fallback |
| **TASK-D04** | P2 | Application Journey & Deficiency Summarizer | Not Started | TASK-C01 | Multi-step journey summarizer for officer review |
| **TASK-D05** | P2 | Compliance Gap Analysis & Recommendation Assistant | Not Started | TASK-C01 | Actionable next-step suggestions for institutional compliance |
| **TASK-D06** | P3 | Descriptive Pendency & Bottleneck Insights Engine | Not Started | TASK-C01 | Statistical workload ageing and stage duration analysis |

---

## 4. Phase 2: Integration & End-to-End Validation
| Task ID | Priority | Task Title | Status | Dependencies | Deliverable |
|---|---|---|---|---|---|
| **TASK-INT01** | P1 | Frontend-Backend API Gateway Integration | Not Started | TASK-A01, TASK-B01 | Working REST client communicating between React and Spring Boot |
| **TASK-INT02** | P1 | Backend-to-AI Service Context Integration | Not Started | TASK-B10, TASK-C01 | Secure data pass-through from Spring Boot to FastAPI with audit logging |
| **TASK-INT03** | P1 | End-to-End 10-Step Golden Demo Flow Verification | Not Started | All Phase 1 Tasks | Seamless demo: Submit -> Scrutiny -> Deficiency -> Resubmit -> EVC -> Compliance -> Expiry -> Escalation |
| **TASK-INT04** | P2 | Docker Compose Full-Stack Deployment Verification | Not Started | TASK-INT03 | One-command local startup via `docker-compose up` |

