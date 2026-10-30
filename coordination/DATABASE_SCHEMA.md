# NiyamPath — Authoritative Relational Database Schema Specification

> **Engine:** PostgreSQL 15+  
> **Schema Migration Tool:** Flyway (`src/main/resources/db/migration/`)  
> **Owning Workstream:** Workstream B (Core Backend)

---

## 1. Schema Design Principles

1. **Authoritative Single Source of Truth:** All regulatory states, institutional records, and audit events reside in PostgreSQL.
2. **Stable Identifiers:** Primary keys use consistent UUIDs or deterministic business IDs (`APP-2026-XXXX`, `DOC-XXXX`).
3. **Auditability:** Every mutable entity extends a common auditable structure (`created_at`, `created_by`, `updated_at`, `updated_by`).
4. **Referential Integrity:** Foreign keys are explicitly constrained with appropriate cascades (`RESTRICT` or `CASCADE`).
5. **Enums & State Machines:** All workflow stages and statuses are represented as bounded uppercase strings.

---

## 2. Entity Relational Overview (20 Core Entities)

```
[Institution] ──1:N──► [Application] ──1:N──► [WorkflowHistory]
       │                      │
       │                      ├──1:N──► [Deficiency]
       │                      ├──1:N──► [EVCSchedule] ──1:1──► [InspectionReport]
       │                      └──1:N──► [DocumentMetadata] ──1:N──► [DocumentVersion]
       │
       └──1:N──► [Undertaking / Compliance] ──1:N──► [ComplianceEvidence]

[WorkflowTemplate] ──1:N──► [WorkflowStage]

[EVCCommittee] ──1:N──► [EVCMember] ◄──N:1── [User]

[User] ──N:1──► [Role]

[Notification] (User / Institution)
[Escalation] (Application / Compliance)
[AuditEvent] (Actor, Action, Entity, Timestamps)
[AIAnalysisRecord] (Provisional AI Outputs & Officer Decisions)
```

---

## 3. Table Definitions & DDL Blueprint

### 3.1 Security & Users
- `users`: `id` (VARCHAR PK), `username`, `email`, `password_hash`, `full_name`, `role_id` (FK), `region`, `is_active`, `created_at`.
- `roles`: `id` (VARCHAR PK, e.g. `ROLE_INSTITUTION`, `ROLE_CENTRAL_OFFICER`, `ROLE_REGIONAL_OFFICER`, `ROLE_EVC_MEMBER`, `ROLE_ADMIN`), `description`, `permissions` (TEXT[] / JSONB).

### 3.2 Institutions
- `institutions`: `id` (VARCHAR PK, e.g. `INST-101`), `name`, `aicte_permanent_id`, `address`, `city`, `state`, `region` (`NORTHERN`, `WESTERN`, `SOUTHERN`, `EASTERN`, etc.), `contact_email`, `contact_phone`, `established_year`, `created_at`.

### 3.3 Applications & Workflow
- `workflow_templates`: `id` (VARCHAR PK, e.g. `ROUTE-SCRUTINY-EVC`), `name` (e.g. `Scrutiny + EVC Route`), `description`, `is_active`.
- `workflow_stages`: `id` (VARCHAR PK), `template_id` (FK), `stage_name` (`SUBMISSION`, `SCRUTINY`, `EVC`, `SAC_SHC`, `DECISION`), `sequence_order` (INT), `sla_days` (INT).
- `applications`: `id` (VARCHAR PK, e.g. `APP-2026-001`), `application_number` (UNIQUE), `institution_id` (FK), `template_id` (FK), `application_type` (`EXTENSION_OF_APPROVAL`, `NEW_INSTITUTE`, `INCREASE_IN_INTAKE`, `NEW_COURSE`), `academic_year`, `current_stage` (FK `workflow_stages`), `status` (`DRAFT`, `SUBMITTED`, `UNDER_SCRUTINY`, `DEFICIENCY_RAISED`, `RESUBMITTED`, `EVC_PENDING`, `EVC_SCHEDULED`, `PENDING_DECISION`, `APPROVED`, `REJECTED`), `assigned_officer_id` (FK `users`), `submission_date`, `created_at`, `updated_at`.
- `workflow_history`: `id` (BIGSERIAL PK), `application_id` (FK), `from_stage`, `to_stage`, `from_status`, `to_status`, `actor_id` (FK `users`), `remarks`, `transition_timestamp`.

### 3.4 Scrutiny & Deficiencies
- `deficiencies`: `id` (VARCHAR PK, e.g. `DEF-2026-001`), `application_id` (FK), `document_id` (FK nullable), `category` (`DOCUMENT_MISSING`, `DOCUMENT_EXPIRED`, `DATA_INCONSISTENCY`, `INFRASTRUCTURE_DEFICIT`), `description` (TEXT), `deadline` (TIMESTAMPTZ), `status` (`OPEN`, `RESPONSE_SUBMITTED`, `RESOLVED`, `ESCALATED`), `cycle_number` (INT), `issued_by` (FK `users`), `resolved_by` (FK `users`), `is_ai_assisted` (BOOLEAN), `created_at`, `updated_at`.

### 3.5 Documents & Validity
- `document_metadata`: `id` (VARCHAR PK, e.g. `DOC-901`), `institution_id` (FK), `application_id` (FK nullable), `document_type` (`LAND_TITLE`, `LEASE_DEED`, `BUILDING_SAFETY_CERTIFICATE`, `FIRE_SAFETY_CERTIFICATE`, `AFFIDAVIT_UNDERTAKING`), `title`, `issue_date` (DATE), `expiry_date` (DATE nullable), `validity_status` (`VALID`, `EXPIRING_SOON`, `EXPIRED`), `verification_status` (`UNVERIFIED`, `VERIFIED`, `REJECTED`), `created_at`.
- `document_versions`: `id` (BIGSERIAL PK), `document_id` (FK), `version_number` (INT), `file_url`, `file_name`, `file_size_bytes`, `mime_type`, `uploaded_by` (FK `users`), `uploaded_at`.

### 3.6 EVC (Expert Visit Committee)
- `evc_committees`: `id` (VARCHAR PK), `committee_code`, `region`, `created_at`.
- `evc_members`: `id` (BIGSERIAL PK), `committee_id` (FK), `user_id` (FK), `role_in_committee` (`CHAIRMAN`, `EXPERT_MEMBER`, `CONVENER`).
- `evc_schedules`: `id` (VARCHAR PK), `application_id` (FK), `committee_id` (FK), `scheduled_date` (DATE), `inspection_mode` (`PHYSICAL`, `VIRTUAL`), `status` (`SCHEDULED`, `IN_PROGRESS`, `COMPLETED`, `DELAYED`, `CANCELLED`), `instructions` (TEXT).
- `inspection_reports`: `id` (VARCHAR PK), `evc_schedule_id` (FK UNIQUE), `report_status` (`PENDING`, `SUBMITTED`, `ACCEPTED`, `REJECTED`), `summary_remarks` (TEXT), `submitted_at`, `submitted_by` (FK `users`).

### 3.7 Post-Approval Compliance & Undertakings
- `compliance_requirements`: `id` (VARCHAR PK), `title`, `description`, `application_type_applicability`, `default_deadline_days` (INT).
- `undertakings`: `id` (VARCHAR PK, e.g. `UND-2026-001`), `institution_id` (FK), `application_id` (FK), `requirement_id` (FK nullable), `description` (TEXT), `due_date` (DATE), `status` (`UPCOMING`, `DUE_SOON`, `SUBMITTED`, `UNDER_VERIFICATION`, `VERIFIED`, `DEFICIENT`, `OVERDUE`), `created_at`.
- `compliance_evidence`: `id` (BIGSERIAL PK), `undertaking_id` (FK), `evidence_description` (TEXT), `document_id` (FK), `submitted_by` (FK `users`), `submitted_at`, `verification_remarks` (TEXT), `verified_by` (FK `users`), `verified_at`.

### 3.8 Notifications, Escalations & Audit
- `notifications`: `id` (VARCHAR PK), `recipient_user_id` (FK nullable), `recipient_role` (VARCHAR nullable), `title`, `message` (TEXT), `category` (`DEFICIENCY`, `APPLICATION_STAGE`, `EVC_SCHEDULE`, `COMPLIANCE_DEADLINE`, `DOCUMENT_EXPIRY`, `ESCALATION`), `priority` (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), `related_entity_type` (VARCHAR), `related_entity_id` (VARCHAR), `is_read` (BOOLEAN DEFAULT FALSE), `created_at`.
- `escalations`: `id` (VARCHAR PK), `related_entity_type` (`APPLICATION`, `DEFICIENCY`, `UNDERTAKING`, `EVC`), `related_entity_id` (VARCHAR), `escalation_level` (`LEVEL_1_REGIONAL_OFFICER`, `LEVEL_2_BUREAU_HEAD`, `LEVEL_3_MEMBER_SECRETARY`), `reason` (TEXT), `trigger_timestamp`, `is_resolved` (BOOLEAN DEFAULT FALSE), `resolved_at`.
- `audit_events`: `id` (BIGSERIAL PK), `actor_id` (VARCHAR), `actor_role` (VARCHAR), `action` (`CREATE`, `UPDATE`, `STAGE_TRANSITION`, `DEFICIENCY_ISSUE`, `EVIDENCE_SUBMIT`, `VERIFY`, `AI_OBSERVATION_ACCEPT`), `entity_type` (VARCHAR), `entity_id` (VARCHAR), `old_state` (JSONB), `new_state` (JSONB), `ip_address` (VARCHAR), `timestamp` (TIMESTAMPTZ DEFAULT NOW()).
- `ai_analysis_records`: `id` (VARCHAR PK), `application_id` (FK nullable), `document_id` (FK nullable), `analysis_type` (`METADATA_EXTRACTION`, `SCRUTINY_DRAFT`, `RAG_QUERY`, `PENDENCY_ANALYSIS`), `input_prompt_summary` (TEXT), `generated_output` (JSONB), `source_citations` (JSONB), `officer_action` (`PENDING_REVIEW`, `ACCEPTED`, `EDITED_AND_ACCEPTED`, `REJECTED`), `reviewed_by` (FK `users`), `reviewed_at`.

