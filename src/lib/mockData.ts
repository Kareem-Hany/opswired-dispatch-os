import { Order, Driver, Store, Wallet, Transaction } from './types';

export const initialStores: Store[] = [
  {
    id: 'str_1',
    name: 'Al-Noor Luxury Electronics',
    code: 'NOOR-EL',
    phone: '+974 4488 2190',
    manager: 'Eng. Khalid Al-Sulaiti',
    zone: 'Lusail Marina',
    address: 'Marina Twin Towers, 14th Floor, Lusail City',
    default_delivery_fee: 35,
    pending_payout: 4250.00,
    active_orders_count: 5
  },
  {
    id: 'str_2',
    name: 'Doha Fashion Hub',
    code: 'DFH-QTR',
    phone: '+974 4411 9800',
    manager: 'Maryam Al-Kuwari',
    zone: 'Aspire Zone',
    address: 'Villaggio Mall, Luxury Boulevard, Gate 3',
    default_delivery_fee: 25,
    pending_payout: 2890.00,
    active_orders_count: 4
  },
  {
    id: 'str_3',
    name: 'Al-Rayyan Royal Oud & Perfumes',
    code: 'RAYYAN-OUD',
    phone: '+974 4433 7712',
    manager: 'Salem Al-Marri',
    zone: 'Souq Waqif',
    address: 'Heritage Perfumery Souq, Shop #42',
    default_delivery_fee: 30,
    pending_payout: 1980.00,
    active_orders_count: 2
  },
  {
    id: 'str_4',
    name: 'Gourmet Qatar Organic Market',
    code: 'GOURMET-QA',
    phone: '+974 4499 5540',
    manager: 'Chef Ziad Haddad',
    zone: 'The Pearl-Qatar',
    address: 'Medina Centrale, Building 9, Plaza Walk',
    default_delivery_fee: 40,
    pending_payout: 1310.00,
    active_orders_count: 3
  }
];

export const initialDrivers: Driver[] = [
  {
    id: 'drv_1',
    name: 'Tariq Mansoor',
    phone: '+974 5512 8934',
    vehicle: 'Toyota Hilux Cargo Van',
    license_plate: '48921-QA',
    zone: 'Lusail & West Bay',
    status: 'on_route',
    active_deliveries: 3,
    rating: 4.9,
    cash_float: 1450.00
  },
  {
    id: 'drv_2',
    name: 'Ahmed Al-Kuwari',
    phone: '+974 6623 4811',
    vehicle: 'Nissan Urvan High-Roof',
    license_plate: '31084-QA',
    zone: 'The Pearl & Dafna',
    status: 'on_route',
    active_deliveries: 4,
    rating: 4.8,
    cash_float: 2200.00
  },
  {
    id: 'drv_3',
    name: 'Bilal Rashid',
    phone: '+974 3345 7890',
    vehicle: 'Honda PCX 160 Express Bike',
    license_plate: '99420-QA',
    zone: 'Al Sadd & Al Waab',
    status: 'active',
    active_deliveries: 1,
    rating: 5.0,
    cash_float: 620.00
  },
  {
    id: 'drv_4',
    name: 'Youssef Al-Hassan',
    phone: '+974 7790 1255',
    vehicle: 'Suzuki Swift Delivery Unit',
    license_plate: '58319-QA',
    zone: 'Al Rayyan & Al Wakra',
    status: 'active',
    active_deliveries: 0,
    rating: 4.7,
    cash_float: 0.00
  }
];

export const initialWallets: Wallet[] = [
  {
    id: 'wal_1',
    name_en: 'Main Treasury Corporate Vault',
    name_ar: 'الخزينة التشغيلية الرئيسية',
    account_number: 'QNB-QA91-0001849204',
    balance: 14250.00,
    is_default: true,
    type: 'vault'
  },
  {
    id: 'wal_2',
    name_en: 'Qatar National Bank (QNB Operational)',
    name_ar: 'حساب بنك قطر الوطني التجاري',
    account_number: 'QNB-QA88-9920148192',
    balance: 48920.00,
    is_default: false,
    type: 'bank'
  },
  {
    id: 'wal_3',
    name_en: 'Driver On-Road Cash Floats',
    name_ar: 'صناديق عهد المناديب الميدانية',
    account_number: 'FLOAT-POOL-QA',
    balance: 4270.00,
    is_default: false,
    type: 'float'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord_1',
    order_number: 'SPD-2024-8841',
    tracking_token: 'SPD88419X',
    store_id: 'str_1',
    store_name: 'Al-Noor Luxury Electronics',
    driver_id: 'drv_1',
    driver_name: 'Tariq Mansoor',
    customer_name: 'Sheikh Nasser Al-Thani',
    customer_phone: '+974 5589 1234',
    customer_email: 'nasser.thani@qatar.net.qa',
    pickup_zone: 'Lusail Marina',
    pickup_address: 'Al-Noor Central Vault, Marina Tower 14, Unit 201',
    delivery_zone: 'The Pearl-Qatar',
    delivery_address: 'Porto Arabia Tower 22, Penthouse Suite 1802',
    order_amount: 1450.00,
    delivery_fee: 35.00,
    total_amount: 1485.00,
    payment_method: 'cod',
    collection_status: 'pending',
    status: 'in_transit',
    notes: 'Fragile: Sony Alpha Camera body + G-Master Lens. Call upon gate entry.',
    pickup_time: '11:30 AM',
    delivery_time: '02:00 PM - 04:00 PM',
    created_at: '2026-10-01T09:15:00Z',
    updated_at: '2026-10-01T11:45:00Z',
    events: [
      {
        id: 'ev_1',
        timestamp: '2026-10-01T09:15:00Z',
        type: 'created',
        title_en: 'Order Received from Merchant',
        title_ar: 'تم استلام طلب الشحن من المتجر',
        description_en: 'Merchant dispatched digital waybill via API',
        description_ar: 'تم إدراج بوليصة الشحن رقمياً عبر واجهة الربط',
        actor: 'Al-Noor System Integration'
      },
      {
        id: 'ev_2',
        timestamp: '2026-10-01T10:00:00Z',
        type: 'driver_assigned',
        title_en: 'Assigned to Courier',
        title_ar: 'تم إسناد الشحنة لمندوب التوصيل',
        description_en: 'Assigned to Tariq Mansoor (Toyota Hilux 48921-QA)',
        description_ar: 'تم التكليف للمندوب طارق منصور (سيارة تويوتا 48921-قطر)',
        actor: 'Ops Room Dispatch'
      },
      {
        id: 'ev_3',
        timestamp: '2026-10-01T11:30:00Z',
        type: 'status_change',
        title_en: 'Picked Up & Out For Delivery',
        title_ar: 'تم الاستلام والشحنة على الطريق للتسليم',
        description_en: 'Package verified at Lusail Hub and dispatched to The Pearl',
        description_ar: 'تم فحص الطرد في مركز لوسيل وانطلق المندوب لمنطقة اللؤلؤة',
        actor: 'Tariq Mansoor'
      }
    ]
  },
  {
    id: 'ord_2',
    order_number: 'SPD-2024-8842',
    tracking_token: 'SPD88427K',
    store_id: 'str_2',
    store_name: 'Doha Fashion Hub',
    driver_id: 'drv_2',
    driver_name: 'Ahmed Al-Kuwari',
    customer_name: 'Reem Al-Kuwari',
    customer_phone: '+974 6611 9088',
    customer_email: 'reem.kuwari@outlook.com',
    pickup_zone: 'Aspire Zone',
    pickup_address: 'Villaggio Mall, Gate 3 Storage Bay',
    delivery_zone: 'Al Sadd',
    delivery_address: 'Al Sadd St, Al Mirqab Complex, Villa 12',
    order_amount: 890.00,
    delivery_fee: 25.00,
    total_amount: 915.00,
    payment_method: 'cod',
    collection_status: 'collected',
    status: 'delivered',
    notes: 'Haute couture dress bag. Deliver directly to recipient.',
    pickup_time: '10:00 AM',
    delivery_time: '12:30 PM',
    created_at: '2026-10-01T08:30:00Z',
    updated_at: '2026-10-01T12:35:00Z',
    events: [
      {
        id: 'ev_4',
        timestamp: '2026-10-01T08:30:00Z',
        type: 'created',
        title_en: 'Direct Dispatch Registered',
        title_ar: 'تم تسجيل إرسالية الشحن',
        description_en: 'Order prepared by Villaggio fashion atelier',
        description_ar: 'تم تجهيز الطرد من فرع فيلاجيو مول',
        actor: 'Store Clerk Maryam'
      },
      {
        id: 'ev_5',
        timestamp: '2026-10-01T12:30:00Z',
        type: 'status_change',
        title_en: 'Delivered & Signed',
        title_ar: 'تم التسليم والتوقيع بالاستلام',
        description_en: 'Handed to recipient with digital signature confirmation',
        description_ar: 'تم التسليم للمستلمة والتوقيع الإلكتروني',
        actor: 'Ahmed Al-Kuwari'
      },
      {
        id: 'ev_6',
        timestamp: '2026-10-01T12:35:00Z',
        type: 'collected',
        title_en: 'COD Cash Collected',
        title_ar: 'تم تحصيل المبلغ نقداً',
        description_en: 'Recipient received item and paid in cash',
        description_ar: 'تم استلام المبلغ نقداً مع المندوب',
        actor: 'Ahmed Al-Kuwari'
      }
    ]
  },
  {
    id: 'ord_3',
    order_number: 'SPD-2024-8843',
    tracking_token: 'SPD88432M',
    store_id: 'str_3',
    store_name: 'Al-Rayyan Royal Oud & Perfumes',
    driver_id: null,
    driver_name: null,
    customer_name: 'Fahad Al-Marri',
    customer_phone: '+974 3322 5541',
    pickup_zone: 'Souq Waqif',
    pickup_address: 'Heritage Perfumery Souq, Shop #42',
    delivery_zone: 'West Bay Commercial',
    delivery_address: 'Qatar Financial Centre, Tower 1, Floor 28',
    order_amount: 620.00,
    delivery_fee: 30.00,
    total_amount: 650.00,
    payment_method: 'cod',
    collection_status: 'pending',
    status: 'new',
    notes: 'Custom engraved Agarwood oil flacon. VIP customer delivery.',
    pickup_time: 'Ready for Pickup',
    delivery_time: 'Today 04:00 PM - 06:00 PM',
    created_at: '2026-10-01T12:00:00Z',
    updated_at: '2026-10-01T12:00:00Z',
    events: [
      {
        id: 'ev_7',
        timestamp: '2026-10-01T12:00:00Z',
        type: 'created',
        title_en: 'Shipment Created - Pending Courier',
        title_ar: 'تم إنشاء الشحنة - بانتظار إسناد المندوب',
        description_en: 'Stored in Souq Waqif safe vault waiting for courier pool assignment',
        description_ar: 'الشحنة جاهزة في خزينة سوق واقف بانتظار توجيه المندوب',
        actor: 'Salem Al-Marri'
      }
    ]
  },
  {
    id: 'ord_4',
    order_number: 'SPD-2024-8844',
    tracking_token: 'SPD88445R',
    store_id: 'str_4',
    store_name: 'Gourmet Qatar Organic Market',
    driver_id: 'drv_3',
    driver_name: 'Bilal Rashid',
    customer_name: 'Dr. Noura Al-Kuwari',
    customer_phone: '+974 5544 3322',
    pickup_zone: 'The Pearl-Qatar',
    pickup_address: 'Medina Centrale, Building 9, Plaza Walk',
    delivery_zone: 'West Bay Lagoon',
    delivery_address: 'West Bay Lagoon, Legtaifiya Villa 44, North Gate',
    order_amount: 410.00,
    delivery_fee: 40.00,
    total_amount: 450.00,
    payment_method: 'cod',
    collection_status: 'pending',
    status: 'deferred',
    notes: 'Customer requested reschedule to 07:30 PM due to hospital surgery shift.',
    pickup_time: '01:00 PM',
    delivery_time: 'Rescheduled: 07:30 PM',
    created_at: '2026-10-01T10:45:00Z',
    updated_at: '2026-10-01T13:10:00Z',
    events: [
      {
        id: 'ev_8',
        timestamp: '2026-10-01T10:45:00Z',
        type: 'created',
        title_en: 'Cold-Chain Grocery Packaged',
        title_ar: 'تم تجهيز الطرد المبرد',
        description_en: 'Organic fruits & artisan dairy packed in insulated cooler box',
        description_ar: 'تم التجهيز في صناديق حرارية مبردة خاصة',
        actor: 'Chef Ziad Haddad'
      },
      {
        id: 'ev_9',
        timestamp: '2026-10-01T13:10:00Z',
        type: 'status_change',
        title_en: 'Delivery Rescheduled by Customer',
        title_ar: 'تم تأجيل موعد التسليم بطلب العميل',
        description_en: 'Dr. Noura contacted dispatch: postpone to 07:30 PM evening run',
        description_ar: 'تم التواصل وتأجيل موعد الوصول للفترة المسائية الساعة 07:30 م',
        actor: 'Dispatch Customer Care'
      }
    ]
  },
  {
    id: 'ord_5',
    order_number: 'SPD-2024-8845',
    tracking_token: 'SPD88456P',
    store_id: 'str_1',
    store_name: 'Al-Noor Luxury Electronics',
    driver_id: 'drv_2',
    driver_name: 'Ahmed Al-Kuwari',
    customer_name: 'Abdullah Al-Sulaiti',
    customer_phone: '+974 7788 4411',
    pickup_zone: 'Lusail Marina',
    pickup_address: 'Marina Twin Towers, 14th Floor, Lusail City',
    delivery_zone: 'Dafna Diplomatic',
    delivery_address: 'Diplomatic Area, Al Qassar St, Villa 18',
    order_amount: 2150.00,
    delivery_fee: 35.00,
    total_amount: 2185.00,
    payment_method: 'cod',
    collection_status: 'pending',
    status: 'in_transit',
    notes: 'iPad Pro 13-inch M4 + Magic Keyboard. High value item.',
    pickup_time: '01:30 PM',
    delivery_time: '03:00 PM - 05:00 PM',
    created_at: '2026-10-01T11:00:00Z',
    updated_at: '2026-10-01T13:30:00Z',
    events: [
      {
        id: 'ev_10',
        timestamp: '2026-10-01T11:00:00Z',
        type: 'created',
        title_en: 'High-Value Dispatch Ingested',
        title_ar: 'تم إدراج شحنة إلكترونيات عالية القيمة',
        description_en: 'Order insured under Speedoo High-Value Protocol',
        description_ar: 'الشحنة مشمولة بالتأمين الشامل للنقل الآمن',
        actor: 'Al-Noor Dispatch'
      },
      {
        id: 'ev_11',
        timestamp: '2026-10-01T13:30:00Z',
        type: 'driver_assigned',
        title_en: 'Handed to Courier Ahmed Al-Kuwari',
        title_ar: 'تم تسليم الطرد للمندوب أحمد الكواري',
        description_en: 'En route to Dafna Diplomatic Area',
        description_ar: 'المندوب انطلق لمنطقة الدفنة الدبلوماسية',
        actor: 'Ahmed Al-Kuwari'
      }
    ]
  },
  {
    id: 'ord_6',
    order_number: 'SPD-2024-8846',
    tracking_token: 'SPD88468W',
    store_id: 'str_2',
    store_name: 'Doha Fashion Hub',
    driver_id: null,
    driver_name: null,
    customer_name: 'Lulwa Al-Subaey',
    customer_phone: '+974 5533 1188',
    pickup_zone: 'Aspire Zone',
    pickup_address: 'Villaggio Mall, Gate 3 Storage Bay',
    delivery_zone: 'Al Waab',
    delivery_address: 'Al Waab City, Jasmine Courtyard, Villa 31',
    order_amount: 1100.00,
    delivery_fee: 25.00,
    total_amount: 1125.00,
    payment_method: 'cod',
    collection_status: 'pending',
    status: 'new',
    notes: 'Evening gala shoes. Ring intercom twice.',
    pickup_time: 'Ready for Pickup',
    delivery_time: 'Today 05:00 PM - 07:00 PM',
    created_at: '2026-10-01T13:00:00Z',
    updated_at: '2026-10-01T13:00:00Z',
    events: [
      {
        id: 'ev_12',
        timestamp: '2026-10-01T13:00:00Z',
        type: 'created',
        title_en: 'Order Logged by Merchant',
        title_ar: 'تم تسجيل الشحنة بواسطة المتجر',
        description_en: 'Package awaiting courier allocation in Al Waab zone cluster',
        description_ar: 'الطرد بانتظار إسناده لمندوب خط سير الوعب',
        actor: 'Villaggio Logistics'
      }
    ]
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'txn_1',
    wallet_id: 'wal_1',
    wallet_name: 'Main Treasury Corporate Vault',
    direction: 'in',
    amount: 10430.00,
    ref_type: 'cod_remit',
    ref_id: 'REMIT-2026-10-01',
    description_en: 'Consolidated driver cash remittances for Morning Shift',
    description_ar: 'توريد تحصيلات المناديب النقدية للفترة الصباحية',
    created_at: '2026-10-01T12:00:00Z'
  },
  {
    id: 'txn_2',
    wallet_id: 'wal_1',
    wallet_name: 'Main Treasury Corporate Vault',
    direction: 'out',
    amount: 8280.00,
    ref_type: 'store_payout',
    ref_id: 'PAYOUT-STR-BATCH-12',
    description_en: 'Direct Bank Settlement Transfer to Merchant Accounts',
    description_ar: 'تسوية بنكية وتحويل مالي لحسابات المتاجر الشريكة',
    created_at: '2026-10-01T13:00:00Z'
  },
  {
    id: 'txn_3',
    wallet_id: 'wal_3',
    wallet_name: 'Driver On-Road Cash Floats',
    direction: 'in',
    amount: 3820.00,
    ref_type: 'delivery_revenue',
    ref_id: 'FLOAT-ACTIVE-RUN',
    description_en: 'Active COD cash collected in field by active couriers',
    description_ar: 'مبالغ COD نقدية محصلة وموجودة بحوزة المناديب في الميدان',
    created_at: '2026-10-01T14:30:00Z'
  }
];

export interface LocalizationParams {
  city?: string;
  curr?: string;
  phonePrefix?: string;
  driverPlateSuffix?: string;
  client?: string;
}

export function getLocalizedMockData(params: LocalizationParams) {
  const city = (params.city || 'Doha').trim();
  const cityLower = city.toLowerCase();
  const phonePrefix = params.phonePrefix || '+974';
  const plateSuffix = params.driverPlateSuffix || 'QA';
  const clientName = params.client && params.client !== 'OpsWired' ? params.client : 'OpsWired';
  const prefixCode = clientName.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'SPD';

  // Saudi Arabia localization (Riyadh / Jeddah)
  if (cityLower === 'riyadh' || cityLower === 'jeddah' || phonePrefix === '+966') {
    const isJeddah = cityLower === 'jeddah';
    const store1Zone = isJeddah ? 'Al-Rawdah' : 'Al-Olaya';
    const store2Zone = isJeddah ? 'Al-Hamra' : 'Al-Nakheel';
    const store3Zone = isJeddah ? 'Al-Andalus' : 'Diriyah';
    const store4Zone = isJeddah ? 'Al-Shati' : 'Al-Malqa';

    const drivers: Driver[] = [
      {
        id: 'drv_1',
        name: 'Tariq Mansoor',
        phone: `${phonePrefix} 55 128 8934`,
        vehicle: 'Toyota Hilux Cargo Van',
        license_plate: `4892-${plateSuffix}`,
        zone: isJeddah ? 'Al-Rawdah & Al-Hamra' : 'Al-Olaya & Al-Malqa',
        status: 'on_route',
        active_deliveries: 3,
        rating: 4.9,
        cash_float: 1450.00
      },
      {
        id: 'drv_2',
        name: 'Ahmed Al-Kuwari',
        phone: `${phonePrefix} 56 234 4811`,
        vehicle: 'Nissan Urvan High-Roof',
        license_plate: `3108-${plateSuffix}`,
        zone: isJeddah ? 'Al-Shati & Al-Zahra' : 'Al-Nakheel & Diriyah',
        status: 'on_route',
        active_deliveries: 4,
        rating: 4.8,
        cash_float: 2200.00
      },
      {
        id: 'drv_3',
        name: 'Bilal Rashid',
        phone: `${phonePrefix} 54 345 7890`,
        vehicle: 'Honda PCX 160 Express Bike',
        license_plate: `9942-${plateSuffix}`,
        zone: isJeddah ? 'Al-Andalus & Al-Salama' : 'Al-Yasmin & Al-Sahafa',
        status: 'active',
        active_deliveries: 1,
        rating: 5.0,
        cash_float: 620.00
      },
      {
        id: 'drv_4',
        name: 'Youssef Al-Hassan',
        phone: `${phonePrefix} 57 790 1255`,
        vehicle: 'Suzuki Swift Delivery Unit',
        license_plate: `5831-${plateSuffix}`,
        zone: isJeddah ? 'Al-Mohammadiyyah' : 'Al-Sulaimaniyah & Al-Izdihar',
        status: 'active',
        active_deliveries: 0,
        rating: 4.7,
        cash_float: 0.00
      }
    ];

    const stores: Store[] = [
      {
        id: 'str_1',
        name: 'Al-Noor Luxury Electronics',
        code: 'NOOR-EL',
        phone: `${phonePrefix} 11 488 2190`,
        manager: 'Eng. Khalid Al-Sulaiti',
        zone: store1Zone,
        address: isJeddah ? 'Tahlia Street, Al-Rawdah Plaza' : 'King Fahd Rd, Olaya Towers, 14th Floor',
        default_delivery_fee: 35,
        pending_payout: 4250.00,
        active_orders_count: 5
      },
      {
        id: 'str_2',
        name: `${city} Fashion Hub`,
        code: `${city.slice(0, 3).toUpperCase()}-FSH`,
        phone: `${phonePrefix} 11 411 9800`,
        manager: 'Maryam Al-Kuwari',
        zone: store2Zone,
        address: isJeddah ? 'Red Sea Mall, Ground Floor, Gate 2' : 'Al Nakheel Mall, Gate 3 Boulevard',
        default_delivery_fee: 25,
        pending_payout: 2890.00,
        active_orders_count: 4
      },
      {
        id: 'str_3',
        name: 'Royal Heritage Oud & Perfumes',
        code: 'ROYAL-OUD',
        phone: `${phonePrefix} 11 433 7712`,
        manager: 'Salem Al-Marri',
        zone: store3Zone,
        address: isJeddah ? 'Al-Balad Heritage District, Shop #12' : 'Bujairi Heritage Souq, Shop #42',
        default_delivery_fee: 30,
        pending_payout: 1980.00,
        active_orders_count: 2
      },
      {
        id: 'str_4',
        name: 'Gourmet Organic Market',
        code: 'GOURMET-SA',
        phone: `${phonePrefix} 11 499 5540`,
        manager: 'Chef Ziad Haddad',
        zone: store4Zone,
        address: isJeddah ? 'Corniche Road, Promenade Complex #5' : 'Anas Ibn Malik St, Plaza 9',
        default_delivery_fee: 40,
        pending_payout: 1310.00,
        active_orders_count: 3
      }
    ];

    const wallets: Wallet[] = [
      {
        id: 'wal_1',
        name_en: 'Al Rajhi Corporate Settlement Vault',
        name_ar: 'الخزينة التشغيلية الرئيسية (مصرف الراجحي)',
        account_number: 'RJHI-SA91-0001849204',
        balance: 14250.00,
        is_default: true,
        type: 'vault'
      },
      {
        id: 'wal_2',
        name_en: 'Saudi National Bank (SNB Operational)',
        name_ar: 'حساب البنك الأهلي التجاري للعمليات',
        account_number: 'SNB-SA88-9920148192',
        balance: 48920.00,
        is_default: false,
        type: 'bank'
      },
      {
        id: 'wal_3',
        name_en: 'Driver On-Road Cash Floats',
        name_ar: 'صناديق عهد المناديب الميدانية (KSA)',
        account_number: 'FLOAT-POOL-KSA',
        balance: 4270.00,
        is_default: false,
        type: 'float'
      }
    ];

    const orders: Order[] = initialOrders.map((o, idx) => {
      const orderNum = `${prefixCode}-2024-${8841 + idx}`;
      const destZone = isJeddah
        ? ['Al-Rawdah', 'Al-Shati', 'Al-Hamra', 'Al-Zahra', 'Al-Andalus', 'Al-Salama'][idx % 6]
        : ['Al-Olaya', 'Al-Malqa', 'Al-Nakheel', 'Al-Yasmin', 'Diriyah', 'Al-Sulaimaniyah'][idx % 6];
      const customerPhone = `${phonePrefix} 55 ${idx}12 ${3456 + idx}`;

      return {
        ...o,
        order_number: orderNum,
        customer_phone: customerPhone,
        delivery_zone: destZone,
        delivery_address: `${destZone}, Villa ${14 + idx}, Street 22`,
        events: o.events.map(ev => ({
          ...ev,
          description_en: ev.description_en.replace(/Speedoo/g, clientName).replace(/Lusail/g, store1Zone).replace(/The Pearl/g, destZone).replace(/QAR/g, params.curr || 'SAR'),
          description_ar: ev.description_ar.replace(/سبيدو/g, clientName).replace(/لوسيل/g, store1Zone).replace(/اللؤلؤة/g, destZone).replace(/ر\.ق/g, 'ر.س')
        }))
      };
    });

    return { stores, drivers, wallets, orders, transactions: initialTransactions };
  }

  // Dubai localization
  if (cityLower === 'dubai' || phonePrefix === '+971') {
    const drivers: Driver[] = initialDrivers.map((d, idx) => ({
      ...d,
      phone: `${phonePrefix} 50 ${idx}12 ${3456 + idx}`,
      license_plate: `4892-${plateSuffix}`,
      zone: ['Downtown & Business Bay', 'Dubai Marina & JLT', 'Palm Jumeirah & DIFC', 'Deira & Al Barsha'][idx]
    }));

    const stores: Store[] = initialStores.map((s, idx) => ({
      ...s,
      phone: `${phonePrefix} 4 488 2190`,
      zone: ['Downtown Dubai', 'Dubai Mall', 'Souk Al Bahar', 'Dubai Marina'][idx],
      address: ['Emaar Square, Tower 4', 'Fashion Avenue, Level 2', 'Old Town Island, Shop #18', 'Marina Promenade, Tower 2'][idx]
    }));

    const wallets: Wallet[] = [
      {
        id: 'wal_1',
        name_en: 'Emirates NBD Corporate Settlement Vault',
        name_ar: 'الخزينة التشغيلية الرئيسية (الإمارات دبي الوطني)',
        account_number: 'ENBD-AE91-0001849204',
        balance: 14250.00,
        is_default: true,
        type: 'vault'
      },
      {
        id: 'wal_2',
        name_en: 'First Abu Dhabi Bank (FAB Operational)',
        name_ar: 'حساب بنك أبوظبي الأول التجاري',
        account_number: 'FAB-AE88-9920148192',
        balance: 48920.00,
        is_default: false,
        type: 'bank'
      },
      {
        id: 'wal_3',
        name_en: 'Driver On-Road Cash Floats',
        name_ar: 'صناديق عهد المناديب الميدانية (UAE)',
        account_number: 'FLOAT-POOL-UAE',
        balance: 4270.00,
        is_default: false,
        type: 'float'
      }
    ];

    const orders: Order[] = initialOrders.map((o, idx) => ({
      ...o,
      order_number: `${prefixCode}-2024-${8841 + idx}`,
      customer_phone: `${phonePrefix} 50 ${idx}44 ${2211 + idx}`,
      delivery_zone: ['Downtown', 'Business Bay', 'Dubai Marina', 'JLT', 'Palm Jumeirah', 'DIFC'][idx % 6],
      delivery_address: `${['Downtown', 'Business Bay', 'Dubai Marina', 'JLT', 'Palm Jumeirah', 'DIFC'][idx % 6]}, Tower ${idx + 2}, Unit 104`
    }));

    return { stores, drivers, wallets, orders, transactions: initialTransactions };
  }

  // Default: Doha, Qatar
  const orders: Order[] = initialOrders.map((o, idx) => ({
    ...o,
    order_number: clientName !== 'OpsWired' ? `${prefixCode}-2024-${8841 + idx}` : o.order_number
  }));

  return {
    stores: initialStores,
    drivers: initialDrivers,
    wallets: initialWallets,
    orders,
    transactions: initialTransactions
  };
}
