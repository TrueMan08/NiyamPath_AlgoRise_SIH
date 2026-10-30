# NiyamPath — Project Changelog

All notable changes to the NiyamPath project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0-init] — 2026-10-30

### Added
- **Repository Baseline:** Monorepo architecture initialized with decoupled `frontend/`, `backend/`, and `ai-service/` services.
- **Coordination Infrastructure:** Established persistent multi-agent collaboration governance:
  - `coordination/PROJECT_CONTEXT.md` (authoritative context specification)
  - `coordination/HANDOFF_LOG.md` (append-only session ledger with initial entry HL-001)
  - `coordination/CURRENT_STATUS.md` (real-time workstream status dashboard)
  - `coordination/TASK_BOARD.md` (prioritized workstream backlog)
  - `coordination/API_CONTRACTS.md` (shared REST endpoint contracts)
  - `coordination/DATABASE_SCHEMA.md` (20-entity relational PostgreSQL specification)
  - `coordination/ARCHITECTURE_DECISIONS.md` (ADR-0001 through ADR-0005)
  - `coordination/KNOWN_ISSUES.md` (risk register and ambiguity guidelines)
- **Frontend Scaffolding:** React 18, Vite, Tailwind CSS configuration, and feature-based directory hierarchy.
- **Backend Scaffolding:** Spring Boot 3.3.4 Maven build descriptor (`pom.xml`) with Java package namespace `org.algorise.niyampath`.
- **AI Service Scaffolding:** Python FastAPI structure unifying Document Intelligence (Workstream C) and Knowledge Intelligence (Workstream D).
- **Architecture Specifications:** Comprehensive architecture blueprints authored in `docs/architecture/`.
- **Planned Deployment Artifacts:** `docker-compose.yml`, `.env.example`, and `.gitignore`.
- **Product Assets:** Transferred and indexed `docs/product/NiyamPath_Comprehensive_Team_PRD_v3.docx`.

