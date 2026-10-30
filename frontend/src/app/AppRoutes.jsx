import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { LoginPage } from '../features/auth/LoginPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { ApplicationListPage } from '../features/applications/ApplicationListPage';
import { ApplicationDetailPage } from '../features/applications/ApplicationDetailPage';
import { DocumentScrutinyPage } from '../features/ai/scrutiny/DocumentScrutinyPage';
import { WorkflowManagementPage } from '../features/workflow/WorkflowManagementPage';
import { EvcManagementPage } from '../features/evc/EvcManagementPage';
import { ComplianceManagementPage } from '../features/compliance/ComplianceManagementPage';
import { DocumentManagementPage } from '../features/documents/DocumentManagementPage';
import { NotificationsPage } from '../features/notifications/NotificationsPage';
import { ReportsAnalyticsPage } from '../features/reports/ReportsAnalyticsPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Authenticated / Demo Shell */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="applications" element={<ApplicationListPage />} />
        <Route path="applications/:id" element={<ApplicationDetailPage />} />
        <Route path="scrutiny" element={<DocumentScrutinyPage />} />
        <Route path="workflow" element={<WorkflowManagementPage />} />
        <Route path="evc" element={<EvcManagementPage />} />
        <Route path="compliance" element={<ComplianceManagementPage />} />
        <Route path="documents" element={<DocumentManagementPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="reports" element={<ReportsAnalyticsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

