'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

/**
 * DemoWatermark: Now renders as a clean non-floating inline attribution for standalone pages (like public tracking)
 * It will NEVER float over dashboard cards, tables, or buttons.
 */
export function DemoWatermark() {
  const { isRtl } = useLanguage();

  return (
    <div className="py-4 text-center print:hidden">
      <a
        href="https://kareemkreations.com/proposal/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-medium transition-all shadow-sm"
      >
        <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        <span>
          {isRtl ? 'تصميم وهندسة: كريم كرييشنز' : 'Engineered by Kareem Kreations'}
        </span>
        <ExternalLink className="w-3 h-3 text-slate-400" />
      </a>
    </div>
  );
}
