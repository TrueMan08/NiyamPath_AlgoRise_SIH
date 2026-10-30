import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { PrototypeBadge } from '../common/PrototypeBadge';
import { AiAssistantDrawer } from '../../features/ai/assistant/AiAssistantDrawer';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <PrototypeBadge />
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <AiAssistantDrawer />
    </div>
  );
};

