import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  FileText,
  ScanSearch,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Eye,
  Check,
  X
} from 'lucide-react';

export const DocumentScrutinyPage = () => {
  const {
    documents,
    isAiAnalyzing,
    aiAnalysisResult,
    runSimulatedAiAnalysis,
    issueDeficiencyFromAi,
    deficiencies
  } = useApp();

  const [selectedDocId, setSelectedDocId] = useState('DOC-902');
  const [deficiencyIssued, setDeficiencyIssued] = useState(false);

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  const handleRunAi = () => {
    runSimulatedAiAnalysis(selectedDocId);
    setDeficiencyIssued(false);
  };

  const handleIssueDeficiency = (finding) => {
    issueDeficiencyFromAi('APP-2026-001', {
      category: "Expired Safety Certificate",
      severity: "HIGH",
      text: finding.text
    });
    setDeficiencyIssued(true);
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto h-[calc(100vh-6.5rem)] flex flex-col">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex-shrink-0">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Workstream C: Document Intelligence
            </span>
            <span className="text-xs text-slate-400">|</span>
            <span className="text-xs text-slate-500 font-mono">Application AICTE-2026-N-8841</span>
          </div>
          <h1 className="text-lg font-bold text-slate-900 mt-0.5">
            AI-Assisted Document Scrutiny &amp; Verification Desk
          </h1>
        </div>

        {/* Action button */}
        <button
          onClick={handleRunAi}
          disabled={isAiAnalyzing}
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold px-4 py-2 rounded transition-colors shadow-sm self-start sm:self-auto"
        >
          <Sparkles className={`w-4 h-4 ${isAiAnalyzing ? 'animate-spin' : ''}`} />
          <span>{isAiAnalyzing ? 'Analyzing Document with AI...' : 'Run AI Analysis on Document'}</span>
        </button>
      </div>

      {/* 3-Pane Scrutiny Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-hidden">
        
        {/* PANE 1: Document List (Left - 3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="p-3 border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Submitted Documents</span>
            <span className="text-slate-400 font-normal">({documents.length})</span>
          </div>

          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {documents.map((doc) => {
              const isSelected = doc.id === selectedDocId;
              return (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDocId(doc.id);
                    setDeficiencyIssued(false);
                  }}
                  className={`w-full text-left p-3 text-xs transition-colors flex flex-col space-y-1 ${
                    isSelected
                      ? 'bg-blue-50/80 border-l-4 border-blue-600 text-blue-900'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 font-semibold">{doc.id}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      doc.validityStatus === 'VALID'
                        ? 'bg-emerald-50 text-emerald-700'
                        : doc.validityStatus === 'EXPIRED'
                        ? 'bg-red-50 text-red-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {doc.validityStatus}
                    </span>
                  </div>
                  <div className="font-semibold truncate">{doc.title}</div>
                  <div className="text-[11px] text-slate-500 truncate">{doc.category}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* PANE 2: Simulated Document Preview (Center - 5 cols) */}
        <div className="lg:col-span-5 bg-slate-100 rounded-lg border border-slate-300 shadow-inner flex flex-col overflow-hidden">
          {/* Document Viewer Header */}
          <div className="bg-slate-800 text-white px-4 py-2 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2 truncate">
              <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="font-medium truncate">{selectedDoc.fileName}</span>
            </div>
            <span className="text-slate-400 text-[11px]">Page 3 of 3 • Zoom: 100%</span>
          </div>

          {/* Document Preview Canvas */}
          <div className="flex-1 overflow-y-auto p-4 flex justify-center">
            <div className="w-full max-w-md bg-white shadow-md border border-slate-300 p-6 text-slate-800 text-xs font-serif space-y-4">
              
              <div className="text-center border-b border-slate-200 pb-3">
                <div className="text-[10px] uppercase tracking-widest text-slate-400 font-sans">
                  Government Registered Structural Consultant
                </div>
                <div className="text-sm font-bold mt-1 text-slate-900 font-sans">
                  FORM NO. STR-04: STRUCTURAL FITNESS CERTIFICATE
                </div>
                <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                  Reference Standard: National Building Code of India (NBC 2016 Part 6)
                </div>
              </div>

              <div className="space-y-2 text-[11px] leading-relaxed">
                <p>
                  This is to certify that the institutional building premises of <strong>Aryavart Institute of Technology</strong>, situated at Sector 14, Institutional Area, Greater Noida, comprising Academic Blocks A, B, and Central Workshop, was physically inspected on <strong>10 August 2023</strong>.
                </p>
                <p>
                  The building structure has been evaluated and complies with earthquake-resistant seismic zone IV provisions and structural load tolerances as mandated by the municipal council.
                </p>
              </div>

              <div className="bg-amber-50 p-3 rounded border border-amber-300 text-[11px] font-sans">
                <div className="font-bold text-amber-900 flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Validity &amp; Expiry Clause</span>
                </div>
                <div className="mt-1 text-amber-800">
                  This safety certificate is valid for a period of exactly 36 (thirty-six) months from inspection and shall expire on:
                  <strong className="block text-red-700 text-xs mt-0.5 font-mono">
                    31st August 2026 (EXPIRED)
                  </strong>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex justify-between items-end font-sans text-[10px] text-slate-500">
                <div>
                  Date of Issue: 15-Aug-2023<br />
                  Seal: UP Municipal Structural Board
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">Er. V. K. Aggarwal</div>
                  Chartered Structural Engineer<br />
                  Reg. No. UP/SE/442
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* PANE 3: AI Intelligence & Scrutiny Panel (Right - 4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          
          <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Extraction &amp; Scrutiny</span>
            </div>
            {aiAnalysisResult && (
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Confidence 98%
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            
            {/* Advisory Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded p-2.5 text-[11px] text-blue-900 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Advisory Assistant:</strong> AI-generated suggestions. Officer verification is mandatory before issuing official deficiency notices.
              </div>
            </div>

            {!aiAnalysisResult && !isAiAnalyzing && (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ScanSearch className="w-6 h-6" />
                </div>
                <div className="text-xs text-slate-600 font-semibold">
                  No Active Analysis for Selected Document
                </div>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Click "Run AI Analysis on Document" to trigger OCR parsing, metadata extraction, and mandatory checklist comparison.
                </p>
                <button
                  onClick={handleRunAi}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors"
                >
                  Analyze Document Now
                </button>
              </div>
            )}

            {isAiAnalyzing && (
              <div className="text-center py-12 space-y-3">
                <Sparkles className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
                <div className="text-xs font-semibold text-slate-800">
                  Processing PDF Document...
                </div>
                <div className="text-[11px] text-slate-500">
                  Parsing text vectors • Checking NBC 2016 norms • Calculating validity
                </div>
              </div>
            )}

            {aiAnalysisResult && !isAiAnalyzing && (
              <div className="space-y-4">
                
                {/* Extracted Metadata Card */}
                <div>
                  <h3 className="font-bold text-xs text-slate-800 mb-2">Extracted Metadata</h3>
                  <div className="space-y-1.5 bg-slate-50 p-2.5 rounded border border-slate-200">
                    {aiAnalysisResult.extractedMetadata.map((field, i) => (
                      <div key={i} className="flex justify-between items-start text-[11px]">
                        <span className="text-slate-500">{field.field}:</span>
                        <span className={`font-semibold text-right ${field.match ? 'text-slate-800' : 'text-red-600 font-bold'}`}>
                          {field.value}
                          {field.warning && <span className="block text-[10px] text-red-600 font-normal">⚠️ {field.warning}</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checklist Verification Card */}
                <div>
                  <h3 className="font-bold text-xs text-slate-800 mb-2">Mandatory AICTE Checklist Findings</h3>
                  <div className="space-y-1.5">
                    {aiAnalysisResult.checklistFindings.map((check, i) => (
                      <div
                        key={i}
                        className={`p-2 rounded text-[11px] flex items-start space-x-2 border ${
                          check.passed
                            ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                            : 'bg-red-50/60 border-red-200 text-red-900'
                        }`}
                      >
                        {check.passed ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="font-semibold">{check.check}</div>
                          <div className="text-[10px] opacity-80">{check.note}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Draft Scrutiny Observations */}
                <div>
                  <h3 className="font-bold text-xs text-slate-800 mb-2">Draft Scrutiny Observation</h3>
                  {aiAnalysisResult.suggestedObservations.map((obs, i) => (
                    <div key={i} className="bg-amber-50 p-3 rounded border border-amber-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[10px] uppercase text-amber-900 bg-amber-200/60 px-1.5 py-0.5 rounded">
                          {obs.category}
                        </span>
                        <span className="text-[10px] font-bold text-red-700">HIGH PRIORITY</span>
                      </div>
                      <p className="text-[11px] text-slate-800 leading-relaxed font-sans">
                        {obs.text}
                      </p>
                      <div className="text-[10px] text-slate-500 border-t border-amber-200 pt-1">
                        <strong>Action:</strong> {obs.suggestedAction}
                      </div>

                      {/* Human in the loop action */}
                      <div className="pt-2">
                        {deficiencyIssued ? (
                          <div className="bg-emerald-100 text-emerald-800 p-2 rounded text-center text-xs font-bold flex items-center justify-center space-x-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Official Deficiency Notice Issued</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleIssueDeficiency(obs)}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-3 rounded text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-sm"
                          >
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>Accept &amp; Issue Official Deficiency</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

