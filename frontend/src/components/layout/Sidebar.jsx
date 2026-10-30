import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  ScanSearch,
  GitBranch,
  CalendarCheck2,
  CheckCircle2,
  FolderArchive,
  BarChart3,
  BellRing,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = () => {
  const { notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Applications", path: "/applications", icon: FileText },
    { label: "AI Document Scrutiny", path: "/scrutiny", icon: ScanSearch, badge: "AI" },
    { label: "Workflow Routes", path: "/workflow", icon: GitBranch },
    { label: "EVC Inspections", path: "/evc", icon: CalendarCheck2 },
    { label: "Compliance & Undertakings", path: "/compliance", icon: CheckCircle2 },
    { label: "Document Registry", path: "/documents", icon: FolderArchive },
    { label: "Reports & Analytics", path: "/reports", icon: BarChart3 },
    { label: "Notifications", path: "/notifications", icon: BellRing, count: unreadCount },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 min-h-[calc(100vh-4rem)] flex flex-col justify-between border-r border-slate-800">
      <div className="py-4">
        <div className="px-5 mb-3 text-[11px] font-bold uppercase tracking-wider text-slate-300">
          Regulatory Modules
        </div>
        <nav className="space-y-0.5 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 text-xs font-medium rounded transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-blue-800 text-blue-200 text-[10px] font-bold px-1.5 py-0.2 rounded border border-blue-700">
                    {item.badge}
                  </span>
                )}
                {item.count > 0 && (
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Info Box */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="text-[11px] text-slate-300 leading-tight mb-2">
          <strong>AICTE Regulation Bureau</strong><br/>
          Smart Automation System
        </div>
        <Link
          to="/report"
          className="inline-flex items-center space-x-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>View Research Report</span>
        </Link>
      </div>
    </aside>
  );
};

