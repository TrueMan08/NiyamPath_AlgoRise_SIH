# NiyamPath — Known Issues, Ambiguities & Risk Register

> **Status:** Active  
> **Rule:** If any conflict, ambiguity, or blocker is discovered during development, document it here immediately. Do not make silent assumptions.

---

## 1. Regulatory & Terminology Ambiguities

### ISSUE-001: Expansion of SAC and SHC Workflow Stages
- **Description:** The SIH problem statement and PRD reference workflow combinations such as "EVC + SAC/SHC". However, official expansions of SAC and SHC are not defined in the problem statement text.
- **Guideline for Agents:** **Do not invent or fabricate full forms** (e.g. do not guess "Scrutiny Appeal Committee" or "Standing Hearing Committee" unless validated from an official AICTE gazette). The workflow engine treats `SAC_SHC` purely as a configurable review stage identifier.
- **Resolution Path:** Validate against official AICTE Approval Process Handbook (APH) documentation with the AICTE mentor during review.

### ISSUE-002: Dynamic vs Hardcoded Approval Routes
- **Description:** Different categories of institutions (e.g. Existing Technical Colleges vs New Standalone Institutions vs Universities) undergo different combinations of Scrutiny, EVC, and Council review.
- **Guideline for Agents:** Never hardcode a single linear sequence. Implement workflow routing using `WorkflowTemplate` and `WorkflowStage` relational records so routes remain completely dynamic and configurable.

---

## 2. Technical & Architectural Considerations

### ISSUE-003: Prototype Scope vs Full Enterprise Vision
- **Description:** The PRD v3 outlines both a rapid hackathon prototype scope and an enterprise-scale architecture.
- **Guideline for Agents:** The codebase must establish clean enterprise boundaries (Spring Boot + FastAPI + React) while providing high-fidelity deterministic demo data fallbacks. When live models or external services are not connected, the UI must clearly indicate simulated workflows and sample data.

### ISSUE-004: OCR System Dependency
- **Description:** Full OCR for scanned or image-based PDFs requires the system-level `tesseract` binary, which may not be present in every local environment.
- **Guideline for Agents:** Implement dual extraction in Workstream C: PyMuPDF for native vector PDFs, with a graceful fallback to mock extraction if Tesseract is not installed locally.

---

## 3. Workstream Coordination Risks

### ISSUE-005: Field Name Discrepancies (JSON Contracts)
- **Risk:** Frontend and Backend agents writing independent code might introduce slight schema variations (e.g. `appId` vs `applicationId` or `status` vs `applicationStatus`).
- **Mitigation:** All field names must match `coordination/API_CONTRACTS.md`. If a change is needed, the developer/agent must update `API_CONTRACTS.md` first, log it in `HANDOFF_LOG.md`, and notify the team.

