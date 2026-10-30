import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { BarChart3, TrendingUp, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ReportsAnalyticsPage = () => {
  const { analyticsData } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Module 8: Decision Analytics
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mt-1">
          Regulatory Reports &amp; Pendency Analytics
        </h1>
        <p className="text-xs text-slate-500">
          Executive insights on stage distribution, regional clearance velocity, and institutional compliance trends.
        </p>
      </div>

      {/* Analytics Notice */}
      <div className="bg-slate-100 border-l-4 border-slate-700 p-3 rounded-r text-xs text-slate-700">
        <strong>Demonstration Analytics:</strong> Visualizations rendered dynamically with Recharts using representative institutional approval dataset.
      </div>

      {/* Grid of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: STAGE DISTRIBUTION */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900">Application Pipeline Stage Distribution</h2>
            <span className="text-xs text-slate-400">Total: 424 Active</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.stageDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" angle={-25} textAnchor="end" interval={0} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: REGIONAL CLEARANCE VELOCITY */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900">Regional Workload &amp; Pendency Breakdown</h2>
            <span className="text-xs text-slate-400">5 AICTE Regional Bureaus</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.pendencyByRegion} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="region" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="cleared" name="Cleared" fill="#10b981" stackId="a" />
                <Bar dataKey="pending" name="In Process" fill="#0284c7" stackId="a" />
                <Bar dataKey="delayed" name="Delayed (>SLA)" fill="#f59e0b" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: MONTHLY SUBMISSION TRENDS */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900">Monthly Submissions vs Clearances</h2>
            <span className="text-xs text-slate-400">Academic Cycle 2026</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.monthlySubmissions} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="submissions" name="Submissions" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="cleared" name="Approvals Granted" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: COMPLIANCE STATUS BREAKDOWN */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900">Post-Approval Compliance Status</h2>
            <span className="text-xs text-slate-400">Institutional Undertakings</span>
          </div>
          <div className="h-64 flex flex-col justify-center space-y-3 px-4">
            {analyticsData.complianceStatusBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{item.status}</span>
                  <span className="text-slate-900">{item.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

