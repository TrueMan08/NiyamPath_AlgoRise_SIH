import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DEMO_USERS,
  APPLICATIONS as initialApplications,
  DOCUMENTS as initialDocuments,
  DEFICIENCIES as initialDeficiencies,
  EVC_SCHEDULES as initialEvcSchedules,
  COMPLIANCE_ITEMS as initialComplianceItems,
  NOTIFICATIONS as initialNotifications,
  WORKFLOW_ROUTES,
  ANALYTICS_DATA,
  AI_SCRUTINY_SAMPLE
} from '../utils/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current logged in demo user
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('niyampath_user');
    return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Default: Central Officer
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('niyampath_apps');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [documents, setDocuments] = useState(initialDocuments);
  const [deficiencies, setDeficiencies] = useState(initialDeficiencies);
  const [evcSchedules, setEvcSchedules] = useState(initialEvcSchedules);
  const [complianceItems, setComplianceItems] = useState(initialComplianceItems);
  const [notifications, setNotifications] = useState(initialNotifications);

  // AI Assistant drawer open/close
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  // Simulated AI analysis state
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState(null);

  // Sync user changes to localStorage
  useEffect(() => {
    localStorage.setItem('niyampath_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Switch demo role
  const switchRole = (userId) => {
    const user = DEMO_USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  // Run simulated AI analysis on a document
  const runSimulatedAiAnalysis = (docId) => {
    setIsAiAnalyzing(true);
    setAiAnalysisResult(null);
    setTimeout(() => {
      setIsAiAnalyzing(false);
      setAiAnalysisResult(AI_SCRUTINY_SAMPLE);
    }, 1200);
  };

  // Officer action: Convert AI suggestion to official deficiency
  const issueDeficiencyFromAi = (appId, deficiencyData) => {
    const newDef = {
      id: `DEF-2026-${String(deficiencies.length + 1).padStart(3, '0')}`,
      applicationId: appId,
      applicationNumber: "AICTE-2026-N-8841",
      institutionName: "Aryavart Institute of Technology",
      category: deficiencyData.category || "Safety Certificate Expired",
      severity: deficiencyData.severity || "HIGH",
      documentRef: "DOC-902",
      description: deficiencyData.text,
      issuedBy: `${currentUser.name} (${currentUser.roleLabel})`,
      issuedDate: new Date().toISOString().split('T')[0],
      deadline: "2026-11-15",
      daysRemaining: 15,
      status: "OPEN",
      aiAssisted: true,
      aiObservationRef: "AI-SCRUTINY-8812"
    };

    setDeficiencies([newDef, ...deficiencies]);

    // Update application status
    setApplications(apps => apps.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: "Deficiency Raised",
          statusSeverity: "amber",
          deficienciesCount: (app.deficienciesCount || 0) + 1
        };
      }
      return app;
    }));

    // Trigger notification
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title: "New Deficiency Issued",
      message: `Deficiency issued for ${deficiencyData.category} on application AICTE-2026-N-8841.`,
      category: "DEFICIENCY",
      priority: "HIGH",
      timestamp: new Date().toISOString(),
      read: false,
      link: `/applications/${appId}`
    };
    setNotifications([newNotif, ...notifications]);
  };

  // Schedule an EVC
  const scheduleEvc = (newEvcData) => {
    const newSchedule = {
      id: `EVC-2026-${String(evcSchedules.length + 101)}`,
      status: "SCHEDULED",
      reportStatus: "PENDING_VISIT",
      ...newEvcData
    };
    setEvcSchedules([newSchedule, ...evcSchedules]);
  };

  // Submit compliance evidence
  const submitComplianceEvidence = (complianceId, evidenceNote) => {
    setComplianceItems(items => items.map(item => {
      if (item.id === complianceId) {
        return {
          ...item,
          status: "AWAITING_VERIFICATION",
          evidenceSubmitted: evidenceNote,
          submissionDate: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));
  };

  // Verify compliance item
  const verifyComplianceItem = (complianceId) => {
    setComplianceItems(items => items.map(item => {
      if (item.id === complianceId) {
        return {
          ...item,
          status: "COMPLETED",
          assignedOfficer: currentUser.name
        };
      }
      return item;
    }));
  };

  // Mark notification as read
  const markNotificationRead = (notifId) => {
    setNotifications(notifs => notifs.map(n => n.id === notifId ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchRole,
        demoUsers: DEMO_USERS,
        applications,
        documents,
        deficiencies,
        evcSchedules,
        complianceItems,
        notifications,
        workflowRoutes: WORKFLOW_ROUTES,
        analyticsData: ANALYTICS_DATA,
        isAiAssistantOpen,
        setIsAiAssistantOpen,
        isAiAnalyzing,
        aiAnalysisResult,
        runSimulatedAiAnalysis,
        issueDeficiencyFromAi,
        scheduleEvc,
        submitComplianceEvidence,
        verifyComplianceItem,
        markNotificationRead
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

