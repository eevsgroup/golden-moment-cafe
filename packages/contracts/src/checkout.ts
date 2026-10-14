
export type OrderType = "DINE_IN" | "PICKUP" | "DELIVERY";

/**
 * Customer information submitted with a checkout request.
 * tableNumber and deliveryAddress can be empty strings when
 * they do not apply to the selected order type.
 */
export interface CustomerInfo {
    name: string;
    phone: string;
    tableNumber: string;
    deliveryAddress: string;
    userId?: string;
}

/**
 * One item submitted for checkout.
 * Prices are resolved by the backend from the database.
 */
export interface CheckoutLineItemRequest {
    menuItemId: string;
    quantity: number;
    notes: string;
}

/**
 * Request sent from the Next.js frontend to the Express API.
 */
export interface CheckoutSessionRequest {
    items: CheckoutLineItemRequest[];
    orderType: OrderType;
    customerInfo: CustomerInfo;
}

/**
 * Response returned by the checkout-session endpoint.
 */
export interface CheckoutSessionResponse {
    url: string;
}
