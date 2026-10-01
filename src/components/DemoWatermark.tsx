'use client';

import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function DemoWatermark() {
  const { isRtl } = useLanguage();

  return (
    <div
      className={`fixed bottom-4 z-40 ${
        isRtl ? 'left-4' : 'right-4'
      } print:hidden transition-all duration-300 hover:scale-105`}
    >
      <a
        href="https://kareemkreations.com/proposal/"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 text-white shadow-xl shadow-slate-900/20 backdrop-blur-md border border-slate-700/60 hover:bg-slate-900 hover:border-maroon-500/50 hover:shadow-maroon-900/20 text-xs font-medium tracking-wide transition-all"
        style={{
          boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3), 0 8px 10px -6px rgba(15, 23, 42, 0.2)'
        }}
      >
        <span className="flex h-2 w-2 rounded-full bg-amber-400 group-hover:bg-amber-300 animate-pulse" />
        <span className="text-slate-200 group-hover:text-white">
          {isRtl ? 'تصميم وهندسة: كريم كرييشنز' : 'Engineered by Kareem Kreations'}
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
      </a>
    </div>
  );
}
