# NiyamPath — Architecture Decision Records (ADRs)

---

## ADR-0001: Monorepo Structure with Decoupled Services

- **Status:** Approved
- **Date:** 2026-10-30
- **Context:** NiyamPath requires simultaneous collaboration between four developers and multiple AI coding agents across four technical workstreams (Frontend, Backend, AI Document Intelligence, AI Knowledge & Insights). Separate repositories would create coordination overhead, contract drift, and deployment friction.
- **Decision:** Adopt a single monorepo (`NiyamPath`) with clear directory boundaries:
  - `frontend/` (React + Vite)
  - `backend/` (Spring Boot 3)
  - `ai-service/` (Python FastAPI)
  - `docs/` (Specifications and ADRs)
  - `coordination/` (Persistent multi-agent coordination records)
- **Consequences:** All workstreams share a single commit history and git workflow. Independent build tools (`npm`, `mvn`, `pip`) operate inside their respective subdirectories without cross-tool pollution.

---

## ADR-0002: Authoritative Backend Gateway Topology

- **Status:** Approved
- **Date:** 2026-10-30
- **Context:** The frontend requires access to workflow operations and AI capabilities. Allowing the frontend or AI service to connect directly to the production database or bypass authentication would create major security vulnerabilities and inconsistent audit logs.
- **Decision:**
  - The React frontend connects exclusively to the Spring Boot backend (`http://localhost:8080/api`).
  - Spring Boot enforces RBAC, validates state transitions, maintains PostgreSQL as the sole source of truth, and emits immutable audit logs.
  - The Spring Boot backend acts as a secure gateway to the Python FastAPI AI service, passing only authorized context and persisting AI results.
- **Consequences:** Protects database integrity, centralizes access control, and guarantees tamper-evident audit logging.

---

## ADR-0003: Unified Python FastAPI AI Intelligence Service

- **Status:** Approved
- **Date:** 2026-10-30
- **Context:** Two distinct AI workstreams exist: Document Intelligence (OCR, metadata extraction, scrutiny comparison) and Knowledge Intelligence (RAG, regulatory Q&A, pendency insights). Running two separate Python web servers would double runtime footprint and create duplicate LLM connections.
- **Decision:** Unify both workstreams inside a single FastAPI service (`ai-service/`), sharing configuration, logging, and LLM provider clients, while exposing distinct modular routers (`/ai/documents/*` and `/ai/assistant/*`, `/ai/insights/*`).
- **Consequences:** Eliminates competing AI backends while allowing Workstreams C and D to develop modular sub-packages independently.

---

## ADR-0004: Human-in-the-Loop AI Governance Boundary

- **Status:** Approved
- **Date:** 2026-10-30
- **Context:** Statutory approvals and regulatory deficiencies have legal implications for educational institutions. AI models can exhibit hallucinations or extraction uncertainties.
- **Decision:** AI services are strictly advisory. AI endpoints return structured draft suggestions with evidence or confidence citations. An authorized officer must explicitly review, edit, and issue any deficiency or state transition. The system forbids AI from mutating authoritative workflow states.
- **Consequences:** Ensures regulatory compliance, accountability, and prevents automated wrongful rejections or approvals.

---

## ADR-0005: Append-Only Multi-Agent Coordination Protocol

- **Status:** Approved
- **Date:** 2026-10-30
- **Context:** AI coding agents lack shared conversation memory across sessions. Without strict protocols, successive agents overwrite code, invent uncoordinated endpoints, or assume unfinished features are complete.
- **Decision:** Enforce the repository as persistent memory. Agents must read `coordination/PROJECT_CONTEXT.md`, `CURRENT_STATUS.md`, and `TASK_BOARD.md` before coding, and must append a structured record to `coordination/HANDOFF_LOG.md` upon completion.
- **Consequences:** Transparent continuity, zero silent regressions, and clear accountability across all agent sessions.

