import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  BellRing,
  CheckCircle2,
  AlertTriangle,
  CalendarCheck2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Flame
} from 'lucide-react';

export const NotificationsPage = () => {
  const { notifications, markNotificationRead } = useApp();
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [escalationTriggered, setEscalationTriggered] = useState(false);

  const filteredNotifs = notifications.filter(n => {
    if (filterPriority === 'ALL') return true;
    return n.priority === filterPriority;
  });

  const handleSimulateEscalation = () => {
    setEscalationTriggered(true);
    setTimeout(() => setEscalationTriggered(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Module 7: Alert Management
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">Notification &amp; Escalation Center</h1>
          <p className="text-xs text-slate-500">
            Real-time regulatory alerts, deficiency warnings, statutory deadline notifications, and hierarchical SLA escalations.
          </p>
        </div>

        {/* Demo Escalation Trigger */}
        <button
          onClick={handleSimulateEscalation}
          className="inline-flex items-center space-x-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3.5 py-2 rounded transition-colors shadow-sm self-start sm:self-auto"
        >
          <Flame className="w-4 h-4" />
          <span>Simulate SLA Escalation</span>
        </button>
      </div>

      {escalationTriggered && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r shadow-sm text-xs text-red-900 space-y-1 animate-fadeIn">
          <div className="font-bold flex items-center space-x-1.5 text-red-800">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Automated Level-2 Bureau Escalation Dispatched</span>
          </div>
          <p>
            Application AICTE-2026-W-4219 pending in EVC stage exceeded the 14-day SLA threshold. Automated notification escalated to Regional Director (WRO Mumbai) and Regulation Bureau Chief.
          </p>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex items-center space-x-2 text-xs border-b border-slate-200 pb-2">
        <span className="text-slate-400 font-medium">Filter by Priority:</span>
        {['ALL', 'HIGH', 'MEDIUM'].map((pri) => (
          <button
            key={pri}
            onClick={() => setFilterPriority(pri)}
            className={`px-3 py-1 rounded-full font-semibold transition-colors ${
              filterPriority === pri
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {pri}
          </button>
        ))}
      </div>

      {/* Notification Cards */}
      <div className="space-y-3">
        {filteredNotifs.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-lg border transition-all flex items-start justify-between gap-4 ${
              n.read
                ? 'bg-white border-slate-200 text-slate-700'
                : 'bg-blue-50/50 border-blue-200 shadow-sm'
            }`}
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center space-x-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  n.priority === 'HIGH'
                    ? 'bg-red-100 text-red-800 border border-red-200'
                    : 'bg-slate-200 text-slate-800'
                }`}>
                  {n.priority} PRIORITY
                </span>
                <span className="text-xs font-semibold text-slate-400">•</span>
                <span className="text-xs font-mono text-slate-500 font-semibold">{n.category}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-[11px] text-slate-400">
                  {new Date(n.timestamp).toLocaleString()}
                </span>
              </div>

              <h2 className="text-xs font-bold text-slate-900">{n.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{n.message}</p>
            </div>

            <div className="flex flex-col items-end space-y-2 flex-shrink-0">
              <Link
                to={n.link}
                className="inline-flex items-center space-x-1 text-xs bg-white hover:bg-blue-600 hover:text-white px-3 py-1 rounded border border-slate-200 text-blue-700 font-semibold transition-colors shadow-2xs"
              >
                <span>Open Record</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              {!n.read && (
                <button
                  onClick={() => markNotificationRead(n.id)}
                  className="text-[11px] text-slate-400 hover:text-slate-600"
                >
                  Mark as read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

