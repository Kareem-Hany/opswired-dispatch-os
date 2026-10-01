'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  CalendarClock,
  XCircle,
  ArrowUpRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';

export function DashboardMetrics() {
  const { t, isRtl } = useLanguage();
  const { metrics } = useDispatch();

  const cards = [
    {
      id: 'total',
      label: t('kpi_total_orders'),
      count: metrics.total,
      icon: Package,
      href: '/orders',
      border: 'border-slate-200 hover:border-slate-300',
      bg: 'bg-white',
      accent: 'text-slate-900',
      badgeBg: 'bg-slate-100 text-slate-700',
      description: isRtl ? 'إجمالي الشحنات المسجلة' : 'All lifetime orders'
    },
    {
      id: 'new',
      label: t('kpi_new_orders'),
      count: metrics.newCount,
      icon: Clock,
      href: '/orders?status=new',
      border: 'border-blue-200 hover:border-blue-300',
      bg: 'bg-gradient-to-br from-blue-50/60 to-white',
      accent: 'text-blue-700',
      badgeBg: 'bg-blue-100 text-blue-800',
      description: isRtl ? 'بانتظار إسناد المندوب' : 'Needs driver assignment'
    },
    {
      id: 'in_transit',
      label: t('kpi_in_transit'),
      count: metrics.inTransit,
      icon: Truck,
      href: '/orders?status=in_transit',
      border: 'border-indigo-200 hover:border-indigo-300',
      bg: 'bg-gradient-to-br from-indigo-50/60 to-white',
      accent: 'text-indigo-700',
      badgeBg: 'bg-indigo-100 text-indigo-800',
      description: isRtl ? 'قيد التوصيل في الميدان' : 'Live on road with couriers'
    },
    {
      id: 'delivered',
      label: t('kpi_delivered'),
      count: metrics.delivered,
      icon: CheckCircle2,
      href: '/orders?status=delivered',
      border: 'border-emerald-200 hover:border-emerald-300',
      bg: 'bg-gradient-to-br from-emerald-50/60 to-white',
      accent: 'text-emerald-700',
      badgeBg: 'bg-emerald-100 text-emerald-800',
      description: isRtl ? 'تم التسليم بنجاح' : 'Delivered & signed for'
    },
    {
      id: 'deferred',
      label: t('kpi_deferred'),
      count: metrics.deferred,
      icon: CalendarClock,
      href: '/orders?status=deferred',
      border: 'border-amber-200 hover:border-amber-300',
      bg: 'bg-gradient-to-br from-amber-50/60 to-white',
      accent: 'text-amber-700',
      badgeBg: 'bg-amber-100 text-amber-800',
      description: isRtl ? 'معاد جدولتها' : 'Rescheduled by customer'
    },
    {
      id: 'cancelled',
      label: t('kpi_cancelled'),
      count: metrics.cancelled,
      icon: XCircle,
      href: '/orders?status=cancelled',
      border: 'border-rose-200 hover:border-rose-300',
      bg: 'bg-gradient-to-br from-rose-50/60 to-white',
      accent: 'text-rose-700',
      badgeBg: 'bg-rose-100 text-rose-800',
      description: isRtl ? 'ملغية من المتجر' : 'Cancelled requisitions'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.id}
            href={card.href}
            className={`group relative p-4 rounded-2xl border ${card.border} ${card.bg} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`p-2 rounded-xl ${card.badgeBg}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </div>
              <div className="text-2xl font-bold text-slate-900 tracking-tight">
                {card.count}
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1">
                {card.label}
              </div>
            </div>
            <div className="text-[11px] text-slate-600 mt-2 pt-2 border-t border-slate-100 line-clamp-1">
              {card.description}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
