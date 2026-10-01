'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Truck,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Printer,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';
import { DashboardMetrics } from '@/components/DashboardMetrics';
import { FinancialLedgerCards } from '@/components/FinancialLedgerCards';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { OrderDetailDrawer } from '@/components/OrderDetailDrawer';
import { Order } from '@/lib/types';

export default function OperationsDashboard() {
  const { t, formatCurrency, isRtl } = useLanguage();
  const { orders, drivers } = useDispatch();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const recentOrders = orders.slice(0, 6);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Top Welcome & Operational Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#1C0B1B] via-[#2F1127] to-[#120713] text-white border border-pink-900/30 shadow-lg shadow-black/10">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2 text-pink-300 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="truncate">{isRtl ? 'غرفة العمليات المركزية — الدوحة، قطر' : 'Central Dispatch Operations — Doha, Qatar'}</span>
          </div>
          <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white leading-tight">
            {isRtl ? 'محرك التوزيع وإدارة أسطول الشحنات' : 'Logistics Dispatch & Payout Engine'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {isRtl
              ? 'مراقبة حية وتوزيع فوري للطرود، تحصيل نقدي لحظي (COD)، وإسناد تلقائي لمناديب التوصيل عبر كافة مناطق الدوحة ولوسيل.'
              : 'Real-time consignment flow, automated driver dispatching, live COD field collection, and instant bilingual waybill generation.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0 pt-2 md:pt-0">
          <Link
            href="/orders"
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-all shadow-md active:scale-95"
          >
            <span>{t('nav_orders')}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
          <Link
            href="/track"
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-xs transition-all active:scale-95"
          >
            <span>{t('nav_tracking')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Row 1: KPI Metrics Grid */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {isRtl ? 'مؤشرات الأداء التشغيلي (KPIs)' : 'Fleet Lifecycle Metrics'}
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {isRtl ? 'تحديث تلقائي لحظي' : 'Real-time Synced'}
          </span>
        </div>
        <DashboardMetrics />
      </section>

      {/* Row 2: Financial Ledger Grid */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {isRtl ? 'حركة الخزينة والتحصيلات النقدية (COD)' : 'Financial Treasury & COD Settlements'}
          </h2>
          <Link
            href="/treasury"
            className="text-xs font-semibold text-[#51122F] hover:text-[#751B44] flex items-center gap-1"
          >
            <span>{isRtl ? 'عرض سجل الخزينة الكامل' : 'Open Full Ledger'}</span>
            <ArrowRight className="w-3 h-3 rtl:rotate-180" />
          </Link>
        </div>
        <FinancialLedgerCards />
      </section>

      {/* Row 3: Split Section — Recent Orders & Active Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Recent Shipments Table (2 Cols) */}
        <section className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#51122F]" />
              <span>{isRtl ? 'أحدث الشحنات في غرفة العمليات' : 'Recent Dispatched Shipments'}</span>
            </h2>
            <Link
              href="/orders"
              className="text-xs font-semibold text-[#51122F] hover:underline flex items-center gap-1"
            >
              <span>{isRtl ? 'عرض كافة الشحنات' : 'View All'}</span>
              <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left rtl:text-right border-collapse text-xs min-w-[620px]">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">{t('order_id')}</th>
                    <th className="py-3 px-4">{t('customer')}</th>
                    <th className="py-3 px-4">{t('destination')}</th>
                    <th className="py-3 px-4">{t('driver')}</th>
                    <th className="py-3 px-4">{t('cod_amount')}</th>
                    <th className="py-3 px-4">{t('status')}</th>
                    <th className="py-3 px-4 text-center">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 group-hover:text-[#51122F]">
                        {order.order_number}
                        <span className="block text-[10px] font-normal text-slate-400">
                          {order.store_name}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-900 block">{order.customer_name}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{order.customer_phone}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{order.delivery_zone}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {order.driver_name ? (
                          <span className="inline-flex items-center gap-1 text-slate-800 font-medium">
                            <Truck className="w-3 h-3 text-indigo-600" />
                            <span>{order.driver_name}</span>
                          </span>
                        ) : (
                          <span className="text-amber-700 font-medium text-[11px] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            {t('unassigned')}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {formatCurrency(order.total_amount)}
                        <span className="block text-[10px] font-normal text-slate-400">
                          {order.collection_status === 'collected'
                            ? (isRtl ? 'محصل' : 'Collected')
                            : (isRtl ? 'معلق' : 'Pending')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <OrderStatusBadge status={order.status} size="sm" />
                      </td>
                      <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#51122F] hover:bg-slate-100 transition-colors"
                            title={t('view_details')}
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/invoice/${order.id}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title={t('print_invoice')}
                          >
                            <Printer className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Active Fleet Drivers Summary Card (1 Col) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#51122F]" />
              <span>{isRtl ? 'حالة أسطول المناديب الميداني' : 'On-Road Fleet Status'}</span>
            </h2>
            <Link
              href="/drivers"
              className="text-xs font-semibold text-[#51122F] hover:underline"
            >
              {isRtl ? 'إدارة الأسطول' : 'All Drivers'}
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
            {drivers.map((drv) => (
              <div
                key={drv.id}
                className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs flex-shrink-0">
                    {drv.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 truncate">
                      <span className="truncate">{drv.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-mono flex-shrink-0">
                        {drv.license_plate}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                      {drv.vehicle} • {drv.zone}
                    </div>
                  </div>
                </div>

                <div className="text-right rtl:text-left flex-shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    drv.status === 'on_route'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {drv.status === 'on_route'
                      ? (isRtl ? `${drv.active_deliveries} مسار` : `${drv.active_deliveries} Drops`)
                      : (isRtl ? 'متاح' : 'Available')}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    Float: {formatCurrency(drv.cash_float)}
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>{isRtl ? 'إجمالي مناديب الدوحة النشطين' : 'Active Doha Couriers'}</span>
              <span className="font-bold text-slate-800">4 / 4 Units</span>
            </div>
          </div>
        </section>
      </div>

      {/* Slide-over Drawer for Order Detail */}
      <OrderDetailDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
