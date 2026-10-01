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
import { LanguageToggle } from '@/components/LanguageToggle';
import { Order, OrderStatus } from '@/lib/types';

function TrackPageContent() {
  const searchParams = useSearchParams();
  const initialOrderQuery = searchParams.get('order') || searchParams.get('token') || searchParams.get('o') || '';

  const { t, formatCurrency, isRtl } = useLanguage();
  const { getOrderById, orders } = useDispatch();

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
        <Link href="/" className="flex items-center gap-2 block max-w-[140px] sm:max-w-[180px]">
          <img
            src="/brand/speedoo-logo-maroon.png"
            alt="Speedoo - On Time, Every Time"
            className="w-full h-auto object-contain"
            onError={(e) => { e.currentTarget.src = '/brand/logo-full.png'; }}
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <Link
            href="/"
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
          <span>{isRtl ? 'بوابة التتبع المباشر لعملاء قطر' : 'Official Speedoo Qatar Tracking Portal'}</span>
        </div>
        <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white max-w-xl mx-auto">
          {t('tracking_hero_title')}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          {t('tracking_hero_sub')}
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

      {/* Tracking Details Container */}
      <div className="flex-1 max-w-3xl w-full mx-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
        {activeOrder ? (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden space-y-5 sm:space-y-6 p-5 sm:p-8">
            {/* Order Identity Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100">
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  {t('order_id')}
                </span>
                <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 block">
                  {activeOrder.order_number}
                </span>
                <span className="text-xs text-slate-500 block truncate">
                  {isRtl ? 'المرسل: ' : 'From: '} {activeOrder.store_name}
                </span>
              </div>

              <div className="text-right rtl:text-left">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  {t('status')}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                  activeOrder.status === 'delivered'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : activeOrder.status === 'in_transit'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 animate-pulse'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {activeOrder.status === 'in_transit'
                    ? (isRtl ? '🚚 في الطريق للتسليم' : '🚚 Out for Delivery Today')
                    : activeOrder.status === 'delivered'
                    ? (isRtl ? '✅ تم التسليم بنجاح' : '✅ Delivered & Verified')
                    : (isRtl ? '📦 تم استلام الشحنة' : '📦 Order Ingested')}
                </span>
              </div>
            </div>

            {/* Visual Stepper Bar */}
            <div className="py-2 sm:py-4">
              <div className="relative">
                {/* Connecting Track Line */}
                <div className="absolute top-5 left-6 right-6 h-1 bg-slate-200 -z-0" />
                <div
                  className="absolute top-5 left-6 h-1 bg-[#51122F] transition-all duration-500 -z-0"
                  style={{
                    width: currentStep === 4 ? 'calc(100% - 3rem)' : currentStep === 3 ? '66%' : currentStep === 2 ? '33%' : '0%'
                  }}
                />

                <div className="grid grid-cols-4 gap-1 sm:gap-2 relative z-10">
                  {steps.map((step) => {
                    const isPassed = step.num <= currentStep;
                    const isCurrent = step.num === currentStep;

                    return (
                      <div key={step.num} className="flex flex-col items-center text-center">
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-sm ${
                            isPassed
                              ? 'bg-[#51122F] text-white border-2 border-[#51122F]'
                              : 'bg-white text-slate-400 border-2 border-slate-200'
                          } ${isCurrent ? 'ring-4 ring-pink-100' : ''}`}
                        >
                          {isPassed && step.num < currentStep ? (
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          ) : (
                            step.num
                          )}
                        </div>
                        <div className="mt-2">
                          <span className={`text-[10px] sm:text-xs font-bold block ${isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                            {isRtl ? step.title_ar : step.title_en}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-slate-500 hidden sm:block mt-0.5">
                            {isRtl ? step.sub_ar : step.sub_en}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  {t('destination')}
                </span>
                <span className="font-bold text-slate-900 block">{activeOrder.delivery_zone}</span>
                <span className="text-slate-600 block">{activeOrder.delivery_address}</span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  {isRtl ? 'وقت التوصيل المتوقع' : 'Delivery Window'}
                </span>
                <span className="font-bold text-slate-900 block">{activeOrder.delivery_time || 'Today'}</span>
                <span className="text-slate-600 block">
                  {isRtl ? 'طريقة الدفع: الدفع نقداً عند الاستلام (COD)' : 'Payment: Cash on Delivery (COD)'}
                </span>
              </div>

              <div className="sm:col-span-2 pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">
                    {t('total_cod_collect')}
                  </span>
                  <span className="text-base sm:text-lg font-black text-[#51122F]">
                    {formatCurrency(activeOrder.total_amount)}
                  </span>
                </div>

                {activeOrder.driver_name && (
                  <div className="flex items-center gap-2 bg-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 shadow-sm">
                    <Truck className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-slate-400 block">{t('courier_details')}</span>
                      <span className="font-bold text-slate-900 text-xs">{activeOrder.driver_name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Live Timeline Audit */}
            <div className="space-y-3 pt-1">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {t('order_timeline')}
              </h3>

              <div className="space-y-3 pl-4 rtl:pl-0 rtl:pr-4 border-l-2 rtl:border-l-0 rtl:border-r-2 border-slate-200">
                {activeOrder.events.map((ev, i) => (
                  <div key={ev.id || i} className="relative pb-1.5">
                    <div className="absolute -left-[21px] rtl:-left-auto rtl:-right-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#51122F]" />
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

            {/* Support Box */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#51122F]/5 border border-[#51122F]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{t('need_support')}</span>
                <span className="text-slate-500 text-[11px]">Speedoo Qatar Call Center: +974 4488 2190</span>
              </div>
              <a
                href="tel:+97444882190"
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
