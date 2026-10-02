'use client';

import React, { useState } from 'react';
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
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';
import { useBrand } from '@/context/BrandContext';

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const { t, isRtl } = useLanguage();
  const { metrics, soundEnabled, setSoundEnabled, resetSandbox } = useDispatch();
  const brand = useBrand();
  const { client, city, isCustomClient, domainFavicon, createHref } = brand;
  const [faviconFailed, setFaviconFailed] = useState(false);

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
      {/* Brand Header with Dynamic Client Personalization */}
      <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
        <Link
          href={createHref('/')}
          onClick={onClose}
          className="flex flex-col gap-1 group block max-w-[200px]"
        >
          {isCustomClient ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                {domainFavicon && !faviconFailed ? (
                  <img
                    src={domainFavicon}
                    alt={client}
                    className="w-7 h-7 rounded-lg object-contain bg-white/15 p-1 border border-white/20 shadow-sm flex-shrink-0"
                    onError={() => setFaviconFailed(true)}
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-[#751B44] text-white flex items-center justify-center font-bold text-xs shadow-md border border-pink-400/40 flex-shrink-0">
                    {client.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-sm font-extrabold text-white tracking-tight truncate leading-tight group-hover:text-pink-300 transition-colors">
                    {client} Fleet Command
                  </div>
                  <div className="text-[10px] text-pink-300/80 font-mono tracking-wider truncate">
                    Enterprise Dispatch OS • {city} Hub
                  </div>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 text-[9px] text-slate-400">
                <Sparkles className="w-2.5 h-2.5 text-pink-400" />
                <span>Architecture by OpsWired / Kareem Kreations</span>
              </div>
            </div>
          ) : (
            <>
              <img
                src="/brand/speedoo-logo-white.png"
                alt="Speedoo - On Time, Every Time"
                className="w-full h-auto object-contain filter drop-shadow hover:brightness-110 transition-all max-h-8 object-left"
                onError={(e) => {
                  e.currentTarget.src = '/brand/logo-full.png';
                }}
              />
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] text-pink-300/80 font-mono tracking-widest uppercase truncate">
                  OpsWired Dispatch OS • {city} Hub
                </span>
              </div>
            </>
          )}
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

      {/* Dynamic Fleet Node Status Pill */}
      <div className="px-4 pt-3.5 pb-2">
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-300 font-medium text-[11px] truncate">
              {isRtl ? `عقدة ${city}: متصلة 100%` : `${city} Gateway: Active`}
            </span>
          </div>
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse flex-shrink-0" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {isRtl ? 'لوحة التحكم والعمليات' : 'Core Dispatch Engine'}
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={createHref(item.href)}
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

      {/* Operational Controls & Permanent Footer Attribution (Bug 1 & 3 Resolved) */}
      <div className="p-3.5 sm:p-4 border-t border-white/10 space-y-3 bg-black/20">
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

        {/* Permanent Sidebar Footer Attribution (Replaces Floating Watermark) */}
        <div className="pt-1 border-t border-white/5">
          <a
            href="https://kareemkreations.com/proposal/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] text-slate-300 hover:text-white transition-all shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 group-hover:bg-amber-300 animate-pulse" />
              <span className="font-medium tracking-wide">
                {isRtl ? 'تصميم وهندسة: كريم كرييشنز' : 'Engineered by Kareem Kreations'}
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors flex-shrink-0" />
          </a>
        </div>
      </div>
    </aside>
  );
}
