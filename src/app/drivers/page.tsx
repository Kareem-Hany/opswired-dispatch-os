'use client';

import React from 'react';
import Link from 'next/link';
import {
  Truck,
  Phone,
  Star,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';
import { useBrand } from '@/context/BrandContext';

export default function DriversPage() {
  const { t, formatCurrency, isRtl } = useLanguage();
  const { drivers, orders } = useDispatch();
  const brand = useBrand();
  const { client, city, createHref } = brand;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Truck className="w-6 h-6 text-[#51122F]" />
            <span>{t('nav_drivers')}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isRtl
              ? `إدارة مناديب أسطول ${client} في ${city}، تتبع العهد النقدية، وتوزيع مسارات التوصيل`
              : `Fleet operations roster, vehicle allocations, active drop routes, and on-road cash floats in ${city}`}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{drivers.length} {isRtl ? 'مناديب نشطين بالميدان' : 'Couriers On Shift'}</span>
          </span>
        </div>
      </div>

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {drivers.map((drv) => {
          const cleanPhone = drv.phone.replace(/[^0-9]/g, '');
          const assignedOrders = orders.filter((o) => o.driver_id === drv.id);

          return (
            <div
              key={drv.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all space-y-3.5 sm:space-y-4"
            >
              {/* Top Profile Strip */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#51122F] to-[#751B44] text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {drv.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <span>{drv.name}</span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {drv.license_plate}
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{drv.rating}</span>
                      </span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{drv.zone}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    drv.status === 'on_route'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}
                >
                  {drv.status === 'on_route'
                    ? (isRtl ? 'بالطريق لتسليم الشحنات' : 'On Active Route')
                    : (isRtl ? 'متاح للتكليف' : 'Available')}
                </span>
              </div>

              {/* Vehicle & Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Vehicle</span>
                  <span className="font-semibold text-slate-900 block truncate mt-0.5">
                    {drv.vehicle}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Active Drops</span>
                  <span className="font-bold text-[#51122F] block mt-0.5">
                    {assignedOrders.length} Parcels
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Cash Float</span>
                  <span className="font-bold font-mono text-emerald-800 block mt-0.5">
                    {formatCurrency(drv.cash_float)}
                  </span>
                </div>
              </div>

              {/* Quick Assigned Shipments Preview */}
              {assignedOrders.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isRtl ? 'الشحنات المكلف بها حالياً:' : 'Current Allocated Drops:'}
                  </span>
                  <div className="space-y-1">
                    {assignedOrders.slice(0, 2).map((ord) => (
                      <div
                        key={ord.id}
                        className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 border border-slate-100"
                      >
                        <span className="font-mono font-bold text-slate-800">{ord.order_number}</span>
                        <span className="text-slate-600">{ord.delivery_zone}</span>
                        <span className="font-bold text-slate-900">{formatCurrency(ord.total_amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`tel:${cleanPhone}`}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{drv.phone}</span>
                </a>

                <Link
                  href={createHref('/orders')}
                  className="flex items-center gap-1 text-xs font-bold text-[#51122F] hover:underline"
                >
                  <span>{isRtl ? 'عرض شحنات المندوب' : 'View Driver Route'}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
