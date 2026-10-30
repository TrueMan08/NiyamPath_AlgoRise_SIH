import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, ChevronRight, FilePlus } from 'lucide-react';

export const ApplicationListPage = () => {
  const { applications } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [regionFilter, setRegionFilter] = useState('ALL');
  const [sortField, setSortField] = useState('submissionDate');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filter & Search Logic
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.institutionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'SCRUTINY' && app.currentStage === 'Under Scrutiny') ||
      (statusFilter === 'DEFICIENCY' && app.status.includes('Deficiency')) ||
      (statusFilter === 'EVC' && app.currentStage.includes('EVC')) ||
      (statusFilter === 'APPROVED' && app.currentStage === 'Approved');

    const matchesRegion =
      regionFilter === 'ALL' ||
      app.region.toLowerCase().includes(regionFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesRegion;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Application Management</h1>
          <p className="text-xs text-slate-500">
            Track, filter and manage institutional approval applications across all regulatory stages.
          </p>
        </div>
        <button
          onClick={() => alert("Simulation: In the production release, this initiates the multi-step institutional approval submission wizard.")}
          className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded transition-colors shadow-sm self-start sm:self-auto"
        >
          <FilePlus className="w-4 h-4" />
          <span>New Application</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Application ID, Institution, City..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 w-full md:w-auto">
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-700 bg-white focus:ring-1 focus:ring-blue-600"
          >
            <option value="ALL">All Stages &amp; Statuses</option>
            <option value="SCRUTINY">Under Scrutiny</option>
            <option value="DEFICIENCY">Deficiency Raised</option>
            <option value="EVC">EVC Scheduled</option>
            <option value="APPROVED">Approved / Closed</option>
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-700 bg-white focus:ring-1 focus:ring-blue-600"
          >
            <option value="ALL">All Regions</option>
            <option value="Northern">Northern Region</option>
            <option value="Western">Western Region</option>
            <option value="Southern">Southern Region</option>
            <option value="Eastern">Eastern Region</option>
            <option value="Central">Central Region</option>
          </select>

        </div>

      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Institution &amp; Location</th>
                <th className="py-3 px-4">Application Type</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Assigned Officer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-slate-400">
                    No applications match the selected search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-blue-700">
                      {app.applicationNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{app.institutionName}</div>
                      <div className="text-[11px] text-slate-400">{app.city}, {app.region}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">{app.applicationType}</td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {app.submissionDate}
                      <span className="block text-[10px] text-slate-400">({app.daysPending} days ago)</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{app.currentStage}</td>
                    <td className="py-3.5 px-4 text-slate-600">{app.assignedOfficer}</td>
                    <td className="py-3.5 px-4">
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
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/applications/${app.id}`}
                        className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Summary / Pagination */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <div>
            Showing <strong>{filteredApps.length}</strong> of <strong>{applications.length}</strong> applications
          </div>
          <div className="text-slate-400">
            Page 1 of 1 (Demonstration Dataset)
          </div>
        </div>

      </div>

    </div>
  );
};

