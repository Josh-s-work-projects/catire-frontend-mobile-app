import { NameTag, OrderStatusType } from "../../../../shared/enums";

export interface OrderAddress {
  street: number;
  avenue: number;
  house_number: number;
  reference?: string;
}

export interface OrderFeatures {
  name_tag: NameTag;
  value: string;
}

export interface Order {
  id: string;
  user_id: number;
  is_delivery: boolean;
  notes?: string | null;
  address?: OrderAddress | null;
  status: OrderStatusType;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface OrderDetails {
  id: string;
  order_id: string;
  product_id: number;
  quantity: number;
  features: OrderFeatures[];
  order: Order;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

export interface UserAccess {
  id: string;
  user_id: number;
  device_ip: string;
  access_error?: string | null;
  accessed_since: Date;
  created_at: Date;
  deleted_at?: Date | null;
}

export interface OrderDetailsDTO {
  product_id: number;
  quantity: number;
  features: OrderFeatures[];
}

export interface OrderDTO {
  is_delivery: boolean;
  items: OrderDetailsDTO[];
  notes?: string;
  address?: OrderAddress;
}