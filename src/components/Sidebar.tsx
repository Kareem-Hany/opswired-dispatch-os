'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  PackageSearch,
  Truck,
  Store,
  WalletCards,
  Navigation,
  Volume2,
  VolumeX,
  RotateCcw,
  ShieldCheck,
  Radio,
  X
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t, isRtl } = useLanguage();
  const { metrics, soundEnabled, setSoundEnabled, resetSandbox } = useDispatch();

  const navItems = [
    {
      href: '/',
      label: t('nav_dashboard'),
      icon: LayoutDashboard,
      badge: null
    },
    {
      href: '/orders',
      label: t('nav_orders'),
      icon: PackageSearch,
      badge: metrics.total
    },
    {
      href: '/drivers',
      label: t('nav_drivers'),
      icon: Truck,
      badge: '4'
    },
    {
      href: '/stores',
      label: t('nav_stores'),
      icon: Store,
      badge: '4'
    },
    {
      href: '/treasury',
      label: t('nav_treasury'),
      icon: WalletCards,
      badge: null
    },
    {
      href: '/track',
      label: t('nav_tracking'),
      icon: Navigation,
      badge: 'Live'
    }
  ];

  return (
    <aside
      className="w-64 bg-[#1A0B1A] text-slate-300 flex flex-col flex-shrink-0 h-full border-r rtl:border-r-0 rtl:border-l border-[#341834] select-none"
      style={{
        background: 'linear-gradient(180deg, #1C0B1B 0%, #120713 100%)'
      }}
    >
      {/* Brand Header with New Official Speedoo Logo */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link
          href="/"
          onClick={onClose}
          className="flex flex-col gap-1 group block max-w-[190px]"
        >
          <img
            src="/brand/speedoo-logo-white.png"
            alt="Speedoo - On Time, Every Time"
            className="w-full h-auto object-contain filter drop-shadow hover:brightness-110 transition-all"
            onError={(e) => {
              // fallback
              e.currentTarget.src = '/brand/logo-full.png';
            }}
          />
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-[10px] text-pink-300/80 font-mono tracking-widest uppercase">
              OpsWired Dispatch OS
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Fleet Node Status Pill */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-300 font-medium text-[11px]">
              {isRtl ? 'عقدة الدوحة: متصلة 100%' : 'Doha Gateway: Active'}
            </span>
          </div>
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {isRtl ? 'لوحة التحكم والعمليات' : 'Core Dispatch Engine'}
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#51122F] to-[#751B44] text-white shadow-md shadow-[#51122F]/30 border border-pink-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-pink-300' : 'text-slate-400 group-hover:text-white'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge !== null && (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Operational Controls & Enterprise SLA Info */}
      <div className="p-4 border-t border-white/10 space-y-3 bg-black/20">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
            title={soundEnabled ? t('sound_enabled') : t('sound_disabled')}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="text-[11px]">
              {soundEnabled ? (isRtl ? 'الصوت: مفعّل' : 'Audio: On') : (isRtl ? 'الصوت: معطّل' : 'Audio: Off')}
            </span>
          </button>

          <button
            type="button"
            onClick={resetSandbox}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
            title={t('reset_sandbox')}
          >
            <RotateCcw className="w-3 h-3" />
            <span className="text-[11px]">{isRtl ? 'تحديث' : 'Refresh'}</span>
          </button>
        </div>

        {/* Enterprise Fleet SLA Indicator */}
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 text-[11px] text-slate-300 leading-snug">
          <div className="flex items-center gap-1.5 text-pink-300 font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
            <span>{isRtl ? 'معايير الأداء اللوجستي (SLA)' : 'Enterprise Dispatch SLA'}</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>{isRtl ? 'نسبة الالتزام بالمواعيد' : 'On-Time Fulfillment'}</span>
            <span className="font-mono text-emerald-400 font-bold">99.8%</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
