
import type {
    CustomerInfo,
    OrderType,
} from "@golden-moment/contracts";

export type {
    MenuItem,
    MenuCategory,
    OrderType,
    OrderStatus,
    CustomerInfo,
    CheckoutLineItemRequest,
    CheckoutSessionRequest,
    CheckoutSessionResponse,
    OrderItemSnapshot,
    Order,
    ApiError,
    ApiResult,
} from "@golden-moment/contracts";

/**
 * Frontend-only cart representation.
 * This includes fields needed by the UI that are not part
 * of the checkout API request.
 */
export interface CartItem {
    menuItemId: string;
    name: string;
    price: number; // Integer cents
    quantity: number;
    notes: string;
    image: string | null;
    categoryName: string;
}

/**
 * Frontend-only cart state.
 */
export interface CartState {
    items: CartItem[];
    orderType: OrderType;
    customerInfo: CustomerInfo;
}
