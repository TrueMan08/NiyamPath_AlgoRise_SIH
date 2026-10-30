import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  Search,
  Check
} from 'lucide-react';

export const ComplianceManagementPage = () => {
  const { complianceItems, submitComplianceEvidence, verifyComplianceItem, currentUser } = useApp();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [uploadModalId, setUploadModalId] = useState(null);
  const [evidenceText, setEvidenceText] = useState('');

  const filteredItems = complianceItems.filter(item => {
    if (filterStatus === 'ALL') return true;
    return item.status === filterStatus;
  });

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (uploadModalId) {
      submitComplianceEvidence(uploadModalId, evidenceText || "Geotagged site completion photographs & signed engineer audit certificate uploaded.");
      setUploadModalId(null);
      setEvidenceText('');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Post-Approval Governance
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mt-1">
          Regulatory Compliance &amp; Undertaking Monitoring
        </h1>
        <p className="text-xs text-slate-500">
          Track institutional time-bound undertakings, verify submitted compliance evidence, and eliminate non-compliance lapses through automated alerts.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2 text-xs">
        {['ALL', 'DUE_SOON', 'AWAITING_VERIFICATION', 'COMPLETED', 'UPCOMING'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-colors ${
              filterStatus === st
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Compliance Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <th className="py-3 px-4">Requirement / Undertaking</th>
              <th className="py-3 px-4">Institution</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Evidence Status</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80">
                <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs">
                  {item.requirement}
                  <span className="block font-mono text-[10px] text-slate-400 font-normal">
                    Ref: {item.applicationNumber}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-700">{item.institutionName}</td>
                <td className="py-3.5 px-4 text-slate-600">{item.category}</td>
                <td className="py-3.5 px-4 font-mono font-medium text-slate-800">{item.dueDate}</td>
                <td className="py-3.5 px-4 text-slate-600">{item.evidenceSubmitted}</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                    item.status === 'COMPLETED'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : item.status === 'DUE_SOON'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : item.status === 'AWAITING_VERIFICATION'
                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  {item.status === 'AWAITING_VERIFICATION' && currentUser.role !== 'INSTITUTION_USER' && (
                    <button
                      onClick={() => verifyComplianceItem(item.id)}
                      className="inline-flex items-center space-x-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded text-xs font-semibold"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Verify Evidence</span>
                    </button>
                  )}

                  {item.status === 'DUE_SOON' && (
                    <button
                      onClick={() => setUploadModalId(item.id)}
                      className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-xs font-semibold"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload Proof</span>
                    </button>
                  )}

                  {item.status === 'COMPLETED' && (
                    <span className="text-emerald-600 font-medium text-xs flex items-center justify-end space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* UPLOAD EVIDENCE MODAL */}
      {uploadModalId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4 border border-slate-200">
            <h3 className="font-bold text-sm text-slate-900">Submit Compliance Evidence</h3>
            <p className="text-xs text-slate-500">
              Provide confirmation note and simulated supporting document upload for fulfilling institutional condition.
            </p>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Evidence Description &amp; Certificate Number</label>
                <textarea
                  value={evidenceText}
                  onChange={(e) => setEvidenceText(e.target.value)}
                  placeholder="e.g. Uploaded certified structural stability certificate NBC 2016 issued on 2026-10-25..."
                  rows={3}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-xs"
                  required
                />
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-xs text-slate-600 block">simulated_renewal_certificate_2026.pdf</span>
                <span className="text-[10px] text-slate-400">PDF, Max 10MB</span>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setUploadModalId(null)}
                  className="px-3 py-1.5 rounded border border-slate-300 text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

