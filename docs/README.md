# NiyamPath Technical Documentation Directory

This directory contains specifications, architectural designs, API contracts, schema models, and governance guidelines for the NiyamPath platform.

---

## Directory Organization

| Directory | Purpose | Key Artifacts |
|---|---|---|
| `product/` | Official requirements, problem statement, team PRD | [NiyamPath PRD v3](file:///Users/vedkumarsingh/NiyamPATH/docs/product/NiyamPath_Comprehensive_Team_PRD_v3.docx) |
| `architecture/` | Core technical designs across all workstreams | `SYSTEM_ARCHITECTURE.md`, `FRONTEND_ARCHITECTURE.md`, `BACKEND_ARCHITECTURE.md`, `AI_ARCHITECTURE.md`, `AGENT_COLLABORATION.md` |
| `api-contracts/` | Canonical REST API definitions & schemas | `API_CONTRACTS.md` (mirrored in `/coordination`) |
| `database/` | Entity-Relationship models, DDL, and migrations | `DATABASE_SCHEMA.md` (mirrored in `/coordination`) |
| `ai/` | Prompt engineering templates, extraction heuristics | Document checklist mappings, RAG chunking parameters |
| `workflows/` | Workflow state machines & routing rules | State transition matrices for Scrutiny, EVC, SAC/SHC |
| `testing/` | Test strategies, demo test journeys | Acceptance checklists, end-to-end demo scripts |
| `decisions/` | Architecture Decision Records (ADRs) | ADR-0001 through ADR-0005 |

---

## Documentation Standards for AI Agents
1. **Never Invent Rules:** All AICTE regulatory rules, deadlines, or route names must be cross-referenced with approved documentation.
2. **Synchronize Contracts:** When modifying endpoints or database entities, both `docs/` and `coordination/` files must be updated simultaneously.
3. **Link Relative Paths:** Always provide navigable links to relevant files for ease of human and agent navigation.

