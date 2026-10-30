import React from 'react';

export const PrototypeBadge = () => {
  return (
    <div className="bg-slate-100 border-b border-slate-200 px-4 py-1 text-center text-xs text-slate-500 flex items-center justify-center space-x-2">
      <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
      <span className="font-semibold text-slate-700">Interactive Prototype</span>
      <span>|</span>
      <span>Demonstration Data &amp; Simulated Workflows</span>
      <span>|</span>
      <span>SIH 2026 Problem Statement 26262</span>
    </div>
  );
};

