import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { ShieldCheck, Bell, Bot, ChevronDown, User } from 'lucide-react';

export const Header = () => {
  const { currentUser, switchRole, demoUsers, notifications, setIsAiAssistantOpen } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Title */}
        <div className="flex items-center space-x-3">
          <Link to="/dashboard" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-lg tracking-tight leading-none text-white">
                NiyamPath
              </div>
              <div className="text-[10px] uppercase tracking-wider text-slate-300 font-medium">
                AICTE Regulatory Workflow Platform
              </div>
            </div>
          </Link>
          <span className="hidden md:inline-block text-xs bg-slate-800 text-slate-300 px-2.5 py-0.5 rounded border border-slate-700">
            SIH 2026 | PS 26262
          </span>
        </div>

        {/* Right side controls: Role Switcher, AI Assistant, Notifications, User */}
        <div className="flex items-center space-x-3">
          
          {/* AI Assistant Pill */}
          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors shadow-sm"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Regulatory Assistant</span>
          </button>

          {/* Notifications */}
          <Link
            to="/notifications"
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-amber-500 text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Role Switcher Dropdown */}
          <div className="relative group">
            <div className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded cursor-pointer border border-slate-700 transition-colors">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <div className="text-left hidden lg:block">
                <div className="text-xs font-semibold leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400 leading-tight">{currentUser.roleLabel}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-1 w-64 bg-white text-slate-800 rounded-md shadow-lg border border-slate-200 py-1.5 hidden group-hover:block z-50">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-wider border-b border-slate-100">
                Switch Simulated Demo Role
              </div>
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => switchRole(user.id)}
                  className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-50 transition-colors ${
                    currentUser.id === user.id ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600' : ''
                  }`}
                >
                  <span className="font-medium text-slate-900">{user.name}</span>
                  <span className="text-[11px] text-slate-500">{user.roleLabel}</span>
                  <span className="text-[10px] text-slate-600 truncate">{user.department}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};

