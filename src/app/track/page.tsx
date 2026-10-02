'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';
import { useBrand } from '@/context/BrandContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Order, OrderStatus } from '@/lib/types';

function TrackPageContent() {
  const searchParams = useSearchParams();
  const initialOrderQuery = searchParams.get('order') || searchParams.get('token') || searchParams.get('o') || '';

  const { t, formatCurrency, isRtl } = useLanguage();
  const { getOrderById, orders } = useDispatch();
  const brand = useBrand();
  const { client, city, phonePrefix, isCustomClient, domainFavicon, createHref } = brand;

  const [inputVal, setInputVal] = useState(initialOrderQuery);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (initialOrderQuery) {
      const found = getOrderById(initialOrderQuery);
      if (found) {
        setActiveOrder(found);
      } else {
        setActiveOrder(orders[0] || null);
      }
    } else {
      const demo = orders.find(o => o.status === 'in_transit') || orders[0];
      setActiveOrder(demo || null);
    }
  }, [initialOrderQuery, orders, getOrderById]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const found = getOrderById(inputVal);
    setActiveOrder(found || null);
  };

  const getStepProgress = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return 1;
      case 'in_transit':
        return 3;
      case 'delivered':
        return 4;
      case 'deferred':
        return 2;
      case 'cancelled':
        return 0;
      default:
        return 1;
    }
  };

  const steps = [
    {
      num: 1,
      title_en: 'Order Ingested',
      title_ar: 'تم تسجيل الطلب',
      sub_en: 'Dispatched by store',
      sub_ar: 'تم تجهيز الطرد'
    },
    {
      num: 2,
      title_en: 'Driver Allocated',
      title_ar: 'إسناد المندوب',
      sub_en: 'Assigned to route',
      sub_ar: 'تم تكليف المندوب'
    },
    {
      num: 3,
      title_en: 'Out for Delivery',
      title_ar: 'الشحنة على الطريق',
      sub_en: 'En route to you',
      sub_ar: 'المندوب متوجه إليك'
    },
    {
      num: 4,
      title_en: 'Delivered & Signed',
      title_ar: 'تم التسليم بنجاح',
      sub_en: 'Completed & verified',
      sub_ar: 'تم تسليم الشحنة'
    }
  ];

  const currentStep = activeOrder ? getStepProgress(activeOrder.status) : 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900 flex flex-col">
      {/* Consumer Tracking Top Bar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <Link href={createHref('/')} className="flex items-center gap-2.5 block">
          {isCustomClient ? (
            <div className="flex items-center gap-2">
              {domainFavicon ? (
                <img
                  src={domainFavicon}
                  alt={client}
                  className="w-7 h-7 rounded-lg object-contain bg-slate-100 p-1 border border-slate-200 shadow-sm"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#51122F] to-[#751B44] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {client.slice(0, 2).toUpperCase()}
                </div>
              )}
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                {client} Tracking
              </span>
            </div>
          ) : (
            <img
              src="/brand/speedoo-logo-maroon.png"
              alt="Speedoo - On Time, Every Time"
              className="max-h-8 w-auto object-contain"
              onError={(e) => { e.currentTarget.src = '/brand/logo-full.png'; }}
            />
          )}
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <Link
            href={createHref('/')}
            className="text-xs font-semibold text-slate-600 hover:text-[#51122F] flex items-center gap-1 py-1.5 px-2.5 sm:px-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <span>{t('back_to_workspace')}</span>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </header>

      {/* Hero & Search Header */}
      <div className="bg-[#1C0B1B] text-white py-8 sm:py-12 px-4 sm:px-6 border-b border-[#3B123C] text-center space-y-3 sm:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-pink-300 text-xs font-semibold border border-white/15">
          <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
          <span>
            {isRtl ? `بوابة التتبع المباشر — أسطول ${client} (${city})` : `Official ${client} ${city} Consignment Tracking`}
          </span>
        </div>
        <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white max-w-xl mx-auto">
          {client} {isRtl ? 'منظومة تتبع الشحنات الحية' : 'Live Consignment Tracker'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          {isRtl ? `تحقق مباشر من مسار الطرد مدعوم بمحرك العمليات ${client}` : `Instant parcel milestone verification powered by ${client} Logistics Engine`}
        </p>

        {/* Search Box */}
        <div className="max-w-xl w-full mx-auto pt-2">
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-xl">
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t('tracking_input_placeholder')}
                className="w-full text-xs sm:text-sm pl-9 sm:pl-10 pr-2.5 sm:pr-3 rtl:pl-2.5 rtl:pr-9 sm:rtl:pr-10 py-2.5 sm:py-3 bg-transparent text-slate-900 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#51122F] to-[#751B44] hover:from-[#65173B] hover:to-[#8B2D4C] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex-shrink-0"
            >
              {t('track_btn')}
            </button>
          </form>
        </div>
      </div>

      {/* Main Tracking Results Content */}
      <div className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 md:p-8">
        {activeOrder ? (
          <div className="space-y-6">
            {/* Order Card Overview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {t('order_summary')}
                  </span>
                  <div className="flex items-center gap-2.5 mt-0.5">
                    <h2 className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                      {activeOrder.order_number}
                    </h2>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      activeOrder.status === 'delivered'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : activeOrder.status === 'in_transit'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {activeOrder.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="text-right rtl:text-left sm:text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Total COD Due</span>
                  <span className="text-xl font-bold font-mono text-slate-900">
                    {formatCurrency(activeOrder.total_amount)}
                  </span>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div className="py-2">
                <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
                  {steps.map((st) => {
                    const isPassed = currentStep >= st.num;
                    const isCurrent = currentStep === st.num;

                    return (
                      <div key={st.num} className="flex flex-col items-center text-center">
                        <div
                          className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm mb-2 transition-all ${
                            isPassed
                              ? 'bg-[#51122F] text-white shadow-md shadow-pink-950/20'
                              : 'bg-slate-100 text-slate-400 border border-slate-200'
                          } ${isCurrent ? 'ring-4 ring-pink-500/20 scale-105' : ''}`}
                        >
                          {isPassed ? <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" /> : st.num}
                        </div>
                        <span className={`text-[11px] sm:text-xs font-bold leading-tight ${
                          isPassed ? 'text-slate-900' : 'text-slate-400'
                        }`}>
                          {isRtl ? st.title_ar : st.title_en}
                        </span>
                        <span className="text-[10px] text-slate-500 hidden sm:block mt-0.5">
                          {isRtl ? st.sub_ar : st.sub_en}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Specs Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t('destination')}</span>
                  <span className="font-bold text-slate-800 mt-0.5 block truncate">{activeOrder.delivery_zone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t('store')}</span>
                  <span className="font-bold text-slate-800 mt-0.5 block truncate">{activeOrder.store_name}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t('driver')}</span>
                  <span className="font-bold text-slate-800 mt-0.5 block truncate">
                    {activeOrder.driver_name || t('unassigned')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">{t('collection_status')}</span>
                  <span className={`font-bold mt-0.5 block truncate ${
                    activeOrder.collection_status === 'collected' ? 'text-emerald-700' : 'text-amber-700'
                  }`}>
                    {activeOrder.collection_status === 'collected' ? (isRtl ? 'محصل' : 'Collected') : (isRtl ? 'معلق' : 'Pending')}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Audit Milestones */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#51122F]" />
                <span>{t('order_timeline')}</span>
              </h3>

              <div className="space-y-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-pink-100 pl-4 rtl:pl-0 rtl:pr-4">
                {activeOrder.events.map((ev) => (
                  <div key={ev.id} className="relative space-y-1">
                    <span className="absolute -left-[21px] rtl:-left-auto rtl:-right-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#51122F] ring-4 ring-white" />
                    <div className="text-xs font-bold text-slate-900">
                      {isRtl ? ev.title_ar : ev.title_en}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {isRtl ? ev.description_ar : ev.description_en}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {ev.actor}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Box with Dynamic Hub Phone and Client Name */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#51122F]/5 border border-[#51122F]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{t('need_support')}</span>
                <span className="text-slate-500 text-[11px]">
                  {client} {city} Dispatch Center: {phonePrefix} 5512 3456
                </span>
              </div>
              <a
                href={`tel:${phonePrefix}55123456`}
                className="px-3.5 py-2 rounded-xl bg-[#51122F] text-white font-bold text-center hover:bg-[#65173B] transition-colors flex-shrink-0"
              >
                {t('call_support')}
              </a>
            </div>
          </div>
        ) : (
          <div className="p-10 sm:p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">
              {isRtl ? 'لم يتم العثور على الشحنة' : 'Consignment Not Found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {isRtl
                ? 'تأكد من إدخال رقم البوليصة بشكل صحيح (مثال: SPD-2024-8841).'
                : 'Please verify the waybill number or tracking hash entered above.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="p-8 sm:p-10 text-center text-slate-500">Loading Tracking Engine...</div>}>
      <TrackPageContent />
    </Suspense>
  );
}
