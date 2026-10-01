'use client';

import React, { useState } from 'react';
import { X, PackagePlus, Sparkles, MapPin, Store, User, DollarSign, Truck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewOrderModal({ isOpen, onClose }: NewOrderModalProps) {
  const { t, isRtl } = useLanguage();
  const { stores, drivers, createOrder } = useDispatch();

  const [storeId, setStoreId] = useState(stores[0]?.id || '');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+974 ');
  const [deliveryZone, setDeliveryZone] = useState('Lusail Marina');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderAmount, setOrderAmount] = useState('450');
  const [deliveryFee, setDeliveryFee] = useState('35');
  const [driverId, setDriverId] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim()) {
      alert(isRtl ? 'يرجى إدخال اسم وهاتف المستلم' : 'Please provide recipient name and phone');
      return;
    }

    createOrder({
      store_id: storeId,
      customer_name: customerName,
      customer_phone: customerPhone,
      delivery_zone: deliveryZone,
      delivery_address: deliveryAddress || `${deliveryZone}, Building 4, Apt 102`,
      order_amount: parseFloat(orderAmount) || 0,
      delivery_fee: parseFloat(deliveryFee) || 35,
      driver_id: driverId || null,
      notes: notes || 'Standard courier care handling.'
    });

    onClose();
  };

  const zones = [
    'Lusail Marina',
    'The Pearl-Qatar',
    'West Bay Commercial',
    'West Bay Lagoon',
    'Al Sadd',
    'Al Waab',
    'Dafna Diplomatic',
    'Madinat Khalifa South',
    'Al Rayyan',
    'Al Wakra Coastal'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#51122F] text-white">
              <PackagePlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{t('modal_create_title')}</h2>
              <p className="text-xs text-slate-500">{t('modal_create_sub')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Store Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-slate-500" />
              <span>{t('sender_store')}</span>
            </label>
            <select
              value={storeId}
              onChange={(e) => {
                setStoreId(e.target.value);
                const s = stores.find((x) => x.id === e.target.value);
                if (s) setDeliveryFee(String(s.default_delivery_fee));
              }}
              className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900"
            >
              {stores.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.zone} — Fee: {s.default_delivery_fee} QAR)
                </option>
              ))}
            </select>
          </div>

          {/* Recipient Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>{t('recipient_name')}</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={isRtl ? 'مثال: ناصر الكواري' : 'e.g. Nasser Al-Kuwari'}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('recipient_phone')}
              </label>
              <input
                type="text"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+974 5512 3456"
                className="w-full text-xs font-mono px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900"
              />
            </div>
          </div>

          {/* Routing & Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{t('recipient_zone')}</span>
              </label>
              <select
                value={deliveryZone}
                onChange={(e) => setDeliveryZone(e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900"
              >
                {zones.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-slate-500" />
                <span>{t('assigned_fleet')}</span>
              </label>
              <select
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                className="w-full text-xs font-medium px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900"
              >
                <option value="">{t('unassigned')}</option>
                {drivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.zone})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Detailed Street Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t('recipient_address')}
            </label>
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder={isRtl ? 'الشارع، رقم الفيلا أو البرج، رقم الشقة' : 'Street name, Villa/Tower #, Apt unit'}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900"
            />
          </div>

          {/* Pricing COD */}
          <div className="grid grid-cols-2 gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-slate-500" />
                <span>{t('item_value')}</span>
              </label>
              <input
                type="number"
                min="0"
                step="10"
                value={orderAmount}
                onChange={(e) => setOrderAmount(e.target.value)}
                className="w-full text-xs font-bold px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#51122F] text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {t('fee_value')}
              </label>
              <input
                type="number"
                min="0"
                step="5"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
                className="w-full text-xs font-bold px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#51122F] text-slate-900"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {isRtl ? 'تعليمات المندوب وملاحظات التسليم' : 'Courier Instructions & Notes'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isRtl ? 'مثال: يرجى الاتصال قبل الوصول بـ 15 دقيقة' : 'e.g. Call 15 mins prior to arrival'}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {t('cancel_btn')}
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#51122F] to-[#751B44] hover:from-[#65173B] hover:to-[#8B2D4C] rounded-xl shadow-md shadow-maroon-900/20 border border-pink-400/30 transition-all hover:shadow active:scale-95"
            >
              {t('create_btn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
