# NiyamPath — AI-Assisted Regulatory Workflow Automation & Compliance Management Platform

> **Smart India Hackathon 2026** | **Problem Statement ID:** 26262  
> **Organisation:** All India Council for Technical Education (AICTE) — Regulation Bureau  
> **Category:** Software | **Theme:** Smart Automation  
> **Team:** AlgoRise | **Tagline:** *Every Process. Every Requirement. On Track.*

---

## 1. Executive Overview

**NiyamPath** is an integrated regulatory workflow and institutional compliance management platform developed for the AICTE Regulation Bureau. The platform bridges the operational gaps across the institutional approval lifecycle, scrutiny workflows, Expert Visit Committee (EVC) scheduling, post-approval compliance tracking, document validity management, and intelligent escalation.

NiyamPath is architected across two cohesive layers:
1. **Core Regulatory Workflow Platform:** An authoritative, role-based workflow engine managing end-to-end application states, scrutiny cycles, deficiency handling, EVC inspections, compliance tracking, and tamper-evident audit trails.
2. **AI Intelligence Layer:** A purpose-driven assistive layer providing document metadata extraction, cross-document discrepancy detection, draft scrutiny observations, source-grounded regulatory retrieval (RAG), and descriptive pendency insights.

> [!IMPORTANT]
> **AI Governance Boundary:** The AI Intelligence Layer acts purely as an advisory and acceleration mechanism. AI outputs remain provisional drafts. The platform strictly prohibits AI from making statutory decisions, issuing legal deficiencies, or transitioning authoritative application states without explicit authorized officer review and approval.

---

## 2. System Architecture & Topology

The platform operates as a secure, decoupled monorepo structured into four specialized workstreams:

```
[ React 18 + Vite Frontend ]
             │
             │ HTTPS / REST (JSON API Contracts)
             ▼
[ Java Spring Boot 3 Core Backend ] ──(JDBC)──► [ PostgreSQL Database ]
             │                                   (Authoritative State & Audit)
             │ Internal Authorised Gateway Context
             ▼
[ Python FastAPI AI Intelligence Service ]
  ├── Workstream C: Document Intelligence (OCR, Extraction, Scrutiny)
  └── Workstream D: Knowledge Intelligence (RAG, Vector Search, Insights)
```

- **Frontend (`/frontend`):** Modern React application (Vite, Tailwind CSS, Lucide React, Recharts) providing role-tailored workspaces for Institutions, Central Officers, Regional Officers, EVC Members, and Platform Administrators.
- **Backend (`/backend`):** Authoritative Spring Boot service managing business logic, state machines, entity persistence, RBAC enforcement, audit logging, and the AI gateway.
- **AI Service (`/ai-service`):** Unified Python FastAPI engine hosting Document Intelligence and Knowledge Intelligence pipelines.
- **Database:** PostgreSQL schema managed via Flyway migrations. The backend is the sole entity with direct database access.

---

## 3. Monorepo Directory Structure

```
niyampath/
├── frontend/                     # Workstream A: React + Vite + Tailwind Web Application
│   ├── public/                   # Static assets, branding, and icons
│   ├── src/
│   │   ├── app/                  # Application routing and global providers
│   │   ├── assets/               # Local styles and images
│   │   ├── components/           # Reusable UI primitives (common) and structural layouts
│   │   ├── features/             # Domain feature modules (dashboard, applications, workflow, etc.)
│   │   │   └── ai/               # AI interaction interfaces (scrutiny review, assistant, insights)
│   │   ├── context/              # Global React contexts (Auth, Role, AppState)
│   │   ├── hooks/                # Custom React hooks
│   │   ├── services/             # API client services mapped to backend contracts
│   │   └── utils/                # Formatting, date calculations, and validation helpers
│   ├── package.json              # Frontend npm dependencies and scripts
│   └── README.md                 # Frontend development guide
│
├── backend/                      # Workstream B: Spring Boot 3 Core Backend Service
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/org/algorise/niyampath/
│   │   │   │   ├── config/       # Spring configurations (Cors, OpenAPI, Security)
│   │   │   │   ├── security/     # RBAC, JWT, and authentication boundaries
│   │   │   │   ├── common/       # Base entities, exceptions, and API response wrappers
│   │   │   │   ├── user/         # User and identity management
│   │   │   │   ├── institution/  # Educational institution profiles
│   │   │   │   ├── application/  # Approval application lifecycle
│   │   │   │   ├── workflow/     # Dynamic workflow engine and state transitions
│   │   │   │   ├── deficiency/   # Scrutiny deficiency cycles and resubmissions
│   │   │   │   ├── evc/          # Expert Visit Committee scheduling and tracking
│   │   │   │   ├── compliance/   # Post-approval compliance and undertakings
│   │   │   │   ├── document/     # Document metadata and validity tracking
│   │   │   │   ├── notification/ # In-app notification dispatcher
│   │   │   │   ├── escalation/   # SLA breach detection and escalation rules
│   │   │   │   ├── analytics/    # Dashboard metrics and pendency calculation
│   │   │   │   ├── audit/        # Immutable audit logging engine
│   │   │   │   └── ai/           # AI Service client and gateway adapter
│   │   │   └── resources/        # application.yml and db/migration Flyway scripts
│   │   └── test/                 # JUnit 5 integration and unit tests
│   ├── pom.xml                   # Maven project descriptor
│   └── README.md                 # Backend development guide
│
├── ai-service/                   # Workstreams C & D: Python FastAPI Intelligence Engine
│   ├── app/
│   │   ├── main.py               # FastAPI application entrypoint
│   │   ├── api/                  # REST route routers
│   │   ├── schemas/              # Pydantic request and response schemas
│   │   ├── common/               # Shared LLM client, prompt templates, and configs
│   │   ├── document_intelligence/# Workstream C: OCR, classification, field extraction, scrutiny
│   │   ├── knowledge_intelligence/# Workstream D: Ingestion, chunking, embeddings, RAG, insights
│   │   └── evaluation/           # RAG retrieval and extraction evaluation harness
│   ├── tests/                    # Pytest test suites
│   ├── requirements.txt          # Python dependencies
│   └── README.md                 # AI Service development guide
│
├── docs/                         # Technical Specifications & Governance Documentation
│   ├── product/                  # PRD v3, problem statement, and requirement references
│   ├── architecture/             # Detailed system, frontend, backend, AI architectures
│   ├── api-contracts/            # Frozen REST API contracts and payload schemas
│   ├── database/                 # ER diagrams, relational schema, and indexing strategies
│   ├── ai/                       # AI prompt designs, extraction heuristics, RAG taxonomy
│   ├── workflows/                # State transition matrices (Scrutiny, EVC, SAC/SHC)
│   ├── testing/                  # End-to-end test scenarios and demo scripts
│   └── decisions/                # Architecture Decision Records (ADRs)
│
├── coordination/                 # Mandatory Multi-Agent Collaboration Infrastructure
│   ├── HANDOFF_LOG.md            # Append-only session handoff ledger
│   ├── PROJECT_CONTEXT.md        # Comprehensive system specification for AI agents
│   ├── CURRENT_STATUS.md         # Real-time implementation progress tracker
│   ├── TASK_BOARD.md             # Active workstream task board and blockers
│   ├── API_CONTRACTS.md          # Shared contract governance registry
│   ├── DATABASE_SCHEMA.md        # Authoritative database model and enum definitions
│   ├── ARCHITECTURE_DECISIONS.md # Architectural decisions log
│   ├── KNOWN_ISSUES.md           # Active issues, ambiguities, and risk register
│   └── CHANGELOG.md              # Semantic release log
│
├── .env.example                  # Environment variable template (no secrets)
├── .gitignore                    # Comprehensive multi-language ignore rules
├── docker-compose.yml            # Local development container topology
└── README.md                     # Root project documentation (this file)
```

---

## 4. Multi-Agent Development & Handoff Protocol

Four developers and multiple AI coding agents (Gemini, Claude, etc.) collaborate in this repository. Because conversation memory is not shared across agent sessions, **this repository is the persistent source of truth**.

### Mandatory Context Loading Procedure
Before creating or modifying any file, every agent **must**:
1. Read `README.md` (this document).
2. Read `coordination/PROJECT_CONTEXT.md`.
3. Read `coordination/CURRENT_STATUS.md`.
4. Read `coordination/TASK_BOARD.md`.
5. Read `coordination/HANDOFF_LOG.md`.
6. Inspect the files in its assigned workstream and run relevant tests.
7. Verify that assumptions match documented contracts before writing code.

### Mandatory Session Completion Procedure
At the end of every working session, the agent **must**:
1. Ensure all modified code passes linting and unit tests.
2. Update `coordination/CURRENT_STATUS.md` and `coordination/TASK_BOARD.md`.
3. Append a new structured handoff record to `coordination/HANDOFF_LOG.md`.
4. Never delete or edit historical handoff entries.

---

## 5. Workstream Ownership Matrix

| Workstream | Domain | Primary Technologies | Directory Boundary |
|---|---|---|---|
| **Workstream A** | Frontend & UX | React 18, Vite, Tailwind CSS, Lucide, Recharts | `/frontend` |
| **Workstream B** | Core Backend & Data | Java 17+, Spring Boot 3, Spring Data JPA, PostgreSQL | `/backend` |
| **Workstream C** | AI Document Intelligence | Python 3.11+, FastAPI, PyMuPDF, pdfplumber, OCR | `/ai-service/app/document_intelligence` |
| **Workstream D** | AI Knowledge & Insights | Python 3.11+, FastAPI, Gemini API / Embeddings, RAG | `/ai-service/app/knowledge_intelligence` |

---

## 6. Getting Started & Running Locally

### Prerequisites
- Node.js (v18+) & npm (v9+)
- Java Development Kit (JDK 17 or 21) & Maven (3.8+)
- Python (3.11+) & pip / virtualenv
- PostgreSQL 15+ (optional for initial mock development; required for backend integration)

### 1. Environment Setup
```bash
# Clone the repository
git clone https://github.com/AlgoRise/NiyamPath.git
cd NiyamPath

# Create local environment configuration
cp .env.example .env
```

### 2. Frontend Development Server (Workstream A)
```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:5173
```

### 3. Core Backend Development Server (Workstream B)
```bash
cd backend
mvn clean compile
mvn spring-boot:run
# Running on http://localhost:8080 (Swagger UI at http://localhost:8080/swagger-ui.html)
```

### 4. AI Intelligence Service (Workstreams C & D)
```bash
cd ai-service
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
# Running on http://localhost:8000 (OpenAPI Docs at http://localhost:8000/docs)
```

---

## 7. Core Coordination Artifacts

- [Project Context Specification](file:///Users/vedkumarsingh/NiyamPATH/coordination/PROJECT_CONTEXT.md)
- [Agent Handoff Log](file:///Users/vedkumarsingh/NiyamPATH/coordination/HANDOFF_LOG.md)
- [Current Implementation Status](file:///Users/vedkumarsingh/NiyamPATH/coordination/CURRENT_STATUS.md)
- [Active Task Board](file:///Users/vedkumarsingh/NiyamPATH/coordination/TASK_BOARD.md)
- [API Contract Governance](file:///Users/vedkumarsingh/NiyamPATH/coordination/API_CONTRACTS.md)
- [Database Schema Specification](file:///Users/vedkumarsingh/NiyamPATH/coordination/DATABASE_SCHEMA.md)
- [Architecture Decisions Log](file:///Users/vedkumarsingh/NiyamPATH/coordination/ARCHITECTURE_DECISIONS.md)
- [Known Issues & Assumptions](file:///Users/vedkumarsingh/NiyamPATH/coordination/KNOWN_ISSUES.md)

