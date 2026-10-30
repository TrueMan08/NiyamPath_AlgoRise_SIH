import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer, ExternalLink, ShieldCheck } from 'lucide-react';

export const ResearchReportPage = () => {
  const iframeRef = useRef(null);

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xs font-bold text-white tracking-wide">
                NiyamPath Technical Research Report
              </h1>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                SIH 2026 Problem Statement 26262 • Team AlgoRise
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
          <a
            href="/report.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded transition-colors"
            title="Open Raw HTML in New Tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Raw HTML</span>
          </a>
        </div>
      </header>

      {/* Embedded Document Viewport */}
      <main className="flex-1 w-full bg-slate-100 flex justify-center">
        <iframe
          ref={iframeRef}
          src="/report.html"
          title="NiyamPath Research Report"
          className="w-full h-[calc(100vh-3.5rem)] border-none shadow-sm"
        />
      </main>
    </div>
  );
};
