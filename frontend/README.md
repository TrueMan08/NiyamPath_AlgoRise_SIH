# NiyamPath Frontend Application (Workstream A)

> **Technology Stack:** React 18, Vite, JavaScript, Tailwind CSS, React Router DOM, Lucide React, Recharts.  
> **Port:** 5173  
> **API Gateway Target:** `http://localhost:8080/api`

---

## 1. Scope & Responsibilities

Workstream A owns the entire user-facing web experience for NiyamPath. The frontend provides role-tailored dashboards and operational modules for five core personas:
1. **Institution User:** Create applications, submit required institutional documents, track scrutiny deficiencies, respond with revised files, and submit post-approval compliance evidence.
2. **Central / Bureau Officer:** Perform application scrutiny, review AI-assisted observations, issue official deficiencies, review resubmissions, and execute permitted stage transitions.
3. **Regional Officer:** Monitor regional application pendency, view inspection schedules, and oversee regional institutional compliance.
4. **EVC Member:** Access assigned institutional inspection packets, review inspection dates, and record visit remarks.
5. **Administrator:** System configuration, workflow template management, role assignments, cross-bureau analytics, and audit log inspection.

---

## 2. Directory Architecture

```
frontend/
├── public/                 # Static assets, AICTE/AlgoRise logos
├── src/
│   ├── app/                # Root routing (AppRoutes.jsx) and global providers
│   ├── assets/             # Global CSS, theme configurations
│   ├── components/
│   │   ├── common/         # Buttons, Badges, Modals, Tables, Steppers, Alert banners
│   │   └── layout/         # Header, Sidebar, RoleSwitcher, PageContainer
│   ├── features/
│   │   ├── dashboard/      # Role-specific analytics and pending task widgets
│   │   ├── applications/   # Application creation, list, filter, and detail views
│   │   ├── workflow/       # Interactive stage timeline and transition actions
│   │   ├── evc/            # Committee assignment and inspection schedule queue
│   │   ├── compliance/     # Post-approval undertakings and evidence submissions
│   │   ├── documents/      # Document repository, expiry badges, and renewal forms
│   │   ├── notifications/  # Notification center drawer and escalation actions
│   │   ├── reports/        # Workload distribution, pendency ageing, and export views
│   │   ├── audit/          # Filterable event log with actor and timestamp
│   │   └── ai/             # AI Scrutiny review pane, Regulatory Assistant chat drawer,
│   │                       # Document intelligence metadata preview, Pendency insights
│   ├── context/            # AuthContext, RoleContext, ApplicationStateContext
│   ├── hooks/              # useApplications, useWorkflow, useNotifications, useAI
│   ├── services/           # apiClient.js, applicationService.js, aiService.js
│   ├── utils/              # formatters.js, constants.js, statusHelpers.js
│   ├── index.css           # Tailwind base and custom utility classes
│   └── main.jsx            # React root mount
├── package.json
└── vite.config.js
```

---

## 3. Key Development Principles for Coding Agents

1. **Role-Based State Isolation:** Always render views based on the active role provided by `RoleContext`. Never hardcode an officer action in an institution view.
2. **AI Action Governance:** Any AI analysis shown (such as scrutiny findings or checklist comparisons) must be visually styled as *provisional/suggested* with explicit human action buttons ("Accept as Deficiency", "Reject Observation", "Edit Observation").
3. **Deterministic Fallbacks:** The frontend must seamlessly fall back to local mock data if the Spring Boot backend or AI service is unreachable during rapid UI development.
4. **Shared API Contracts:** Never invent or alter payload schemas. Consult `coordination/API_CONTRACTS.md` before adding service calls.

---

## 4. Setup & Running

```bash
cd frontend
npm install
npm run dev
```
Runs at `http://localhost:5173`.

