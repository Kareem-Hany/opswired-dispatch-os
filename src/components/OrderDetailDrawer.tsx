'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  Phone,
  MessageSquare,
  Printer,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Building,
  User,
  Truck,
  CreditCard,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Order, OrderStatus, CollectionStatus } from '@/lib/types';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';

interface OrderDetailDrawerProps {
  order: Order | null;
  onClose: () => void;
}

export function OrderDetailDrawer({ order, onClose }: OrderDetailDrawerProps) {
  const { t, formatCurrency, isRtl } = useLanguage();
  const { drivers, updateOrderStatus, assignDriver, updateCollectionStatus } = useDispatch();
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const trackingUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/track?order=${order.order_number}`
    : `/track?order=${order.order_number}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(trackingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cleanPhone = order.customer_phone.replace(/[^0-9]/g, '');
  const whatsappText = isRtl
    ? `مرحباً ${order.customer_name}، شحنتكم رقم ${order.order_number} من متجر ${order.store_name} قيد التوصيل حالياً. يمكنكم تتبع الشحنة عبر الرابط: ${trackingUrl}`
    : `Hello ${order.customer_name}, your order ${order.order_number} from ${order.store_name} is now with our dispatch team. Track your delivery: ${trackingUrl}`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm transition-opacity flex justify-end">
      <div
        className={`w-full max-w-xl bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-slate-200 ${
          isRtl ? 'border-r' : 'border-l'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#51122F] to-[#751B44] text-white">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base text-slate-900">
                  {order.order_number}
                </span>
                <OrderStatusBadge status={order.status} size="sm" />
              </div>
              <span className="text-xs text-slate-500">
                {t('drawer_title')} • {order.store_name}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Action Buttons Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 transition-all text-xs font-semibold gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
            <Link
              href={`/invoice/${order.id}`}
              target="_blank"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-all text-xs font-semibold gap-1.5"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>{t('print_invoice')}</span>
            </Link>
            <Link
              href={`/track?order=${order.order_number}`}
              target="_blank"
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-all text-xs font-semibold gap-1.5"
            >
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span>{t('open_tracking')}</span>
            </Link>
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-all text-xs font-semibold gap-1.5"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4 text-slate-600" />
              )}
              <span>{copied ? t('copied') : t('copy_tracking')}</span>
            </button>
          </div>

          {/* Operational Control Box (Interactive State Mutations) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#51122F]" />
              <span>{isRtl ? 'التحكم الفوري بالشحنة والأسطول' : 'Live Dispatch Control & Allocation'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Status Update Dropdown */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t('update_status_prompt')}
                </label>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                  className="w-full text-xs font-medium px-3 py-2 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#51122F] text-slate-800"
                >
                  <option value="new">{t('status_new')}</option>
                  <option value="in_transit">{t('status_in_transit')}</option>
                  <option value="delivered">{t('status_delivered')}</option>
                  <option value="deferred">{t('status_deferred')}</option>
                  <option value="cancelled">{t('status_cancelled')}</option>
                </select>
              </div>

              {/* Driver Allocation Dropdown */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  {t('assigned_fleet')}
                </label>
                <select
                  value={order.driver_id || ''}
                  onChange={(e) => assignDriver(order.id, e.target.value || null)}
                  className="w-full text-xs font-medium px-3 py-2 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#51122F] text-slate-800"
                >
                  <option value="">{t('unassigned')}</option>
                  {drivers.map((drv) => (
                    <option key={drv.id} value={drv.id}>
                      {drv.name} ({drv.vehicle.split(' ')[0]} - {drv.zone})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Collection Status Control */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                {t('collection_status')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['pending', 'collected', 'remitted'] as CollectionStatus[]).map((status) => {
                  const isActive = order.collection_status === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => updateCollectionStatus(order.id, status)}
                      className={`text-xs py-1.5 px-2 rounded-lg font-medium border text-center transition-all ${
                        isActive
                          ? 'bg-[#51122F] text-white border-[#51122F] shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {status === 'pending'
                        ? t('coll_pending')
                        : status === 'collected'
                        ? t('coll_collected')
                        : t('coll_remitted')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Customer & Destination Card */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-600" />
                <span>{t('customer_info')}</span>
              </span>
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{order.customer_phone}</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-600 block">{t('customer')}</span>
                <span className="font-semibold text-slate-900">{order.customer_name}</span>
              </div>
              <div>
                <span className="text-slate-600 block">{t('destination')}</span>
                <span className="font-semibold text-slate-900">{order.delivery_zone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-600 block">{isRtl ? 'العنوان التفصيلي' : 'Address'}</span>
                <span className="font-medium text-slate-800">{order.delivery_address}</span>
              </div>
            </div>
          </div>

          {/* Routing & Merchant Hub */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-slate-600" />
              <span>{t('delivery_routing')}</span>
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-600 block">{t('sender_store')}</span>
                <span className="font-semibold text-slate-900">{order.store_name}</span>
              </div>
              <div>
                <span className="text-slate-600 block">{t('pickup')}</span>
                <span className="font-semibold text-slate-900">{order.pickup_zone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-600 block">{isRtl ? 'مستودع الاستلام' : 'Pickup Warehouse'}</span>
                <span className="font-medium text-slate-800">{order.pickup_address}</span>
              </div>
              {order.notes && (
                <div className="col-span-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <span className="font-bold">{isRtl ? 'ملاحظات التوصيل: ' : 'Driver Notes: '}</span>
                  {order.notes}
                </div>
              )}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-slate-600" />
              <span>{t('financial_breakdown')}</span>
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>{t('goods_value')}</span>
                <span className="font-semibold text-slate-900">{formatCurrency(order.order_amount)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{t('delivery_fee')}</span>
                <span className="font-semibold text-slate-900">{formatCurrency(order.delivery_fee)}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-bold text-slate-900">
                <span>{t('total_due')} (COD)</span>
                <span className="text-[#51122F] text-base">{formatCurrency(order.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Audit Timeline */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              <span>{t('order_timeline')}</span>
            </span>

            <div className="space-y-3 pt-1">
              {order.events.map((ev, idx) => (
                <div key={ev.id || idx} className="relative pl-5 rtl:pl-0 rtl:pr-5 border-l-2 rtl:border-l-0 rtl:border-r-2 border-slate-200 pb-2 last:pb-0">
                  <div className="absolute -left-[7px] rtl:-left-auto rtl:-right-[7px] top-0 w-3 h-3 rounded-full bg-[#51122F] border-2 border-white" />
                  <div className="text-xs font-bold text-slate-900">
                    {isRtl ? ev.title_ar : ev.title_en}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {isRtl ? ev.description_ar : ev.description_en}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-1 flex items-center gap-2">
                    <span>{new Date(ev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span>•</span>
                    <span className="font-medium text-slate-600">{ev.actor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-600 font-mono">
            Token: {order.tracking_token}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition-colors"
          >
            {isRtl ? 'إغلاق اللوحة' : 'Close Panel'}
          </button>
        </div>
      </div>
    </div>
  );
}
