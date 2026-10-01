'use client';

import React, { use } from 'react';
import Link from 'next/link';
import {
  Printer,
  ChevronLeft,
  QrCode
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';
import { LanguageToggle } from '@/components/LanguageToggle';

export default function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { t, formatCurrency, isRtl } = useLanguage();
  const { getOrderById, orders } = useDispatch();

  const order = getOrderById(id) || orders.find(o => o.id === id) || orders[0];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow border border-slate-200 text-center">
          <p className="text-sm font-bold text-slate-900">Waybill not found.</p>
          <Link href="/orders" className="text-xs text-[#51122F] hover:underline mt-2 inline-block">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const trackingUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/track?order=${order.order_number}`
    : `https://speedoo.net/track?order=${order.order_number}`;

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white text-slate-900 flex flex-col items-center py-4 sm:py-8 px-3 sm:px-4 print:p-0">
      {/* Non-Printable Header Bar */}
      <div className="max-w-3xl w-full mb-4 flex items-center justify-between print:hidden">
        <Link
          href="/orders"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 py-1.5 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
        >
          <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t('back_to_workspace')}</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <LanguageToggle />
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#51122F] to-[#751B44] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t('print_action')}</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet (Standard A4 / 4x6 Waybill layout) */}
      <div
        className="max-w-3xl w-full bg-white border border-slate-300 print:border-none shadow-xl print:shadow-none p-5 sm:p-8 md:p-10 space-y-5 sm:space-y-6 text-xs text-slate-900 font-sans rounded-2xl print:rounded-none"
        style={{ minHeight: '297mm' }}
      >
        {/* Waybill Master Header with Official Attached Speedoo Logo */}
        <div className="border-b-2 border-slate-900 pb-5 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <img
              src="/brand/speedoo-logo-dark.png"
              alt="Speedoo - On Time, Every Time"
              className="h-10 sm:h-12 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.src = '/brand/logo-full.png';
              }}
            />
            <span className="text-[11px] text-slate-500 block font-medium">
              Speedoo Express Delivery & Operations OS (Doha, State of Qatar)
            </span>
          </div>

          {/* Barcode & Waybill # */}
          <div className="text-right rtl:text-left space-y-1">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              {isRtl ? 'رقم بوليصة الشحن الرسمية' : 'Consignment Waybill #'}
            </div>
            <div className="font-mono text-base sm:text-lg font-black text-slate-950 tracking-wider">
              {order.order_number}
            </div>
            {/* Simulated 1D Barcode Graphic */}
            <div className="flex justify-end rtl:justify-start gap-[2px] h-6 sm:h-7 pt-1">
              {[3,1,2,4,1,3,2,1,4,2,3,1,2,4,1,2,3,1,4,2,1,3,2,4,1,3,1,2,4,2].map((w, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 h-full"
                  style={{ width: `${w * 1.5}px` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Consignor (Sender) & Consignee (Recipient) Split Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {/* Sender / Merchant */}
          <div className="p-3.5 sm:p-4 rounded-xl border border-slate-300 bg-slate-50/60 space-y-1.5">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>{t('consignor')}</span>
              <span className="text-slate-400 font-mono">FROM</span>
            </div>
            <div>
              <span className="font-bold text-sm text-slate-950 block">{order.store_name}</span>
              <span className="text-[11px] text-slate-600 block mt-0.5">{order.pickup_zone}</span>
              <span className="text-[11px] text-slate-500 block">{order.pickup_address}</span>
            </div>
          </div>

          {/* Recipient */}
          <div className="p-3.5 sm:p-4 rounded-xl border-2 border-slate-900 bg-white space-y-1.5">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>{t('consignee')}</span>
              <span className="text-pink-800 font-bold font-mono">TO / RECIPIENT</span>
            </div>
            <div>
              <span className="font-black text-sm text-slate-950 block">{order.customer_name}</span>
              <span className="text-[11px] font-mono font-bold text-slate-900 block mt-0.5">
                {order.customer_phone}
              </span>
              <span className="text-[11px] font-bold text-[#51122F] block mt-0.5">
                {order.delivery_zone}
              </span>
              <span className="text-[11px] text-slate-600 block">{order.delivery_address}</span>
            </div>
          </div>
        </div>

        {/* Dispatch Metadata Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-100 border border-slate-200 text-center font-mono">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Issue Date</span>
            <span className="font-bold text-slate-900 text-[11px]">
              {new Date(order.created_at).toLocaleDateString([], {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Courier</span>
            <span className="font-bold text-slate-900 text-[11px]">
              {order.driver_name || 'UNASSIGNED'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Payment Mode</span>
            <span className="font-bold text-emerald-800 text-[11px]">
              COD (CASH)
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Token Hash</span>
            <span className="font-bold text-slate-900 text-[11px]">
              {order.tracking_token}
            </span>
          </div>
        </div>

        {/* Courier Special Instructions */}
        {order.notes && (
          <div className="p-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/60 text-amber-950 text-xs">
            <span className="font-bold">{isRtl ? 'تعليمات السائق والتسليم: ' : 'Driver Instructions: '}</span>
            {order.notes}
          </div>
        )}

        {/* Itemized Financial Charges Table */}
        <div className="border border-slate-300 rounded-xl overflow-hidden">
          <table className="w-full text-left rtl:text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-4">{isRtl ? 'البند / الوصف التشغيلي' : 'Line Item Description'}</th>
                <th className="py-2.5 px-4">{isRtl ? 'النوع' : 'Charge Type'}</th>
                <th className="py-2.5 px-4 text-right rtl:text-left">{isRtl ? 'المبلغ' : 'Amount (QAR)'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-900">
                  {isRtl ? 'قيمة البضاعة المستحقة للبائع (COD)' : 'Merchant Goods Value (To Collect on Delivery)'}
                </td>
                <td className="py-2.5 px-4 text-slate-500 font-mono">MERCHANDISE</td>
                <td className="py-2.5 px-4 text-right rtl:text-left font-mono font-bold text-slate-900">
                  {formatCurrency(order.order_amount)}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-slate-900">
                  {isRtl ? 'أجرة التوصيل والمناولة (Speedoo Standard Express)' : 'Last-Mile Courier Delivery Fee'}
                </td>
                <td className="py-2.5 px-4 text-slate-500 font-mono">LOGISTICS</td>
                <td className="py-2.5 px-4 text-right rtl:text-left font-mono font-bold text-slate-900">
                  {formatCurrency(order.delivery_fee)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Master COD Highlight Banner */}
        <div className="p-4 rounded-xl bg-slate-950 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] text-pink-300 uppercase tracking-widest font-bold block">
              {t('total_cod_collect')}
            </span>
            <span className="text-xs text-slate-400">
              {isRtl ? 'المبلغ المطلوب نقداً من المستلم عند باب البيت' : 'Exact cash required upon physical parcel handover'}
            </span>
          </div>
          <div className="text-right rtl:text-left">
            <span className="text-xl sm:text-3xl font-black font-mono text-white">
              {formatCurrency(order.total_amount)}
            </span>
          </div>
        </div>

        {/* QR Code & Digital Verification */}
        <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1 min-w-0">
            <span className="font-bold text-slate-950 text-xs block">
              {isRtl ? 'التحقق الرقمي الفوري وبوابة التتبع' : 'Scan to Verify Digital POD & Status'}
            </span>
            <span className="text-[11px] text-slate-500 block max-w-md">
              {isRtl
                ? 'امسح رمز الاستجابة السريعة (QR) بكاميرا الهاتف للتحقق المباشر من مسار الشحنة والإيصال الإلكتروني.'
                : 'Scan with smartphone camera to open live tracking timeline and verify driver credentials.'}
            </span>
            <span className="text-[10px] text-slate-400 font-mono block truncate">
              {trackingUrl}
            </span>
          </div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 p-1.5 bg-white border-2 border-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
            <QrCode className="w-full h-full text-slate-950" />
          </div>
        </div>

        {/* Signatures & Acceptance Box */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-2 sm:pt-4">
          <div className="space-y-4 sm:space-y-6">
            <div className="h-10 sm:h-14 border-b border-dashed border-slate-400" />
            <div className="text-center">
              <span className="text-xs font-bold text-slate-900 block">{t('signature_driver')}</span>
              <span className="text-[10px] text-slate-400">Speedoo Certified Courier</span>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="h-10 sm:h-14 border-b border-dashed border-slate-400" />
            <div className="text-center">
              <span className="text-xs font-bold text-slate-900 block">{t('signature_recipient')}</span>
              <span className="text-[10px] text-slate-400">Full Signature Confirmation</span>
            </div>
          </div>
        </div>

        {/* Perforated Merchant Settlement Tear-Off Slip */}
        <div className="pt-4 sm:pt-6 border-t-2 border-dashed border-slate-400 space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span>{t('perforated_notice')}</span>
            <span className="font-mono text-slate-900">{order.order_number}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] bg-slate-50 p-2.5 sm:p-3 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-400 block">Merchant:</span>
              <span className="font-bold text-slate-900 truncate block">{order.store_name}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Recipient:</span>
              <span className="font-bold text-slate-900 truncate block">{order.customer_name}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Net Goods COD:</span>
              <span className="font-bold text-slate-900 font-mono">{formatCurrency(order.order_amount)}</span>
            </div>
            <div>
              <span className="text-slate-400 block">OpsWired Ref:</span>
              <span className="font-bold text-slate-900 font-mono">{order.tracking_token}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
