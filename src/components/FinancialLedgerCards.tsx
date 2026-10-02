'use client';

import React from 'react';
import Link from 'next/link';
import {
  Vault,
  HandCoins,
  Banknote,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';
import { useBrand } from '@/context/BrandContext';

export function FinancialLedgerCards() {
  const { t, formatCurrency, isRtl } = useLanguage();
  const { metrics } = useDispatch();
  const brand = useBrand();
  const { bankNameEn, bankNameAr, createHref } = brand;

  const financialCards = [
    {
      id: 'vault',
      title: t('treasury_balance'),
      amount: metrics.treasuryBalance,
      icon: Vault,
      tag: isRtl ? bankNameAr : bankNameEn,
      tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      bg: 'bg-white',
      accent: 'text-slate-900',
      href: '/treasury',
      subtext: isRtl ? 'رصيد السيولة النقدية المتاح للصرف' : 'Liquid cash available for merchant payout'
    },
    {
      id: 'pending',
      title: t('pending_collection'),
      amount: metrics.pendingCollection,
      icon: HandCoins,
      tag: isRtl ? 'بحوزة المناديب' : 'With Active Drivers',
      tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
      bg: 'bg-white',
      accent: 'text-amber-800',
      href: '/orders?collection=pending',
      subtext: isRtl ? 'شحنات سلمت وبانتظار التوريد المسائي' : 'Dispatched parcels awaiting evening lockbox'
    },
    {
      id: 'collected',
      title: t('collected_orders'),
      amount: metrics.collectedVolume,
      icon: Banknote,
      tag: isRtl ? 'مغلق ومسوى' : 'Verified COD',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
      bg: 'bg-white',
      accent: 'text-blue-800',
      href: '/treasury',
      subtext: isRtl ? 'إجمالي التحصيلات المستلمة بالخزينة' : 'Total cash verified & audited in bank'
    },
    {
      id: 'movement',
      title: t('net_ledger'),
      amount: metrics.netMovement,
      icon: TrendingUp,
      tag: isRtl ? '+18.4% نمو' : '+18.4% Inflow',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
      bg: 'bg-white',
      accent: 'text-purple-800',
      href: '/treasury',
      subtext: isRtl ? 'فارق التدفق النقدي المحقق اليوم' : 'Daily operational fee retention surplus'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {financialCards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.id}
            href={createHref(card.href)}
            className={`group p-5 rounded-2xl border border-slate-200 ${card.bg} shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border truncate max-w-[140px] ${card.tagColor}`}>
                  {card.tag}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                {card.title}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                {formatCurrency(card.amount)}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="line-clamp-1">{card.subtext}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
