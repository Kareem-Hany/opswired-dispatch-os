'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  direction: 'ltr' | 'rtl';
  isRtl: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations.en) => string;
  formatCurrency: (amount: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Check localStorage or default to English
    try {
      const saved = localStorage.getItem('opswired_lang') as Language;
      if (saved && (saved === 'en' || saved === 'ar')) {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const isRtl = language === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    try {
      localStorage.setItem('opswired_lang', language);
    } catch {
      // ignore
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  const formatCurrency = (amount: number): string => {
    const formatted = new Intl.NumberFormat(language === 'ar' ? 'ar-QA' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);

    return language === 'ar' ? `${formatted} ر.ق` : `QAR ${formatted}`;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction: language === 'ar' ? 'rtl' : 'ltr',
        isRtl: language === 'ar',
        setLanguage,
        toggleLanguage,
        t,
        formatCurrency
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
