import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  FileText,
  ScanSearch,
  AlertTriangle,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Bot
} from 'lucide-react';

export const DashboardPage = () => {
  const { currentUser, applications, deficiencies, evcSchedules, complianceItems, notifications, setIsAiAssistantOpen } = useApp();

  const totalApps = applications.length;
  const underScrutinyCount = applications.filter(a => a.currentStage === "Under Scrutiny" || a.status.includes("Scrutiny")).length;
  const openDeficienciesCount = deficiencies.filter(d => d.status === "OPEN").length;
  const scheduledEvcCount = evcSchedules.filter(e => e.status === "SCHEDULED").length;
  const pendingComplianceCount = complianceItems.filter(c => c.status !== "COMPLETED").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner & Welcome */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {currentUser.roleLabel}
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500">{currentUser.department}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Unified regulatory workflow dashboard for institutional approvals, inspection schedules, and post-approval compliance.
          </p>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex items-center space-x-2">
          <Link
            to="/scrutiny"
            className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded transition-colors shadow-sm"
          >
            <ScanSearch className="w-4 h-4" />
            <span>AI Scrutiny Desk</span>
          </Link>
          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded transition-colors shadow-sm"
          >
            <Bot className="w-4 h-4 text-blue-400" />
            <span>Ask AI Assistant</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Applications</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{totalApps}</div>
          <div className="text-[11px] text-slate-400 mt-1">Active for 2026-27</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Under Scrutiny</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{underScrutinyCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Officer review queue</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Open Deficiencies</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2">{openDeficienciesCount}</div>
          <div className="text-[11px] text-amber-700 mt-1">Awaiting resubmission</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>EVC Scheduled</span>
            <CalendarCheck className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{scheduledEvcCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Inspections confirmed</div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Compliance Actions</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{pendingComplianceCount}</div>
          <div className="text-[11px] text-emerald-700 mt-1">Undertakings tracked</div>
        </div>

      </div>

      {/* Main Content: Applications Table and Notifications Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Applications Table (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-sm">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Recent Institutional Applications</h2>
              <p className="text-xs text-slate-500">Live approval pipeline tracking across regions</p>
            </div>
            <Link
              to="/applications"
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-2.5 px-4">Application ID</th>
                  <th className="py-2.5 px-4">Institution Name</th>
                  <th className="py-2.5 px-4">Type</th>
                  <th className="py-2.5 px-4">Stage</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.slice(0, 5).map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-blue-700">
                      {app.applicationNumber}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{app.institutionName}</div>
                      <div className="text-[11px] text-slate-400">{app.region}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{app.applicationType}</td>
                    <td className="py-3 px-4 text-slate-600">{app.currentStage}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                        app.statusSeverity === 'green'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : app.statusSeverity === 'amber'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : app.statusSeverity === 'blue'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/applications/${app.id}`}
                        className="text-xs bg-slate-100 hover:bg-blue-600 hover:text-white px-2.5 py-1 rounded text-slate-700 font-medium transition-colors"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Notifications & Critical Alerts */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                <span>Priority Regulatory Alerts</span>
              </h2>
              <Link to="/notifications" className="text-xs text-blue-600 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {notifications.slice(0, 4).map((n) => (
                <Link
                  key={n.id}
                  to={n.link}
                  className="block p-2.5 rounded border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      n.priority === 'HIGH' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {n.category}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(n.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="font-semibold text-xs text-slate-900 mt-1">{n.title}</div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{n.message}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="bg-slate-900 text-white rounded-lg p-4 text-xs space-y-2">
            <div className="font-bold text-sm text-blue-400">SIH 2026 Evaluation Guide</div>
            <p className="text-slate-300 leading-relaxed">
              Explore the <strong>AI Document Scrutiny Desk</strong> to see automated metadata extraction, checklist verification, and human-in-the-loop deficiency drafting.
            </p>
            <Link
              to="/scrutiny"
              className="inline-block mt-1 text-white font-semibold underline hover:text-blue-300"
            >
              Open AI Scrutiny Desk →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

