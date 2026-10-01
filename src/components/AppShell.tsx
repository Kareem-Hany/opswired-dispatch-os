'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PackageSearch,
  Truck,
  WalletCards,
  Navigation,
  Plus
} from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { DispatchProvider, useDispatch } from '@/context/DispatchContext';
import { Sidebar } from '@/components/Sidebar';
import { AppHeader } from '@/components/AppHeader';
import { DemoWatermark } from '@/components/DemoWatermark';
import { NewOrderModal } from '@/components/NewOrderModal';

function AppShellContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isRtl, t } = useLanguage();
  const { metrics } = useDispatch();
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isStandalonePage = pathname.startsWith('/track') || pathname.startsWith('/invoice');

  const bottomNavItems = [
    { href: '/', label: isRtl ? 'الرئيسية' : 'Hub', icon: LayoutDashboard },
    { href: '/orders', label: isRtl ? 'الشحنات' : 'Orders', icon: PackageSearch, badge: metrics.total },
    { href: '/drivers', label: isRtl ? 'الأسطول' : 'Fleet', icon: Truck },
    { href: '/treasury', label: isRtl ? 'الخزينة' : 'Treasury', icon: WalletCards },
    { href: '/track', label: isRtl ? 'التتبع' : 'Track', icon: Navigation }
  ];

  if (isStandalonePage) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased">
        <div className="flex-1 flex flex-col min-h-screen">
          {children}
          <DemoWatermark />
          <NewOrderModal
            isOpen={isNewOrderOpen}
            onClose={() => setIsNewOrderOpen(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased">
      <div className="flex flex-1 min-h-screen">
        {/* Desktop Fixed Sidebar */}
        <div className="hidden lg:flex flex-shrink-0 h-screen sticky top-0">
          <Sidebar />
        </div>

        {/* Mobile Slide-Over Drawer with Backdrop */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <div
              className={`relative flex-1 flex flex-col max-w-xs w-full bg-[#1A0B1A] h-full shadow-2xl z-10 animate-in ${
                isRtl ? 'slide-in-from-right' : 'slide-in-from-left'
              } duration-200`}
            >
              <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader
            onOpenNewOrder={() => setIsNewOrderOpen(true)}
            onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          />
          <main className="flex-1 p-3 sm:p-5 md:p-6 pb-24 lg:pb-6 max-w-7xl w-full mx-auto space-y-5 sm:space-y-6">
            {children}
          </main>
          <DemoWatermark />
          <NewOrderModal
            isOpen={isNewOrderOpen}
            onClose={() => setIsNewOrderOpen(false)}
          />
        </div>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar (< 1024px) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around shadow-lg print:hidden">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-semibold transition-all relative ${
                isActive ? 'text-[#51122F]' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-[#51122F] text-white text-[9px] font-bold px-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-0.5">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#51122F] mt-0.5" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <DispatchProvider>
        <AppShellContent>{children}</AppShellContent>
      </DispatchProvider>
    </LanguageProvider>
  );
}
