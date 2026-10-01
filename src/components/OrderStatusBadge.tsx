'use client';

import React from 'react';
import { OrderStatus } from '@/lib/types';
import { useLanguage } from '@/context/LanguageContext';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
}

export function OrderStatusBadge({ status, size = 'md' }: OrderStatusBadgeProps) {
  const { t } = useLanguage();

  const configs: Record<OrderStatus, { labelKey: 'status_new' | 'status_in_transit' | 'status_delivered' | 'status_deferred' | 'status_cancelled'; bg: string; text: string; border: string; dot: string; pulse?: boolean }> = {
    new: {
      labelKey: 'status_new',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      dot: 'bg-blue-600',
    },
    in_transit: {
      labelKey: 'status_in_transit',
      bg: 'bg-indigo-50',
      text: 'text-indigo-700',
      border: 'border-indigo-200',
      dot: 'bg-indigo-600',
      pulse: true,
    },
    delivered: {
      labelKey: 'status_delivered',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      dot: 'bg-emerald-600',
    },
    deferred: {
      labelKey: 'status_deferred',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      border: 'border-amber-200',
      dot: 'bg-amber-600',
    },
    cancelled: {
      labelKey: 'status_cancelled',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      border: 'border-rose-200',
      dot: 'bg-rose-600',
    },
  };

  const conf = configs[status] || configs.new;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs font-medium px-2.5 py-1 gap-2',
    lg: 'text-sm font-semibold px-3 py-1.5 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border ${conf.bg} ${conf.text} ${conf.border} ${sizeClasses} transition-colors`}
    >
      <span className="relative flex h-2 w-2">
        {conf.pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${conf.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${conf.dot}`} />
      </span>
      <span>{t(conf.labelKey)}</span>
    </span>
  );
}
