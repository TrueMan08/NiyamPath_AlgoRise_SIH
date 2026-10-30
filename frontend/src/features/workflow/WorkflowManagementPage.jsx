import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import {
  GitBranch,
  Layers,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Info
} from 'lucide-react';

export const WorkflowManagementPage = () => {
  const { workflowRoutes, applications } = useApp();
  const [selectedRouteId, setSelectedRouteId] = useState('ROUTE-02');

  const selectedRoute = workflowRoutes.find(r => r.id === selectedRouteId) || workflowRoutes[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Engine Architecture
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mt-1">Configurable Workflow Routes</h1>
        <p className="text-xs text-slate-500">
          AICTE approval applications follow distinct routes depending on category and requirements. NiyamPath supports dynamic workflow routing without hardcoding sequences.
        </p>
      </div>

      {/* Advisory Banner regarding official AICTE documentation */}
      <div className="bg-slate-100 border-l-4 border-slate-700 p-3 rounded-r text-xs text-slate-700 flex items-start space-x-2">
        <Info className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong>Configurable Architecture Notice:</strong> These representative stages (Scrutiny Only, Scrutiny + EVC, EVC + SAC/SHC) demonstrate routing flexibility. Official regulatory routes are configured based on verified AICTE Approval Process Handbook (APH) regulations.
        </div>
      </div>

      {/* Route Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workflowRoutes.map((route) => {
          const isSelected = route.id === selectedRouteId;
          return (
            <button
              key={route.id}
              onClick={() => setSelectedRouteId(route.id)}
              className={`p-4 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'bg-white border-blue-600 shadow-md ring-1 ring-blue-600'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-slate-400 font-bold">{route.id}</span>
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded">
                  {route.stages.length} Stages
                </span>
              </div>
              <h2 className="text-xs font-bold text-slate-900 mb-1">{route.name}</h2>
              <p className="text-[11px] text-slate-500 leading-relaxed">{route.description}</p>
            </button>
          );
        })}
      </div>

      {/* Active Route Visualizer */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs text-blue-700 font-bold">{selectedRoute.id}</span>
            <span className="text-xs text-slate-400">•</span>
            <h2 className="text-sm font-bold text-slate-900">{selectedRoute.name}</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{selectedRoute.description}</p>
        </div>

        {/* Horizontal Visual Pipeline */}
        <div className="overflow-x-auto py-4">
          <div className="flex items-center min-w-max space-x-3">
            {selectedRoute.stages.map((stage, idx) => (
              <React.Fragment key={idx}>
                <div className="bg-slate-50 border border-slate-300 rounded-lg p-3 w-44 text-center space-y-1 shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Stage {idx + 1}
                  </span>
                  <div className="font-bold text-xs text-slate-800">{stage}</div>
                  <span className="text-[10px] text-blue-600 font-semibold block">
                    SLA: {stage.includes('Scrutiny') ? '7 Days' : stage.includes('EVC') ? '14 Days' : '10 Days'}
                  </span>
                </div>
                {idx < selectedRoute.stages.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Applications currently processing on this route */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-sm font-bold text-slate-900">Applications Routed Through {selectedRoute.name}</h2>
        </div>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <th className="py-2.5 px-4">Application ID</th>
              <th className="py-2.5 px-4">Institution</th>
              <th className="py-2.5 px-4">Current Stage</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4">Days in Stage</th>
              <th className="py-2.5 px-4 text-right">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {applications.filter(a => a.workflowRoute.toLowerCase().includes(selectedRoute.name.split(' ')[0].toLowerCase())).map((app) => (
              <tr key={app.id} className="hover:bg-slate-50/80">
                <td className="py-3 px-4 font-mono font-medium text-blue-700">{app.applicationNumber}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{app.institutionName}</td>
                <td className="py-3 px-4 text-slate-700">{app.currentStage}</td>
                <td className="py-3 px-4">
                  <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {app.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-500">{app.daysPending} days</td>
                <td className="py-3 px-4 text-right">
                  <Link
                    to={`/applications/${app.id}`}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    View Timeline →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

