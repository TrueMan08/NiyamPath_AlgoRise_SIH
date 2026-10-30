# NiyamPath Core Backend Service (Workstream B)

> **Technology Stack:** Java 17/21, Spring Boot 3.3.x, Spring Data JPA, Spring Security, PostgreSQL, Flyway, OpenAPI 3.  
> **Package Namespace:** `org.algorise.niyampath`  
> **Port:** 8080  
> **Database:** PostgreSQL (Port 5432)

---

## 1. Scope & Responsibilities

Workstream B owns the authoritative state of NiyamPath. The core backend serves as the single source of truth for:
1. **Application Lifecycle & State Machine:** Managing submission, scrutiny, deficiency issuance, resubmissions, inspections, and final board decisions.
2. **Configurable Workflow Engine:** Enforcing permitted stage transitions based on dynamic route templates (e.g. Scrutiny Only, Scrutiny + EVC, EVC + SAC/SHC).
3. **Deficiency & Scrutiny Engine:** Tracking officer observations, deficiency notices, institution responses, and cycle counts.
4. **EVC Management:** Scheduling inspection dates, forming committees, tracking inspection reports, and flagging delayed inspections.
5. **Post-Approval Compliance:** Managing institutional undertakings, due dates, evidence submissions, and officer verification.
6. **Document Metadata & Validity:** Maintaining document records, issue and expiration dates, and renewal queues.
7. **Notification & Escalation:** In-app notification generation and SLA-based escalation triggers.
8. **Tamper-Evident Audit Trail:** Recording every state transition, user action, and AI-assisted officer interaction.
9. **Secure AI Service Gateway:** Mediating all AI requests, scrubbing sensitive data, and passing authorized context only.

---

## 2. Package Architecture

```
backend/src/main/java/org/algorise/niyampath/
├── config/             # AppConfig, CorsConfig, OpenApiConfig, SecurityConfig
├── security/           # JwtTokenProvider, CustomUserDetailsService, SecurityUtils
├── common/             # BaseEntity, ApiResponse, ErrorResponse, GlobalExceptionHandler
├── user/               # User, Role, Permission, UserRepository, UserService, UserController
├── institution/        # Institution, Region, InstitutionRepository, InstitutionService
├── application/        # Application, ApplicationStatus, ApplicationType, ApplicationController
├── workflow/           # WorkflowTemplate, WorkflowStage, TransitionRule, WorkflowEngine
├── deficiency/         # Deficiency, DeficiencyCycle, DeficiencyStatus, DeficiencyService
├── evc/                # EVCCommittee, EVCMember, EVCSchedule, InspectionReport
├── compliance/         # ComplianceRequirement, Undertaking, ComplianceEvidence
├── document/           # DocumentMetadata, DocumentVersion, ValidityStatus, DocumentStorage
├── notification/       # Notification, NotificationPriority, NotificationDispatcher
├── escalation/         # EscalationRule, EscalationTrigger, EscalationLog
├── analytics/          # DashboardMetricsService, PendencyAnalyticsController
├── audit/              # AuditEvent, AuditEventType, AuditService, AuditListener
└── ai/                 # AiServiceClient, AiGatewayController, AiAnalysisRecord
```

---

## 3. Authoritative Data Principles

1. **State Machine Integrity:** Applications and compliance items cannot jump arbitrarily between stages; all transitions must be validated against `WorkflowStage` transition matrices.
2. **Auditability:** Every mutation to an Application, Deficiency, or Compliance record must emit an immutable `AuditEvent`.
3. **AI Boundary:** The backend receives AI analysis as suggestions and persists them into `ai_analysis_record` for officer review. An AI suggestion **never** automatically triggers a status update.

---

## 4. Setup & Running

```bash
cd backend
mvn clean compile
mvn spring-boot:run
```
API Documentation available at `http://localhost:8080/swagger-ui.html` once started.

