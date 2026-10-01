export type OrderStatus = 'new' | 'in_transit' | 'delivered' | 'deferred' | 'cancelled';

export type PaymentMethod = 'cod' | 'card_on_delivery' | 'prepaid';

export type CollectionStatus = 'pending' | 'collected' | 'remitted';

export interface OrderEvent {
  id: string;
  timestamp: string;
  type: 'created' | 'status_change' | 'driver_assigned' | 'collected' | 'note';
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  actor: string;
}

export interface Order {
  id: string;
  order_number: string;
  tracking_token: string;
  store_id: string;
  store_name: string;
  driver_id: string | null;
  driver_name: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  pickup_zone: string;
  pickup_address: string;
  delivery_zone: string;
  delivery_address: string;
  order_amount: number; // COD product value
  delivery_fee: number;
  total_amount: number; // COD product + delivery fee
  payment_method: PaymentMethod;
  collection_status: CollectionStatus;
  status: OrderStatus;
  notes?: string;
  pickup_time?: string;
  delivery_time?: string;
  created_at: string;
  updated_at: string;
  events: OrderEvent[];
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  license_plate: string;
  zone: string;
  status: 'active' | 'on_route' | 'off_duty';
  active_deliveries: number;
  rating: number;
  cash_float: number; // QAR in driver possession
}

export interface Store {
  id: string;
  name: string;
  code: string;
  phone: string;
  manager: string;
  zone: string;
  address: string;
  default_delivery_fee: number;
  pending_payout: number;
  active_orders_count: number;
}

export interface Wallet {
  id: string;
  name_en: string;
  name_ar: string;
  account_number: string;
  balance: number;
  is_default: boolean;
  type: 'bank' | 'vault' | 'float';
}

export interface Transaction {
  id: string;
  wallet_id: string;
  wallet_name: string;
  direction: 'in' | 'out';
  amount: number;
  ref_type: 'cod_remit' | 'store_payout' | 'delivery_revenue' | 'fuel_advance';
  ref_id?: string;
  description_en: string;
  description_ar: string;
  created_at: string;
}
