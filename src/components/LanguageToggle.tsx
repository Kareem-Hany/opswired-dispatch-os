'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200">
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          language === 'en'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span>EN</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          language === 'ar'
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span>عربي</span>
      </button>
    </div>
  );
}
