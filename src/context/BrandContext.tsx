'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export interface BrandConfig {
  client: string;
  city: string;
  curr: string;
  domain: string;
  isCustomClient: boolean;
  phonePrefix: string;
  zones: string[];
  zonesAr: string[];
  currencySymbolAr: string;
  domainFavicon: string | null;
  bankNameEn: string;
  bankNameAr: string;
  driverPlateSuffix: string;
  queryString: string;
  createHref: (path: string) => string;
}

interface ResolvedCityConfig {
  city: string;
  cityAr: string;
  phonePrefix: string;
  curr: string;
  currencySymbolAr: string;
  zones: string[];
  zonesAr: string[];
  driverPlateSuffix: string;
  bankNameEn: string;
  bankNameAr: string;
}

export function resolveCityConfig(cityInput?: string, currInput?: string): ResolvedCityConfig {
  const cityTrim = (cityInput || '').trim();
  const cityLower = cityTrim.toLowerCase();
  const currUpper = (currInput || '').trim().toUpperCase();

  // Riyadh
  if (cityLower === 'riyadh' || cityLower === 'الرياض') {
    return {
      city: 'Riyadh',
      cityAr: 'الرياض',
      phonePrefix: '+966',
      curr: currUpper || 'SAR',
      currencySymbolAr: 'ر.س',
      zones: [
        'Al-Olaya',
        'Al-Malqa',
        'Al-Nakheel',
        'Al-Yasmin',
        'Diriyah',
        'Al-Sulaimaniyah',
        'Al-Izdihar',
        'Al-Sahafa',
        'Al-Murabba',
        'Al-Aqiq'
      ],
      zonesAr: [
        'العليا',
        'الملقا',
        'النخيل',
        'الياسمين',
        'الدرعية',
        'السليمانية',
        'الازدهار',
        'الصحافة',
        'المربع',
        'العقيق'
      ],
      driverPlateSuffix: 'KSA',
      bankNameEn: 'Al Rajhi & SNB Corporate Vault',
      bankNameAr: 'حسابات الراجحي والأهلي والخزينة'
    };
  }

  // Jeddah
  if (cityLower === 'jeddah' || cityLower === 'جدة') {
    return {
      city: 'Jeddah',
      cityAr: 'جدة',
      phonePrefix: '+966',
      curr: currUpper || 'SAR',
      currencySymbolAr: 'ر.س',
      zones: [
        'Al-Rawdah',
        'Al-Hamra',
        'Al-Shati',
        'Al-Zahra',
        'Al-Andalus',
        'Al-Mohammadiyyah',
        'Al-Salama',
        'Al-Naeem'
      ],
      zonesAr: [
        'الروضة',
        'الحمراء',
        'الشاطئ',
        'الزهراء',
        'الأندلس',
        'المحمدية',
        'السلامة',
        'النعيم'
      ],
      driverPlateSuffix: 'KSA',
      bankNameEn: 'SNB Corporate Banking & Vault',
      bankNameAr: 'حسابات البنك الأهلي والخزينة'
    };
  }

  // Dubai
  if (cityLower === 'dubai' || cityLower === 'دبي') {
    return {
      city: 'Dubai',
      cityAr: 'دبي',
      phonePrefix: '+971',
      curr: currUpper || 'AED',
      currencySymbolAr: 'د.إ',
      zones: [
        'Downtown',
        'Business Bay',
        'Marina',
        'JLT',
        'Palm Jumeirah',
        'DIFC',
        'Deira',
        'Al Barsha'
      ],
      zonesAr: [
        'وسط المدينة',
        'الخليج التجاري',
        'دبي مارينا',
        'أبراج بحيرات جميرا',
        'نخلة جميرا',
        'مركز دبي المالي',
        'ديرة',
        'البرشاء'
      ],
      driverPlateSuffix: 'DXB',
      bankNameEn: 'Emirates NBD & Vault Reserve',
      bankNameAr: 'حسابات بنك الإمارات دبي الوطني والخزينة'
    };
  }

  // If currency specified as SAR without known city -> Saudi
  if (currUpper === 'SAR') {
    return {
      city: cityTrim || 'Riyadh',
      cityAr: cityTrim || 'الرياض',
      phonePrefix: '+966',
      curr: 'SAR',
      currencySymbolAr: 'ر.س',
      zones: [
        'Al-Olaya',
        'Al-Malqa',
        'Al-Nakheel',
        'Al-Yasmin',
        'Diriyah',
        'Al-Sulaimaniyah'
      ],
      zonesAr: [
        'العليا',
        'الملقا',
        'النخيل',
        'الياسمين',
        'الدرعية',
        'السليمانية'
      ],
      driverPlateSuffix: 'KSA',
      bankNameEn: 'Al Rajhi & SNB Corporate Vault',
      bankNameAr: 'حسابات الراجحي والأهلي والخزينة'
    };
  }

  // Default: Doha, Qatar
  const currencySymbol = currUpper === 'SAR' ? 'ر.س' : currUpper === 'AED' ? 'د.إ' : currUpper === 'USD' ? '$' : 'ر.ق';

  return {
    city: cityTrim || 'Doha',
    cityAr: cityTrim || 'الدوحة',
    phonePrefix: '+974',
    curr: currUpper || 'QAR',
    currencySymbolAr: currencySymbol,
    zones: [
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
    ],
    zonesAr: [
      'لوسيل مارينا',
      'اللؤلؤة قطر',
      'الخليج الغربي التجاري',
      'بحيرة الخليج الغربي',
      'السد',
      'الوعب',
      'الدفنة الدبلوماسية',
      'مدينة خليفة الجنوبية',
      'الريان',
      'الوكرة الساحلية'
    ],
    driverPlateSuffix: 'QA',
    bankNameEn: 'QNB & Vault Reserve',
    bankNameAr: 'حسابات QNB والخزائن'
  };
}

const BrandContext = createContext<BrandConfig | undefined>(undefined);

function SearchParamsReader({ onParams }: { onParams: (params: URLSearchParams) => void }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    onParams(searchParams);
  }, [searchParams, onParams]);

  return null;
}

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<string>('OpsWired');
  const [city, setCity] = useState<string>('Doha');
  const [curr, setCurr] = useState<string>('QAR');
  const [domain, setDomain] = useState<string>('');

  // Immediate read from window.location.search or sessionStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlClient = urlParams.get('client');
      const urlCity = urlParams.get('city');
      const urlCurr = urlParams.get('curr');
      const urlDomain = urlParams.get('domain');

      if (urlClient || urlCity || urlCurr || urlDomain) {
        if (urlClient) setClient(urlClient);
        if (urlCity) setCity(urlCity);
        if (urlCurr) setCurr(urlCurr.toUpperCase());
        if (urlDomain) setDomain(urlDomain);

        // Cache in sessionStorage
        sessionStorage.setItem(
          'opswired_brand_params',
          JSON.stringify({
            client: urlClient || 'OpsWired',
            city: urlCity || 'Doha',
            curr: (urlCurr || 'QAR').toUpperCase(),
            domain: urlDomain || ''
          })
        );
      } else {
        // Fallback to sessionStorage if navigated without search params
        const saved = sessionStorage.getItem('opswired_brand_params');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.client) setClient(parsed.client);
          if (parsed.city) setCity(parsed.city);
          if (parsed.curr) setCurr(parsed.curr);
          if (parsed.domain) setDomain(parsed.domain);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleParamsChange = useCallback((params: URLSearchParams) => {
    const pClient = params.get('client');
    const pCity = params.get('city');
    const pCurr = params.get('curr');
    const pDomain = params.get('domain');

    if (pClient !== null) setClient(pClient || 'OpsWired');
    if (pCity !== null) setCity(pCity || 'Doha');
    if (pCurr !== null) setCurr((pCurr || 'QAR').toUpperCase());
    if (pDomain !== null) setDomain(pDomain || '');

    if (pClient || pCity || pCurr || pDomain) {
      try {
        sessionStorage.setItem(
          'opswired_brand_params',
          JSON.stringify({
            client: pClient || client,
            city: pCity || city,
            curr: (pCurr || curr).toUpperCase(),
            domain: pDomain || domain
          })
        );
      } catch {
        // ignore
      }
    }
  }, [client, city, curr, domain]);

  const resolved = useMemo(() => {
    return resolveCityConfig(city, curr);
  }, [city, curr]);

  const isCustomClient = useMemo(() => {
    if (!client) return false;
    const lower = client.trim().toLowerCase();
    return lower !== 'opswired' && lower !== 'speedoo' && lower !== '';
  }, [client]);

  const domainFavicon = useMemo(() => {
    if (!domain) return null;
    const cleanDomain = domain.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').trim();
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(cleanDomain)}&sz=64`;
  }, [domain]);

  // Construct query string for retaining search params across link navigation
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (isCustomClient) params.set('client', client);
    if (city && city.toLowerCase() !== 'doha') params.set('city', city);
    if (resolved.curr && resolved.curr !== 'QAR') params.set('curr', resolved.curr);
    if (domain) params.set('domain', domain);

    const qs = params.toString();
    return qs ? `?${qs}` : '';
  }, [isCustomClient, client, city, resolved.curr, domain]);

  const createHref = useCallback((path: string): string => {
    if (!queryString) return path;
    const [pathname, existingQuery] = path.split('?');
    if (!existingQuery) {
      return `${pathname}${queryString}`;
    }
    // Merge existing params with brand params
    const merged = new URLSearchParams(existingQuery);
    const brandParams = new URLSearchParams(queryString.replace(/^\?/, ''));
    brandParams.forEach((val, key) => {
      if (!merged.has(key)) {
        merged.set(key, val);
      }
    });
    return `${pathname}?${merged.toString()}`;
  }, [queryString]);

  // Dynamically update document title and favicon
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isCustomClient) {
      document.title = `${client} Fleet Command — Enterprise Dispatch OS (${resolved.city} Hub)`;
    }

    if (domainFavicon) {
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = domainFavicon;
    }
  }, [isCustomClient, client, resolved.city, domainFavicon]);

  const value: BrandConfig = {
    client: isCustomClient ? client : 'OpsWired',
    city: resolved.city,
    curr: resolved.curr,
    domain,
    isCustomClient,
    phonePrefix: resolved.phonePrefix,
    zones: resolved.zones,
    zonesAr: resolved.zonesAr,
    currencySymbolAr: resolved.currencySymbolAr,
    domainFavicon,
    bankNameEn: resolved.bankNameEn,
    bankNameAr: resolved.bankNameAr,
    driverPlateSuffix: resolved.driverPlateSuffix,
    queryString,
    createHref
  };

  return (
    <BrandContext.Provider value={value}>
      <Suspense fallback={null}>
        <SearchParamsReader onParams={handleParamsChange} />
      </Suspense>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand(): BrandConfig {
  const context = useContext(BrandContext);
  if (!context) {
    // Provide sensible fallback if used outside provider
    const fallback = resolveCityConfig('Doha', 'QAR');
    return {
      client: 'OpsWired',
      city: 'Doha',
      curr: 'QAR',
      domain: '',
      isCustomClient: false,
      phonePrefix: '+974',
      zones: fallback.zones,
      zonesAr: fallback.zonesAr,
      currencySymbolAr: 'ر.ق',
      domainFavicon: null,
      bankNameEn: fallback.bankNameEn,
      bankNameAr: fallback.bankNameAr,
      driverPlateSuffix: 'QA',
      queryString: '',
      createHref: (p: string) => p
    };
  }
  return context;
}
