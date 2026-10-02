'use client';

import React from 'react';
import Link from 'next/link';
import {
  Store as StoreIcon,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';
import { useBrand } from '@/context/BrandContext';

export default function StoresPage() {
  const { t, formatCurrency, isRtl } = useLanguage();
  const { stores, orders } = useDispatch();
  const brand = useBrand();
  const { city, curr, createHref } = brand;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <StoreIcon className="w-6 h-6 text-[#51122F]" />
            <span>{t('nav_stores')}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isRtl
              ? `سجل المتاجر والشركاء التجاريين المرتبطين بأنظمة الشحن السريع في ${city}`
              : `Merchant accounts, contracted courier tariffs, active shipments, and settlement balances in ${city}`}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 font-bold">
            {stores.length} {isRtl ? 'متاجر معتمدة' : 'Active Merchant Hubs'}
          </span>
        </div>
      </div>

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stores.map((store) => {
          const storeOrders = orders.filter((o) => o.store_id === store.id);

          return (
            <div
              key={store.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all space-y-3.5 sm:space-y-4"
            >
              {/* Top Merchant Profile */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-[#51122F] flex items-center justify-center font-bold text-sm shadow-sm">
                    <StoreIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <span>{store.name}</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {store.code}
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{store.zone}</span>
                      </span>
                      <span>•</span>
                      <span className="text-slate-500">{store.manager}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {isRtl ? 'نشط ومعتمد' : 'Verified Merchant'}
                </span>
              </div>

              {/* Financial & Tariff Strip */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Contract Fee</span>
                  <span className="font-bold text-slate-900 block mt-0.5 font-mono">
                    {store.default_delivery_fee} {curr}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Active Orders</span>
                  <span className="font-bold text-[#51122F] block mt-0.5">
                    {storeOrders.length} Shipments
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Pending Payout</span>
                  <span className="font-bold font-mono text-emerald-800 block mt-0.5">
                    {formatCurrency(store.pending_payout)}
                  </span>
                </div>
              </div>

              {/* Address Strip */}
              <div className="text-xs text-slate-600 bg-slate-50/60 p-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{store.address}</span>
              </div>

              {/* Action Link */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  {store.phone}
                </span>

                <Link
                  href={createHref('/orders')}
                  className="flex items-center gap-1 text-xs font-bold text-[#51122F] hover:underline"
                >
                  <span>{isRtl ? 'عرض شحنات المتجر' : 'View Store Consignments'}</span>
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
