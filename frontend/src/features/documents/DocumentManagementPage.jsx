import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  FolderArchive,
  FileText,
  Search,
  Filter,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  ScanSearch,
  ArrowRight
} from 'lucide-react';

export const DocumentManagementPage = () => {
  const { documents } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [validityFilter, setValidityFilter] = useState('ALL');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesValidity =
      validityFilter === 'ALL' || doc.validityStatus === validityFilter;

    return matchesSearch && matchesValidity;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Document Intelligence &amp; Repository
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mt-1">Institutional Document &amp; Validity Registry</h1>
        <p className="text-xs text-slate-500">
          Centralized metadata tracking for land titles, building fitness certificates, fire NOCs, and statutory affidavits with automated validity monitoring.
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search documents by name, institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <select
            value={validityFilter}
            onChange={(e) => setValidityFilter(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-700 bg-white"
          >
            <option value="ALL">All Validity Statuses</option>
            <option value="VALID">Valid</option>
            <option value="EXPIRING_SOON">Expiring Soon</option>
            <option value="EXPIRED">Expired</option>
            <option value="PERPETUAL">Perpetual / Freehold</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] font-bold text-slate-400">{doc.id}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  doc.validityStatus === 'VALID'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : doc.validityStatus === 'EXPIRED'
                    ? 'bg-red-50 text-red-700 border border-red-200'
                    : doc.validityStatus === 'PERPETUAL'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {doc.validityStatus}
                </span>
              </div>

              <h2 className="text-xs font-bold text-slate-900 leading-snug">{doc.title}</h2>
              <div className="text-[11px] text-slate-500 mt-1">{doc.institutionName}</div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                {doc.fileName} • {doc.fileSize}
              </div>

              {/* Extracted preview tags */}
              <div className="mt-3 bg-slate-50 p-2.5 rounded border border-slate-100 text-[11px] space-y-1">
                <div className="flex justify-between text-slate-600">
                  <span>Category:</span>
                  <span className="font-semibold text-slate-800">{doc.category}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Issue Date:</span>
                  <span className="font-mono text-slate-800">{doc.issueDate}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Expiry Date:</span>
                  <span className="font-mono text-slate-800">{doc.expiryDate || 'Perpetual'}</span>
                </div>
              </div>
            </div>

            {/* Inspect in AI Scrutiny */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">
                Verification: <strong>{doc.verificationStatus}</strong>
              </span>
              <Link
                to="/scrutiny"
                className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                <span>Inspect in AI Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

