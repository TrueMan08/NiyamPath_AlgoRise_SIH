# NiyamPath — Multi-Agent Collaboration & Handoff Architecture

> **Purpose:** Protocol and workflow guidelines for AI coding agents (Gemini, Claude, etc.) and human developers collaborating on NiyamPath.

---

## 1. Why Repository-First Collaboration Matters

In a multi-developer team where each person utilizes AI coding agents across multiple sessions, **agents do not share conversational memory**. Therefore:
- The **repository itself** is the permanent memory of the project.
- Uncommitted knowledge in a chat session is lost once the session closes.
- Every architectural choice, schema modification, and API change must be recorded in the repository.

---

## 2. The 10-Step Context-Loading Procedure

Before modifying or creating any code in NiyamPath, every agent **must**:
1. Read `README.md` at the project root.
2. Read `coordination/PROJECT_CONTEXT.md` to understand problem boundaries and rules.
3. Read `coordination/CURRENT_STATUS.md` to assess the current state.
4. Read `coordination/TASK_BOARD.md` to verify task assignment and dependencies.
5. Read `coordination/HANDOFF_LOG.md` to review recent changes and instructions.
6. Read the relevant architectural documents in `docs/architecture/`.
7. Read `coordination/API_CONTRACTS.md` before changing or adding any API endpoint.
8. Read `coordination/DATABASE_SCHEMA.md` before changing or adding any entity.
9. Inspect existing files in the assigned workstream directory.
10. Verify git status and ensure no unexpected uncommitted changes exist.

---

## 3. Mandatory Session Completion & Handoff Protocol

At the conclusion of every work session, the agent **must**:
1. Run local tests and linters for the modified service (`npm test`, `mvn test`, or `pytest`).
2. Verify that no secrets or unintended files are staged.
3. Update `coordination/CURRENT_STATUS.md` to reflect real progress.
4. Update `coordination/TASK_BOARD.md` (move completed tasks to `In Review` or `Completed`).
5. **Append** a new entry to `coordination/HANDOFF_LOG.md` using the exact template.
   - *Never delete or edit historical entries.*
   - If an error was logged earlier, append a correction entry referencing the previous Entry ID.

---

## 4. Conflict Prevention & Shared-File Governance

| Workstream | Owns | Shared Files with Other Workstreams |
|---|---|---|
| **Workstream A** (Frontend) | `frontend/` | `coordination/API_CONTRACTS.md` |
| **Workstream B** (Backend) | `backend/` | `coordination/API_CONTRACTS.md`, `coordination/DATABASE_SCHEMA.md` |
| **Workstream C** (AI Doc Int) | `ai-service/app/document_intelligence/` | `ai-service/app/main.py`, `ai-service/app/common/*` |
| **Workstream D** (AI Knowledge) | `ai-service/app/knowledge_intelligence/`| `ai-service/app/main.py`, `ai-service/app/common/*` |

### Rules for Shared Files:
1. **Contract First:** Frontend and Backend agents must agree on JSON field names in `coordination/API_CONTRACTS.md` before writing integration code.
2. **Shared AI Infrastructure:** Workstreams C and D share `ai-service/app/common/`. Never refactor `config.py` or `llm_client.py` without verifying that both workstreams remain functional.
3. **Never Force Reset:** Never execute destructive git commands (`git reset --hard`, `git clean -fd`) without explicit human instruction.

