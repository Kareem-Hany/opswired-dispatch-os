'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LanguageProvider } from '@/context/LanguageContext';
import { DispatchProvider } from '@/context/DispatchContext';
import { Sidebar } from '@/components/Sidebar';
import { AppHeader } from '@/components/AppHeader';
import { DemoWatermark } from '@/components/DemoWatermark';
import { NewOrderModal } from '@/components/NewOrderModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);

  const isStandalonePage = pathname.startsWith('/track') || pathname.startsWith('/invoice');

  return (
    <LanguageProvider>
      <DispatchProvider>
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased">
          {isStandalonePage ? (
            // Full-width standalone view for customer tracking and printable waybills
            <div className="flex-1 flex flex-col min-h-screen">
              {children}
              <DemoWatermark />
              <NewOrderModal
                isOpen={isNewOrderOpen}
                onClose={() => setIsNewOrderOpen(false)}
              />
            </div>
          ) : (
            // Core Operations Workspace Layout with Dark Maroon Sidebar
            <div className="flex flex-1 min-h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col min-w-0">
                <AppHeader onOpenNewOrder={() => setIsNewOrderOpen(true)} />
                <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
                  {children}
                </main>
                <DemoWatermark />
                <NewOrderModal
                  isOpen={isNewOrderOpen}
                  onClose={() => setIsNewOrderOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </DispatchProvider>
    </LanguageProvider>
  );
}
