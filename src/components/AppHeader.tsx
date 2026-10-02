'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  RefreshCw,
  Plus,
  CheckCircle2,
  Menu
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useBrand } from '@/context/BrandContext';
import { LanguageToggle } from '@/components/LanguageToggle';

interface AppHeaderProps {
  onOpenNewOrder: () => void;
  onToggleMobileMenu?: () => void;
}

export function AppHeader({ onOpenNewOrder, onToggleMobileMenu }: AppHeaderProps) {
  const pathname = usePathname();
  const { t, isRtl } = useLanguage();
  const brand = useBrand();
  const { client, city } = brand;
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedRecently, setSyncedRecently] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedRecently(true);
      setTimeout(() => setSyncedRecently(false), 2000);
    }, 600);
  };

  const getBreadcrumb = () => {
    switch (pathname) {
      case '/orders':
        return isRtl ? 'إدارة الشحنات / قائمة التوزيع والمناديب' : 'Orders Workspace / Dispatch Console';
      case '/drivers':
        return isRtl ? 'الأسطول / سجل المناديب والسيارات' : 'Fleet Directory / Driver Allocation';
      case '/stores':
        return isRtl ? 'المتاجر والشركاء / بوابات الربط' : 'Merchant Accounts / Store Directory';
      case '/treasury':
        return isRtl ? 'المالية / حركة الخزينة والتحصيلات' : 'Financial Ledger / COD Vault & Wallets';
      case '/track':
        return isRtl ? 'بوابة العملاء / تتبع مسار الشحنات' : 'Public Tracking / Consignment Milestones';
      default:
        return isRtl ? 'مركز العمليات الرئيسي / المراقبة الحية' : 'Operations Hub / Real-time Overview';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 print:hidden">
      {/* Top Operational Status Strip (Requirement 5) */}
      <div className="bg-[#1A0B1A] text-pink-200 text-xs py-1.5 px-3 sm:px-6 flex items-center justify-between border-b border-[#3B153C]">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex-shrink-0 flex h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
          <span className="font-semibold text-white tracking-wide text-[10px] sm:text-[11px] truncate">
            {isRtl
              ? `✦ معاينة معمارية خاصة — مخصصة لـ ${client} (عمليات أسطول ${city}). البيئة التفاعلية الحية مفعلة.`
              : `✦ PRIVATE ARCHITECTURE PREVIEW — Configured for ${client} (${city} Fleet Operations). Live state enabled.`}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2.5 text-[11px] text-pink-300/80 flex-shrink-0">
          <span>{client} • {city} Hub</span>
          <span className="text-pink-400/40">•</span>
          <span className="font-mono text-pink-200">v3.4-PRO</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-3 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile Menu Toggle + Breadcrumbs */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors flex-shrink-0"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex flex-col min-w-0">
            <div className="text-[11px] text-slate-500 font-medium tracking-wide truncate">
              {getBreadcrumb()}
            </div>
            <div className="text-sm sm:text-base md:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2 truncate">
              <span className="truncate">{client} Fleet Command</span>
              <span className="text-xs font-normal text-slate-500 hidden xl:inline truncate">
                ({isRtl ? `نظام إدارة وتوزيع الأسطول — مركز ${city}` : `Enterprise Logistics Engine — ${city} Hub`})
              </span>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Language Toggle */}
          <LanguageToggle />

          {/* Sync Engine Shortcut */}
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              syncedRecently
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Synchronize dispatch pipeline"
          >
            {syncedRecently ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <RefreshCw
                className={`w-3.5 h-3.5 text-slate-500 ${isSyncing ? 'animate-spin text-pink-600' : ''}`}
              />
            )}
            <span className="hidden sm:inline">
              {syncedRecently ? (isRtl ? 'تم التحديث' : 'Synced') : t('sync_now')}
            </span>
          </button>

          {/* New Order Button */}
          <button
            type="button"
            onClick={onOpenNewOrder}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-[#51122F] to-[#751B44] hover:from-[#65173B] hover:to-[#8B2D4C] rounded-lg shadow-sm border border-pink-400/30 transition-all active:scale-95 flex-shrink-0"
          >
            <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t('new_order')}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
