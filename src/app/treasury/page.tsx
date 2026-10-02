'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  WalletCards,
  Vault,
  Building2,
  TrendingUp,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  DollarSign
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useDispatch } from '@/context/DispatchContext';
import { useBrand } from '@/context/BrandContext';

export default function TreasuryPage() {
  const { t, formatCurrency, isRtl } = useLanguage();
  const { wallets, transactions, metrics } = useDispatch();
  const brand = useBrand();
  const { bankNameEn, bankNameAr } = brand;
  const [activeTab, setActiveTab] = useState<'all' | 'in' | 'out'>('all');

  const filteredTxns = transactions.filter((txn) => {
    if (activeTab === 'in') return txn.direction === 'in';
    if (activeTab === 'out') return txn.direction === 'out';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <WalletCards className="w-6 h-6 text-[#51122F]" />
            <span>{t('nav_treasury')}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isRtl
              ? `إدارة الخزائن النقدية، ${bankNameAr}، وتسوية مبالغ الدفع عند الاستلام (COD)`
              : `Corporate cash vaults, ${bankNameEn} integration, and merchant COD payout reconciliation`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => alert(isRtl ? 'تم تصدير ملف التسوية بنجاح' : 'Settlement batch exported.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isRtl ? 'تصدير كشف التسوية' : 'Export Batch'}</span>
          </button>
        </div>
      </div>

      {/* Corporate Wallets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className={`p-4 sm:p-6 rounded-2xl border shadow-sm transition-all flex flex-col justify-between ${
              wallet.is_default
                ? 'bg-gradient-to-br from-[#1C0B1B] to-[#2F1127] text-white border-pink-900/40 shadow-md'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`p-2.5 rounded-xl ${
                  wallet.is_default ? 'bg-white/10 text-pink-300' : 'bg-slate-100 text-[#51122F]'
                }`}>
                  {wallet.type === 'vault' ? (
                    <Vault className="w-5 h-5" />
                  ) : wallet.type === 'bank' ? (
                    <Building2 className="w-5 h-5" />
                  ) : (
                    <WalletCards className="w-5 h-5" />
                  )}
                </span>
                {wallet.is_default && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30">
                    {isRtl ? 'الخزينة الرئيسية' : 'Primary Vault'}
                  </span>
                )}
              </div>

              <div className={`text-xs font-bold uppercase tracking-wider ${
                wallet.is_default ? 'text-slate-300' : 'text-slate-500'
              }`}>
                {isRtl ? wallet.name_ar : wallet.name_en}
              </div>

              <div className={`text-2xl font-black tracking-tight mt-1 font-mono ${
                wallet.is_default ? 'text-white' : 'text-slate-900'
              }`}>
                {formatCurrency(wallet.balance)}
              </div>
            </div>

            <div className={`mt-4 pt-3 border-t text-[11px] font-mono flex items-center justify-between ${
              wallet.is_default ? 'border-white/10 text-slate-400' : 'border-slate-100 text-slate-500'
            }`}>
              <span>Account / IBAN:</span>
              <span className="font-semibold">{wallet.account_number}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction & Settlement Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#51122F]" />
            <h2 className="text-sm font-bold text-slate-900">
              {isRtl ? 'سجل حركات الخزينة والتحويلات' : 'Treasury Movements & Payout Audit'}
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 font-semibold rounded-md transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRtl ? 'كافة العمليات' : 'All Transactions'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('in')}
              className={`px-3 py-1 font-semibold rounded-md transition-all ${
                activeTab === 'in'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRtl ? 'تحصيلات واردة' : 'Inflows (COD)'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('out')}
              className={`px-3 py-1 font-semibold rounded-md transition-all ${
                activeTab === 'out'
                  ? 'bg-white text-purple-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isRtl ? 'تسويات صادرة' : 'Outflows (Payouts)'}
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right border-collapse text-xs min-w-[540px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-4">{isRtl ? 'المرجع والوصف' : 'Reference & Description'}</th>
                <th className="py-2.5 px-4">{isRtl ? 'الحساب المستهدف' : 'Wallet / Target'}</th>
                <th className="py-2.5 px-4">{isRtl ? 'التاريخ والوقت' : 'Timestamp'}</th>
                <th className="py-2.5 px-4 text-right rtl:text-left">{isRtl ? 'المبلغ' : 'Amount'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTxns.map((txn) => {
                const isIn = txn.direction === 'in';
                return (
                  <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <span className={`p-1.5 rounded-lg ${
                          isIn ? 'bg-emerald-50 text-emerald-700' : 'bg-purple-50 text-purple-700'
                        }`}>
                          {isIn ? (
                            <ArrowDownLeft className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          )}
                        </span>
                        <div>
                          <span className="font-bold text-slate-900 block font-mono text-[11px]">
                            {txn.ref_id}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {isRtl ? txn.description_ar : txn.description_en}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">
                      {txn.wallet_name}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(txn.created_at).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className={`py-3 px-4 text-right rtl:text-left font-mono font-bold text-sm ${
                      isIn ? 'text-emerald-700' : 'text-purple-700'
                    }`}>
                      {isIn ? '+' : '-'}{formatCurrency(txn.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
