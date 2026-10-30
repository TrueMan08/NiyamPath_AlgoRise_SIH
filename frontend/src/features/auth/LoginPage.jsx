import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, UserCheck, Lock, ArrowRight, Info } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { demoUsers, switchRole } = useApp();
  const [email, setEmail] = useState('officer.sharma@aicte.gov.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleRoleSelect = (user) => {
    switchRole(user.id);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background subtle geometry */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 opacity-95 pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-9 h-9 text-white" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
          NiyamPath
        </h2>
        <p className="mt-1 text-center text-xs text-slate-300 font-medium uppercase tracking-wider">
          AICTE Regulation Bureau • Smart Automation Platform
        </p>
        <p className="mt-1 text-center text-xs text-blue-400 font-medium">
          SIH 2026 | Problem Statement 26262
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-lg sm:px-10 border border-slate-200">
          
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-900 flex items-start space-x-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Demonstration Access:</strong> Select any simulated role below for instant prototype access without credentials.
            </div>
          </div>

          {/* Quick Role Selection Buttons */}
          <div className="mb-6 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Select Demo Role
            </div>
            {demoUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleRoleSelect(user)}
                className="w-full text-left p-3 rounded border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    {user.name}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {user.roleLabel} • <span className="text-slate-400">{user.department}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400">Or Manual Form</span>
            </div>
          </div>

          {/* Standard Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-medium text-slate-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors shadow-sm"
            >
              Sign In to Platform
            </button>
          </form>

          <div className="mt-6 text-center text-[11px] text-slate-400">
            Interactive Prototype • Demonstration Data Only
          </div>

        </div>
      </div>
    </div>
  );
};

