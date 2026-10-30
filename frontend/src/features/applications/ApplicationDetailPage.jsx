import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  Building,
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ScanSearch,
  ChevronRight,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const ApplicationDetailPage = () => {
  const { id } = useParams();
  const { applications, documents, deficiencies, complianceItems } = useApp();

  const [activeTab, setActiveTab] = useState('timeline');

  const application = applications.find(a => a.id === id) || applications[0];
  const appDocs = documents.filter(d => d.applicationId === application.id);
  const appDefs = deficiencies.filter(d => d.applicationId === application.id);
  const appCompliance = complianceItems.filter(c => c.institutionId === application.institutionId);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center space-x-2 text-xs text-slate-500">
        <Link to="/applications" className="hover:text-blue-600 flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Applications</span>
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-mono font-medium">{application.applicationNumber}</span>
      </div>

      {/* Main Detail Header Card */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                {application.applicationNumber}
              </span>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                application.statusSeverity === 'green'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : application.statusSeverity === 'amber'
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : application.statusSeverity === 'blue'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {application.status}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 mt-2">
              {application.institutionName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {application.city}, {application.region} • Academic Year {application.academicYear}
            </p>
          </div>

          {/* Action CTA */}
          <div className="flex items-center space-x-2">
            <Link
              to="/scrutiny"
              className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors shadow-sm"
            >
              <ScanSearch className="w-4 h-4" />
              <span>Launch AI Scrutiny</span>
            </Link>
          </div>
        </div>

        {/* Metadata summary bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block">Application Type</span>
            <span className="font-semibold text-slate-800">{application.applicationType}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Workflow Route</span>
            <span className="font-semibold text-slate-800">{application.workflowRoute}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Assigned Scrutiny Officer</span>
            <span className="font-semibold text-slate-800">{application.assignedOfficer}</span>
          </div>
          <div>
            <span className="text-slate-400 block">Intake / Programs</span>
            <span className="font-semibold text-slate-800">{application.intakeApplied} Seats ({application.courses?.length || 3} Courses)</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'timeline'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Workflow Timeline &amp; History
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`py-3 border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'documents'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>Uploaded Documents</span>
            <span className="bg-slate-100 px-1.5 py-0.2 rounded-full text-[10px] text-slate-600">
              {appDocs.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('deficiencies')}
            className={`py-3 border-b-2 transition-colors flex items-center space-x-1.5 ${
              activeTab === 'deficiencies'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <span>Deficiency Records</span>
            {appDefs.length > 0 && (
              <span className="bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full text-[10px]">
                {appDefs.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'compliance'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            Post-Approval Conditions ({appCompliance.length})
          </button>
        </nav>
      </div>

      {/* TAB 1: WORKFLOW TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-900">Configured Stage Progress</h2>

          <div className="relative pl-6 border-l-2 border-slate-200 space-y-8">
            {application.timeline?.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Status Dot */}
                <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 bg-white ${
                  step.status === 'completed'
                    ? 'border-emerald-600 bg-emerald-600'
                    : step.status === 'in-progress'
                    ? 'border-blue-600 bg-blue-600 animate-pulse'
                    : 'border-slate-300'
                }`} />

                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900">{step.stage}</h3>
                  <span className="text-[11px] text-slate-400 font-mono">{step.date}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Handled by: <span className="font-medium text-slate-700">{step.actor}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1.5 bg-slate-50 p-2 rounded border border-slate-100">
                  {step.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: UPLOADED DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Validity</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {doc.title}
                    <span className="block text-[11px] text-slate-400 font-mono font-normal">
                      {doc.fileName} ({doc.fileSize})
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{doc.category}</td>
                  <td className="py-3 px-4 text-slate-600">{doc.issueDate}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{doc.expiryDate || 'N/A (Perpetual)'}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      doc.validityStatus === 'VALID'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : doc.validityStatus === 'EXPIRED'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {doc.validityStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-700 font-medium">{doc.verificationStatus}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      to="/scrutiny"
                      className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-2.5 py-1 rounded font-semibold transition-colors"
                    >
                      Inspect with AI
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: DEFICIENCY RECORDS */}
      {activeTab === 'deficiencies' && (
        <div className="space-y-4">
          {appDefs.length === 0 ? (
            <div className="bg-white p-8 rounded-lg border border-slate-200 text-center text-slate-400 text-xs">
              Zero active or historical deficiencies recorded for this application.
            </div>
          ) : (
            appDefs.map((def) => (
              <div key={def.id} className="bg-white p-5 rounded-lg border border-amber-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                      {def.id}
                    </span>
                    <span className="text-xs font-bold text-red-700 uppercase bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      {def.severity} Severity
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Deadline: <strong className="text-slate-800">{def.deadline}</strong> ({def.daysRemaining} days remaining)
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900">{def.category}</div>
                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed">
                  {def.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span>Issued by: <strong>{def.issuedBy}</strong> on {def.issuedDate}</span>
                  {def.aiAssisted && (
                    <span className="text-blue-600 font-medium">Assisted by AI Scrutiny Model ({def.aiObservationRef})</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 4: COMPLIANCE & UNDERTAKINGS */}
      {activeTab === 'compliance' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">Undertaking / Requirement</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Evidence Status</th>
                <th className="py-3 px-4">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appCompliance.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-semibold text-slate-900">{item.requirement}</td>
                  <td className="py-3 px-4 text-slate-600">{item.category}</td>
                  <td className="py-3 px-4 font-mono text-slate-700">{item.dueDate}</td>
                  <td className="py-3 px-4 text-slate-600">{item.evidenceSubmitted}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.status === 'DUE_SOON'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

