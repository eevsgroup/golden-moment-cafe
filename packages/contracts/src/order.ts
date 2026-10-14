import type { OrderType } from "./checkout";

export type OrderStatus =
    | "PENDING"
    | "PAID"
    | "PREPARING"
    | "READY"
    | "COMPLETED"
    | "CANCELLED";

export interface OrderItemSnapshot {
    id: string;
    posId?: string;
    name: string;
    price: number; // Integer cents
    quantity: number;
    notes?: string;
}

export interface Order {
    id: string;
    posId: string | null;
    orderType: OrderType | string;
    status: OrderStatus | string;
    totalAmount: number;
    stripeSession: string | null;
    customerName: string | null;
    customerPhone: string | null;
    tableNumber: string | null;
    deliveryAddress: string | null;
    items: OrderItemSnapshot[] | null;
    userId: string | null;
    createdAt: string;
    updatedAt: string;
}
