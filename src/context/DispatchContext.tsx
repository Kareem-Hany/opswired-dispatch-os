'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Order, OrderStatus, Driver, Store, Wallet, Transaction, CollectionStatus, OrderEvent } from '@/lib/types';
import { getLocalizedMockData } from '@/lib/mockData';
import { useBrand } from '@/context/BrandContext';

interface DispatchContextType {
  orders: Order[];
  drivers: Driver[];
  stores: Store[];
  wallets: Wallet[];
  transactions: Transaction[];
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, note?: string) => void;
  assignDriver: (orderId: string, driverId: string | null) => void;
  updateCollectionStatus: (orderId: string, status: CollectionStatus) => void;
  createOrder: (newOrderData: Partial<Order>) => Order;
  resetSandbox: () => void;
  getOrderById: (idOrNumber: string) => Order | undefined;
  metrics: {
    total: number;
    newCount: number;
    inTransit: number;
    delivered: number;
    deferred: number;
    cancelled: number;
    treasuryBalance: number;
    pendingCollection: number;
    collectedVolume: number;
    netMovement: number;
  };
}

const DispatchContext = createContext<DispatchContextType | undefined>(undefined);

export function DispatchProvider({ children }: { children: React.ReactNode }) {
  const brand = useBrand();
  const { city, curr, phonePrefix, driverPlateSuffix, client, zones } = brand;

  // Initial localized dataset
  const initialData = getLocalizedMockData({
    city,
    curr,
    phonePrefix,
    driverPlateSuffix,
    client
  });

  const [orders, setOrders] = useState<Order[]>(initialData.orders);
  const [drivers, setDrivers] = useState<Driver[]>(initialData.drivers);
  const [stores, setStores] = useState<Store[]>(initialData.stores);
  const [wallets, setWallets] = useState<Wallet[]>(initialData.wallets);
  const [transactions, setTransactions] = useState<Transaction[]>(initialData.transactions);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const prevCityRef = useRef<string>(city);
  const prevClientRef = useRef<string>(client);

  // Re-localize if city or client changes
  useEffect(() => {
    if (prevCityRef.current !== city || prevClientRef.current !== client) {
      prevCityRef.current = city;
      prevClientRef.current = client;

      const fresh = getLocalizedMockData({
        city,
        curr,
        phonePrefix,
        driverPlateSuffix,
        client
      });

      setOrders(fresh.orders);
      setDrivers(fresh.drivers);
      setStores(fresh.stores);
      setWallets(fresh.wallets);
      setTransactions(fresh.transactions);

      try {
        localStorage.removeItem(`opswired_orders_${city}`);
      } catch {
        // ignore
      }
    }
  }, [city, curr, phonePrefix, driverPlateSuffix, client]);

  // Load from localStorage on mount for specific city
  useEffect(() => {
    try {
      const storageKey = `opswired_orders_${city.toLowerCase()}`;
      const savedOrders = localStorage.getItem(storageKey);
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      const savedSound = localStorage.getItem('opswired_sound');
      if (savedSound !== null) {
        setSoundEnabled(savedSound === 'true');
      }
    } catch (e) {
      console.warn('Could not load localStorage sandbox', e);
    } finally {
      setIsLoaded(true);
    }
  }, [city]);

  // Save orders to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const storageKey = `opswired_orders_${city.toLowerCase()}`;
      localStorage.setItem(storageKey, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders, isLoaded, city]);

  useEffect(() => {
    try {
      localStorage.setItem('opswired_sound', String(soundEnabled));
    } catch {
      // ignore
    }
  }, [soundEnabled]);

  const playSound = (soundType: 'notify' | 'chime') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audio = new Audio(soundType === 'chime' ? '/sounds/chime1.wav' : '/sounds/notify1.wav');
      audio.volume = 0.4;
      audio.play().catch(() => {
        // autoplay may be restricted by browser until user gesture
      });
    } catch {
      // ignore
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const now = new Date().toISOString();
        const event: OrderEvent = {
          id: `ev_${Date.now()}`,
          timestamp: now,
          type: 'status_change',
          title_en: `Status updated to ${newStatus.replace('_', ' ').toUpperCase()}`,
          title_ar: `تم تغيير الحالة إلى ${
            newStatus === 'in_transit'
              ? 'قيد التوصيل'
              : newStatus === 'delivered'
              ? 'تم التوصيل'
              : newStatus === 'deferred'
              ? 'مؤجل'
              : newStatus === 'cancelled'
              ? 'ملغي'
              : 'جديد'
          }`,
          description_en: note || `Dispatcher marked order as ${newStatus}`,
          description_ar: note || `قام مأمور العمليات بتحديث الحالة إلى ${newStatus}`,
          actor: `${client || 'Ops'} Dispatcher`
        };

        const updatedCollection =
          newStatus === 'delivered' && ord.collection_status === 'pending'
            ? 'collected'
            : ord.collection_status;

        return {
          ...ord,
          status: newStatus,
          collection_status: updatedCollection,
          updated_at: now,
          events: [event, ...ord.events]
        };
      })
    );

    playSound('chime');
  };

  const assignDriver = (orderId: string, driverId: string | null) => {
    const selectedDriver = drivers.find(d => d.id === driverId);

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const now = new Date().toISOString();
        const event: OrderEvent = {
          id: `ev_${Date.now()}`,
          timestamp: now,
          type: 'driver_assigned',
          title_en: selectedDriver ? `Assigned to ${selectedDriver.name}` : 'Driver Unassigned',
          title_ar: selectedDriver ? `تم التكليف للمندوب ${selectedDriver.name}` : 'تم إلغاء التكليف',
          description_en: selectedDriver
            ? `Courier ${selectedDriver.name} allocated (${selectedDriver.vehicle})`
            : 'Order returned to dispatch pool',
          description_ar: selectedDriver
            ? `تم إسناد الشحنة للسائق ${selectedDriver.name} (${selectedDriver.vehicle})`
            : 'تمت إعادة الشحنة لقائمة الانتظار العامة',
          actor: `${client || 'Fleet'} Dispatcher`
        };

        return {
          ...ord,
          driver_id: driverId,
          driver_name: selectedDriver ? selectedDriver.name : null,
          status: ord.status === 'new' && driverId ? 'in_transit' : ord.status,
          updated_at: now,
          events: [event, ...ord.events]
        };
      })
    );

    playSound('notify');
  };

  const updateCollectionStatus = (orderId: string, status: CollectionStatus) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;

        const now = new Date().toISOString();
        const event: OrderEvent = {
          id: `ev_${Date.now()}`,
          timestamp: now,
          type: 'collected',
          title_en: `COD Collection: ${status.toUpperCase()}`,
          title_ar: `حالة التحصيل المالي: ${status === 'collected' ? 'تم التحصيل' : status === 'remitted' ? 'تم التوريد' : 'معلق'}`,
          description_en: `Settlement ledger status marked as ${status}`,
          description_ar: `تم تعديل حالة التحصيل المالي إلى ${status}`,
          actor: 'Treasury Controller'
        };

        return {
          ...ord,
          collection_status: status,
          updated_at: now,
          events: [event, ...ord.events]
        };
      })
    );

    playSound('chime');
  };

  const createOrder = (newOrderData: Partial<Order>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefixCode = client && client !== 'OpsWired'
      ? client.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase() || 'ORD'
      : 'SPD';
    const orderNumber = `${prefixCode}-2024-${randomSuffix}`;
    const token = `${prefixCode}${randomSuffix}${Math.random().toString(36).substring(2, 4).toUpperCase()}`;
    const now = new Date().toISOString();

    const selectedStore = stores.find(s => s.id === newOrderData.store_id) || stores[0];
    const selectedDriver = drivers.find(d => d.id === newOrderData.driver_id);

    const orderAmount = Number(newOrderData.order_amount) || 250;
    const deliveryFee = Number(newOrderData.delivery_fee) || selectedStore.default_delivery_fee;
    const totalAmount = orderAmount + deliveryFee;

    const defaultZone = zones[0] || 'Al-Olaya';

    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      order_number: orderNumber,
      tracking_token: token,
      store_id: selectedStore.id,
      store_name: selectedStore.name,
      driver_id: selectedDriver ? selectedDriver.id : null,
      driver_name: selectedDriver ? selectedDriver.name : null,
      customer_name: newOrderData.customer_name || 'Valued Recipient',
      customer_phone: newOrderData.customer_phone || `${phonePrefix} 5500 0000`,
      customer_email: newOrderData.customer_email || 'customer@dispatch.me',
      pickup_zone: selectedStore.zone,
      pickup_address: selectedStore.address,
      delivery_zone: newOrderData.delivery_zone || defaultZone,
      delivery_address: newOrderData.delivery_address || `${defaultZone}, Building 4, Suite 102`,
      order_amount: orderAmount,
      delivery_fee: deliveryFee,
      total_amount: totalAmount,
      payment_method: 'cod',
      collection_status: 'pending',
      status: selectedDriver ? 'in_transit' : 'new',
      notes: newOrderData.notes || 'Handle parcel with standard courier care.',
      pickup_time: 'Ready for Pickup',
      delivery_time: 'Today 04:00 PM - 07:00 PM',
      created_at: now,
      updated_at: now,
      events: [
        {
          id: `ev_${Date.now()}`,
          timestamp: now,
          type: 'created',
          title_en: 'Direct Dispatch Shipment Created',
          title_ar: 'تم إنشاء إرسالية الشحن المباشرة',
          description_en: `Registered into ${client || 'OpsWired'} Dispatch Sandbox`,
          description_ar: `تم قيد الشحنة بنجاح في بيئة تشغيل ${client || 'المنظومة'}`,
          actor: 'Ops Console'
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    playSound('notify');
    return newOrder;
  };

  const resetSandbox = () => {
    const fresh = getLocalizedMockData({
      city,
      curr,
      phonePrefix,
      driverPlateSuffix,
      client
    });

    setOrders(fresh.orders);
    setDrivers(fresh.drivers);
    setStores(fresh.stores);
    setWallets(fresh.wallets);
    setTransactions(fresh.transactions);

    try {
      localStorage.removeItem(`opswired_orders_${city.toLowerCase()}`);
    } catch {
      // ignore
    }
    playSound('chime');
  };

  const getOrderById = (idOrNumber: string): Order | undefined => {
    if (!idOrNumber) return undefined;
    const clean = idOrNumber.trim().toLowerCase();
    return orders.find(
      o =>
        o.id.toLowerCase() === clean ||
        o.order_number.toLowerCase() === clean ||
        o.tracking_token.toLowerCase() === clean
    );
  };

  // Metrics computation
  const metrics = {
    total: orders.length,
    newCount: orders.filter(o => o.status === 'new').length,
    inTransit: orders.filter(o => o.status === 'in_transit').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    deferred: orders.filter(o => o.status === 'deferred').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    treasuryBalance: wallets.reduce((acc, w) => acc + w.balance, 0),
    pendingCollection: orders
      .filter(o => o.collection_status === 'pending' && o.status !== 'cancelled')
      .reduce((acc, o) => acc + o.total_amount, 0),
    collectedVolume: orders
      .filter(o => o.collection_status === 'collected' || o.collection_status === 'remitted')
      .reduce((acc, o) => acc + o.total_amount, 0),
    netMovement: 2150.00
  };

  return (
    <DispatchContext.Provider
      value={{
        orders,
        drivers,
        stores,
        wallets,
        transactions,
        soundEnabled,
        setSoundEnabled,
        updateOrderStatus,
        assignDriver,
        updateCollectionStatus,
        createOrder,
        resetSandbox,
        getOrderById,
        metrics
      }}
    >
      {children}
    </DispatchContext.Provider>
  );
}

export function useDispatch() {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error('useDispatch must be used within a DispatchProvider');
  }
  return context;
}
