import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { AI_ASSISTANT_KNOWLEDGE } from '../../../utils/mockData';
import { Bot, X, Send, BookOpen, AlertCircle, Sparkles } from 'lucide-react';

export const AiAssistantDrawer = () => {
  const { isAiAssistantOpen, setIsAiAssistantOpen } = useApp();
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Welcome to the NiyamPath AI Regulatory Assistant. Ask questions regarding AICTE Approval Process Handbook (APH) guidelines, institutional application status, or compliance rules.',
      citation: null
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isAiAssistantOpen) return null;

  const handleSend = (queryText) => {
    const text = queryText || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulated RAG retrieval delay
    setTimeout(() => {
      // Find matching or relevant answer from knowledge base
      const matched = AI_ASSISTANT_KNOWLEDGE.find(k => 
        text.toLowerCase().includes('land') && k.query.toLowerCase().includes('land') ||
        text.toLowerCase().includes('deficiency') && k.query.toLowerCase().includes('deficiency') ||
        text.toLowerCase().includes('document') && k.query.toLowerCase().includes('document') ||
        text.toLowerCase().includes('evc') && k.query.toLowerCase().includes('evc')
      ) || AI_ASSISTANT_KNOWLEDGE[0];

      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: matched.response,
          citation: matched.citation
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  const sampleQuestions = [
    "What documents are required for Extension of Approval (EOA)?",
    "What is the mandatory land requirement for an engineering college in a Mega/Metro city?",
    "Summarize the deficiency identified for Aryavart Institute of Technology (AICTE-2026-N-8841).",
    "What are the rules regarding appointment of Expert Visit Committee (EVC)?"
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-wide">AI Regulatory Assistant</h3>
            <p className="text-xs text-slate-300">Grounded in AICTE APH 2024-2027 Guidelines</p>
          </div>
        </div>
        <button 
          onClick={() => setIsAiAssistantOpen(false)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Advisory Banner */}
      <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 flex items-start space-x-2 text-xs text-blue-900">
        <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <span>
          <strong>Assistive RAG Mode:</strong> Pre-loaded demonstration knowledge base. Citations indicate verified handbook clauses.
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[90%] rounded-lg px-3.5 py-2.5 text-xs leading-relaxed ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-800 border border-slate-200'
              }`}
            >
              {msg.text}
            </div>
            {msg.citation && (
              <div className="mt-1 flex items-center space-x-1 text-[11px] text-slate-500 max-w-[90%]">
                <BookOpen className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                <span className="truncate"><strong>Source:</strong> {msg.citation}</span>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded border border-slate-100 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span>Retrieving regulatory guidelines...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-2 bg-slate-50 border-t border-slate-200">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          Suggested Queries
        </div>
        <div className="flex flex-col space-y-1">
          {sampleQuestions.slice(0, 3).map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-left text-xs text-blue-700 hover:text-blue-900 hover:underline bg-white px-2 py-1.5 rounded border border-slate-200 truncate"
            >
              • {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a regulatory or application question..."
          className="flex-1 border border-slate-300 rounded px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
        />
        <button
          onClick={() => handleSend()}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

