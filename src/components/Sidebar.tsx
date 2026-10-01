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
  Radio
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';

export function Sidebar() {
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
      className={`w-64 bg-[#1A0B1A] text-slate-300 flex flex-col flex-shrink-0 min-h-screen border-r border-[#341834] select-none print:hidden`}
      style={{
        background: 'linear-gradient(180deg, #1C0B1B 0%, #120713 100%)'
      }}
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8B2D4C] to-[#51122F] flex items-center justify-center p-1.5 shadow-md shadow-maroon-950/40 border border-white/20">
            {/* Speedoo mark or icon */}
            <img
              src="/brand/logo-mark.png"
              alt="Speedoo Logo"
              className="w-full h-full object-contain filter brightness-110 drop-shadow"
              onError={(e) => {
                // fallback to high-tech dispatch glyph
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-white tracking-tight">OpsWired</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#51122F] text-pink-200 font-semibold tracking-wide border border-pink-400/20">
                OS
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium tracking-tight">
              Speedoo Fleet Edition
            </span>
          </div>
        </Link>
      </div>

      {/* Fleet Node Status Pill */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs">
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

      {/* Sandbox Controls & Sound Bar */}
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
              {soundEnabled ? (isRtl ? 'صوت التنبيه: مفعّل' : 'Audio: On') : (isRtl ? 'الصوت: معطّل' : 'Audio: Off')}
            </span>
          </button>

          <button
            type="button"
            onClick={resetSandbox}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-300 transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
            title={t('reset_sandbox')}
          >
            <RotateCcw className="w-3 h-3" />
            <span className="text-[11px]">{isRtl ? 'استعادة' : 'Reset'}</span>
          </button>
        </div>

        {/* Sandbox Indicator */}
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 text-[11px] text-slate-400 leading-snug">
          <div className="flex items-center gap-1.5 text-pink-300 font-semibold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
            <span>{isRtl ? 'بيئة تجريبية معزولة' : 'Zero-Maintenance Sandbox'}</span>
          </div>
          <p className="text-[10px] text-slate-400">
            {isRtl
              ? 'جميع التعديلات والمناديب تُحفظ محلياً دون التأثير على قواعد البيانات الحقيقية.'
              : 'Interactive mutations persist safely in your browser state with instant feedback.'}
          </p>
        </div>
      </div>
    </aside>
  );
}
