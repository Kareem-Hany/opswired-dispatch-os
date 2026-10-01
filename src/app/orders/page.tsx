'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  PackageSearch,
  Search,
  Filter,
  Truck,
  Store,
  Printer,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpDown,
  RotateCcw,
  Plus,
  MapPin,
  CheckSquare,
  Square,
  SlidersHorizontal
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';
import { OrderStatusBadge } from '@/components/OrderStatusBadge';
import { OrderDetailDrawer } from '@/components/OrderDetailDrawer';
import { Order, OrderStatus } from '@/lib/types';

function OrdersWorkspaceContent() {
  const searchParams = useSearchParams();
  const initialStatusFilter = searchParams.get('status') || 'all';
  const initialCollectionFilter = searchParams.get('collection') || 'all';

  const { t, formatCurrency, isRtl } = useLanguage();
  const { orders, drivers, stores, updateOrderStatus, assignDriver } = useDispatch();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [storeFilter, setStoreFilter] = useState<string>('all');
  const [driverFilter, setDriverFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Bulk Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesNumber = order.order_number.toLowerCase().includes(q);
        const matchesName = order.customer_name.toLowerCase().includes(q);
        const matchesPhone = order.customer_phone.toLowerCase().includes(q);
        const matchesZone = order.delivery_zone.toLowerCase().includes(q);
        const matchesStore = order.store_name.toLowerCase().includes(q);
        if (!matchesNumber && !matchesName && !matchesPhone && !matchesZone && !matchesStore) {
          return false;
        }
      }

      if (statusFilter !== 'all' && order.status !== statusFilter) {
        return false;
      }

      if (storeFilter !== 'all' && order.store_id !== storeFilter) {
        return false;
      }

      if (driverFilter !== 'all') {
        if (driverFilter === 'unassigned') {
          if (order.driver_id !== null) return false;
        } else if (order.driver_id !== driverFilter) {
          return false;
        }
      }

      if (initialCollectionFilter === 'pending' && order.collection_status !== 'pending') {
        return false;
      }

      return true;
    });
  }, [orders, searchQuery, statusFilter, storeFilter, driverFilter, initialCollectionFilter]);

  const handleSelectAll = () => {
    if (selectedIds.length === filteredOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredOrders.map((o) => o.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBulkStatusChange = (status: OrderStatus) => {
    selectedIds.forEach((id) => updateOrderStatus(id, status));
    setSelectedIds([]);
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Workspace Header & Action Counts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <PackageSearch className="w-6 h-6 text-[#51122F]" />
            <span>{t('nav_orders')}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isRtl
              ? `إجمالي الشحنات المعروضة: ${filteredOrders.length} من أصل ${orders.length} شحنة`
              : `Showing ${filteredOrders.length} of ${orders.length} total consignments`}
          </p>
        </div>

        {/* Quick Bulk Action Bar if Items Selected */}
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-slate-900 text-white text-xs animate-in fade-in duration-150">
            <span className="font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300">
              {selectedIds.length} {isRtl ? 'محددة' : 'Selected'}
            </span>
            <button
              type="button"
              onClick={() => handleBulkStatusChange('in_transit')}
              className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
            >
              {isRtl ? 'إرسال للتوصيل' : 'Mark In-Transit'}
            </button>
            <button
              type="button"
              onClick={() => handleBulkStatusChange('delivered')}
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            >
              {isRtl ? 'تحديد كـ تم التسليم' : 'Mark Delivered'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="px-2 py-1 rounded-lg text-slate-400 hover:text-white"
            >
              {isRtl ? 'إلغاء' : 'Deselect'}
            </button>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
          {/* Search Input */}
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full text-xs pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900"
            />
          </div>

          {/* Status Dropdown Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900 font-medium"
            >
              <option value="all">{t('all_statuses')}</option>
              <option value="new">{t('status_new')}</option>
              <option value="in_transit">{t('status_in_transit')}</option>
              <option value="delivered">{t('status_delivered')}</option>
              <option value="deferred">{t('status_deferred')}</option>
              <option value="cancelled">{t('status_cancelled')}</option>
            </select>
          </div>

          {/* Store Selector Filter */}
          <div>
            <select
              value={storeFilter}
              onChange={(e) => setStoreFilter(e.target.value)}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900 font-medium"
            >
              <option value="all">{t('all_stores')}</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Driver Selector Filter */}
          <div>
            <select
              value={driverFilter}
              onChange={(e) => setDriverFilter(e.target.value)}
              className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#51122F] focus:bg-white text-slate-900 font-medium"
            >
              <option value="all">{t('all_drivers')}</option>
              <option value="unassigned">{t('unassigned')}</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Pills Row */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium text-[11px] flex items-center gap-1">
            <Filter className="w-3 h-3" />
            <span>{isRtl ? 'تصفية سريعة:' : 'Quick Filters:'}</span>
          </span>
          <button
            type="button"
            onClick={() => {
              setStatusFilter('all');
              setStoreFilter('all');
              setDriverFilter('all');
              setSearchQuery('');
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              statusFilter === 'all' && storeFilter === 'all' && driverFilter === 'all' && !searchQuery
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isRtl ? 'الكل' : 'All'}
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('new')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              statusFilter === 'new'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            {t('status_new')}
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('in_transit')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              statusFilter === 'in_transit'
                ? 'bg-indigo-600 text-white'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            {t('status_in_transit')}
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('delivered')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              statusFilter === 'delivered'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {t('status_delivered')}
          </button>
          <button
            type="button"
            onClick={() => setDriverFilter('unassigned')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              driverFilter === 'unassigned'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
            }`}
          >
            {t('unassigned')}
          </button>
        </div>
      </div>

      {/* Main Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-10 sm:p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <PackageSearch className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-700">{t('empty_orders')}</p>
            <button
              type="button"
              onClick={() => {
                setStatusFilter('all');
                setStoreFilter('all');
                setDriverFilter('all');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#51122F] hover:underline"
            >
              {isRtl ? 'إعادة ضبط خيارات البحث' : 'Clear all filters'}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right border-collapse text-xs min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-10">
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      {selectedIds.length === filteredOrders.length && filteredOrders.length > 0 ? (
                        <CheckSquare className="w-4 h-4 text-[#51122F]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="py-3 px-4">{t('order_id')}</th>
                  <th className="py-3 px-4">{t('store')}</th>
                  <th className="py-3 px-4">{t('customer')}</th>
                  <th className="py-3 px-4">{t('destination')}</th>
                  <th className="py-3 px-4">{t('driver')}</th>
                  <th className="py-3 px-4">{t('cod_amount')}</th>
                  <th className="py-3 px-4">{t('status')}</th>
                  <th className="py-3 px-4 text-center">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => {
                  const isChecked = selectedIds.includes(order.id);
                  const cleanPhone = order.customer_phone.replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${cleanPhone}`;

                  return (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`hover:bg-slate-50 transition-colors cursor-pointer group ${
                        isChecked ? 'bg-pink-50/40' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => toggleSelectOne(order.id)}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-[#51122F]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 group-hover:text-[#51122F]">
                        {order.order_number}
                        <span className="block text-[10px] font-normal text-slate-400">
                          {new Date(order.created_at).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {order.store_name}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-900 block">{order.customer_name}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{order.customer_phone}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{order.delivery_zone}</span>
                        </span>
                        <span className="block text-[10px] text-slate-500 line-clamp-1">
                          {order.delivery_address}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
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
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {formatCurrency(order.total_amount)}
                        <span className="block text-[10px] font-normal text-slate-500">
                          {order.collection_status === 'collected'
                            ? (isRtl ? 'محصل بالكامل' : 'Collected')
                            : (isRtl ? 'معلق بالتحصيل' : 'Pending COD')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <OrderStatusBadge status={order.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="WhatsApp Customer"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                          <Link
                            href={`/invoice/${order.id}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title={t('print_invoice')}
                          >
                            <Printer className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/track?order=${order.order_number}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                            title={t('open_tracking')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-over Drawer */}
      <OrderDetailDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<div className="p-8 sm:p-10 text-center text-slate-400">Loading Orders Workspace...</div>}>
      <OrdersWorkspaceContent />
    </Suspense>
  );
}
