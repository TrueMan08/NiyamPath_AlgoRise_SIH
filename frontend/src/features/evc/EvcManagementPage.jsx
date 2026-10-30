import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  CalendarCheck2,
  Users,
  MapPin,
  Calendar,
  FileCheck,
  Plus,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';

export const EvcManagementPage = () => {
  const { evcSchedules, scheduleEvc } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    applicationNumber: 'AICTE-2026-N-8841',
    institutionName: 'Aryavart Institute of Technology',
    region: 'Northern Region',
    city: 'Greater Noida',
    visitType: 'Physical Campus Inspection',
    inspectionScope: 'Laboratory Infrastructure and Barrier-Free Access Verification',
    scheduledDate: '2026-11-25',
    committeeMembers: [
      { name: 'Prof. Arvind Kulkarni', affiliation: 'IIT Bombay', role: 'Chairman' },
      { name: 'Dr. Meenakshi Sundaram', affiliation: 'COEP Tech University', role: 'Expert Member' },
      { name: 'Regional Officer', affiliation: 'AICTE NRO Kanpur', role: 'Convener' }
    ]
  });

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    scheduleEvc(newSchedule);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Module 4: Inspection Coordination
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Expert Visit Committee (EVC) Management
          </h1>
          <p className="text-xs text-slate-500">
            Coordinate physical and virtual institutional inspections, assign expert committees, and track inspection report completion.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New EVC Inspection</span>
        </button>
      </div>

      {/* Grid of Scheduled Inspections */}
      <div className="space-y-4">
        {evcSchedules.map((evc) => (
          <div
            key={evc.id}
            className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {evc.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">•</span>
                  <span className="font-mono text-xs text-slate-600">{evc.applicationNumber}</span>
                </div>
                <h2 className="text-sm font-bold text-slate-900 mt-1">{evc.institutionName}</h2>
                <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                  <span className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evc.city}, {evc.region}</span>
                  </span>
                  <span>•</span>
                  <span>{evc.visitType}</span>
                </div>
              </div>

              {/* Status & Date */}
              <div className="text-left md:text-right">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                  evc.status === 'SCHEDULED'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {evc.status}
                </span>
                <div className="text-xs font-bold text-slate-800 mt-1 flex items-center md:justify-end space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Date: {evc.scheduledDate}</span>
                </div>
                <div className="text-[11px] text-slate-400">Report Status: {evc.reportStatus}</div>
              </div>
            </div>

            {/* Scope */}
            <div className="text-xs text-slate-700">
              <strong className="text-slate-900">Inspection Mandate:</strong> {evc.inspectionScope}
            </div>

            {/* Committee Members Pill List */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5" />
                <span>Assigned Expert Visit Committee</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {evc.committeeMembers.map((member, i) => (
                  <div key={i} className="bg-slate-50 p-2 rounded border border-slate-200 text-xs">
                    <div className="font-semibold text-slate-800">{member.name}</div>
                    <div className="text-[11px] text-slate-500">{member.affiliation}</div>
                    <div className="text-[10px] font-bold text-blue-700 uppercase mt-0.5">{member.role}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* SCHEDULE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900">Schedule Expert Committee Inspection</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSchedule} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Target Application</label>
                <select
                  value={newSchedule.applicationNumber}
                  onChange={(e) => setNewSchedule({ ...newSchedule, applicationNumber: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-xs"
                >
                  <option value="AICTE-2026-N-8841">AICTE-2026-N-8841 (Aryavart Institute)</option>
                  <option value="AICTE-2026-C-9904">AICTE-2026-C-9904 (Pragati Institute)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Proposed Inspection Date</label>
                <input
                  type="date"
                  value={newSchedule.scheduledDate}
                  onChange={(e) => setNewSchedule({ ...newSchedule, scheduledDate: e.target.value })}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-xs"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Inspection Scope &amp; Instructions</label>
                <textarea
                  value={newSchedule.inspectionScope}
                  onChange={(e) => setNewSchedule({ ...newSchedule, inspectionScope: e.target.value })}
                  rows={3}
                  className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-xs"
                  required
                />
              </div>

              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-600">
                <strong>Committee:</strong> Prof. Arvind Kulkarni (Chairman), Dr. Meenakshi Sundaram (Expert Member), Regional Officer (Convener).
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-slate-300 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700"
                >
                  Confirm &amp; Issue EVC Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

