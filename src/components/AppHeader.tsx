'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  RefreshCw,
  Plus,
  Search,
  Bell,
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';

interface AppHeaderProps {
  onOpenNewOrder: () => void;
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export function AppHeader({ onOpenNewOrder, onSearch, searchQuery = '' }: AppHeaderProps) {
  const pathname = usePathname();
  const { t, isRtl } = useLanguage();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedRecently, setSyncedRecently] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedRecently(true);
      setTimeout(() => setSyncedRecently(false), 2500);
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
      {/* Top Operational Sandbox Strip */}
      <div className="bg-[#1A0B1A] text-pink-200 text-xs py-1.5 px-6 flex items-center justify-between border-b border-[#3B153C]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
          <span className="font-semibold text-white tracking-wide text-[11px]">
            {isRtl
              ? '✦ بيئة تشغيلية تفاعلية حية — مهندسة لشركات الشحن والأسطول في الخليج العربي. انقر للتفاعل.'
              : '✦ LIVE OPERATIONAL SANDBOX — Engineered for GCC Courier & Last-Mile Fleets. Click any order or metric to interact.'}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-pink-300/80">
          <span>Speedoo Qatar Node • GCC Fast Dispatch</span>
          <span className="text-pink-400/40">•</span>
          <span className="font-mono text-pink-200">v3.4-PRO</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Breadcrumb & Title */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="text-xs text-slate-600 font-medium tracking-wide">
              {getBreadcrumb()}
            </div>
            <div className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{t('system_title')}</span>
              <span className="text-xs font-normal text-slate-600 hidden md:inline">
                ({t('system_sub')})
              </span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          {/* Instant Language Switcher */}
          <LanguageToggle />

          {/* Sync Engine Shortcut */}
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              syncedRecently
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
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
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#51122F] to-[#751B44] hover:from-[#65173B] hover:to-[#8B2D4C] rounded-lg shadow-sm shadow-maroon-900/20 border border-pink-400/30 transition-all hover:shadow active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{t('new_order')}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
