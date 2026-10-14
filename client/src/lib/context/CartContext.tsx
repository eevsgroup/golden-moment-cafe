/**
 * Cart Context — global cart state with localStorage persistence,
 * drawer visibility control, and real-time add-to-cart notifications.
 */

"use client";

import {
    createContext,
    useContext,
    useReducer,
    useState,
    useEffect,
    useRef,
    useCallback,
    type ReactNode,
} from "react";
import type { CartItem, CartState, OrderType, CustomerInfo } from "@/lib/types";

/* ── Constants ───────────────────────────────────── */

const STORAGE_KEY = "gm_cart";

const INITIAL_STATE: CartState = {
    items: [],
    orderType: "PICKUP",
    customerInfo: {
        name: "",
        phone: "",
        tableNumber: "",
        deliveryAddress: "",
    },
};

/* ── Reducer ─────────────────────────────────────── */

type Action =
    | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> & { quantity?: number } }
    | { type: "REMOVE_ITEM"; payload: { menuItemId: string } }
    | { type: "UPDATE_QUANTITY"; payload: { menuItemId: string; quantity: number } }
    | { type: "UPDATE_NOTES"; payload: { menuItemId: string; notes: string } }
    | { type: "SET_ORDER_TYPE"; payload: OrderType }
    | { type: "SET_CUSTOMER_INFO"; payload: Partial<CustomerInfo> }
    | { type: "CLEAR_CART" }
    | { type: "HYDRATE"; payload: CartState };

function cartReducer(state: CartState, action: Action): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find(
                (i) => i.menuItemId === action.payload.menuItemId
            );
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.menuItemId === action.payload.menuItemId
                            ? { ...i, quantity: i.quantity + (action.payload.quantity ?? 1) }
                            : i
                    ),
                };
            }
            return {
                ...state,
                items: [
                    ...state.items,
                    { ...action.payload, quantity: action.payload.quantity ?? 1 } as CartItem,
                ],
            };
        }

        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(
                    (i) => i.menuItemId !== action.payload.menuItemId
                ),
            };

        case "UPDATE_QUANTITY": {
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(
                        (i) => i.menuItemId !== action.payload.menuItemId
                    ),
                };
            }
            return {
                ...state,
                items: state.items.map((i) =>
                    i.menuItemId === action.payload.menuItemId
                        ? { ...i, quantity: action.payload.quantity }
                        : i
                ),
            };
        }

        case "UPDATE_NOTES":
            return {
                ...state,
                items: state.items.map((i) =>
                    i.menuItemId === action.payload.menuItemId
                        ? { ...i, notes: action.payload.notes }
                        : i
                ),
            };

        case "SET_ORDER_TYPE":
            return { ...state, orderType: action.payload };

        case "SET_CUSTOMER_INFO":
            return {
                ...state,
                customerInfo: { ...state.customerInfo, ...action.payload },
            };

        case "CLEAR_CART":
            return INITIAL_STATE;

        case "HYDRATE":
            return action.payload;

        default:
            return state;
    }
}

/* ── Context Types ───────────────────────────────── */

export interface LastAddedNotification {
    item: CartItem;
    quantityAdded: number;
    totalQuantity: number;
    timestamp: number;
}

interface CartContextValue {
    items: CartItem[];
    orderType: OrderType;
    customerInfo: CustomerInfo;
    itemCount: number;
    subtotal: number;         // cents
    isOpen: boolean;
    lastAdded: LastAddedNotification | null;

    openCart: () => void;
    closeCart: () => void;
    dismissNotification: () => void;
    addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
    removeItem: (menuItemId: string) => void;
    updateQuantity: (menuItemId: string, quantity: number) => void;
    updateNotes: (menuItemId: string, notes: string) => void;
    setOrderType: (type: OrderType) => void;
    setCustomerInfo: (info: Partial<CustomerInfo>) => void;
    clearCart: () => void;
    getItemQuantity: (menuItemId: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

/* ── Provider ────────────────────────────────────── */

export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const [isOpen, setIsOpen] = useState(false);
    const [lastAdded, setLastAdded] = useState<LastAddedNotification | null>(null);
    const isHydrated = useRef(false);

    // Hydrate from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as Partial<CartState>;
                if (parsed.items?.length) {
                    dispatch({
                        type: "HYDRATE",
                        payload: {
                            ...INITIAL_STATE,
                            ...parsed,
                            customerInfo: {
                                ...INITIAL_STATE.customerInfo,
                                ...(parsed.customerInfo || {}),
                            },
                        } as CartState,
                    });
                }
            }
        } catch {
            // Corrupted storage — ignore
        } finally {
            isHydrated.current = true;
        }
    }, []);

    // Persist to localStorage only AFTER hydration
    useEffect(() => {
        if (!isHydrated.current) return;
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // Storage full or blocked — ignore
        }
    }, [state]);

    /* ── Derived ──────────────────────────────────── */

    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    );

    /* ── Helper to check quantity of a specific item ── */
    const getItemQuantity = useCallback((menuItemId: string): number => {
        const found = state.items.find((i) => i.menuItemId === menuItemId);
        return found ? found.quantity : 0;
    }, [state.items]);

    /* ── Actions ──────────────────────────────────── */

    const openCart = useCallback(() => setIsOpen(true), []);
    const closeCart = useCallback(() => setIsOpen(false), []);
    const dismissNotification = useCallback(() => setLastAdded(null), []);

    const addItem = useCallback(
        (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
            const addedQty = item.quantity ?? 1;
            dispatch({ type: "ADD_ITEM", payload: item });

            // Calculate updated quantity for this item
            const currentItem = state.items.find((i) => i.menuItemId === item.menuItemId);
            const totalQty = (currentItem ? currentItem.quantity : 0) + addedQty;

            setLastAdded({
                item: {
                    ...item,
                    quantity: totalQty,
                } as CartItem,
                quantityAdded: addedQty,
                totalQuantity: totalQty,
                timestamp: Date.now(),
            });
        },
        [state.items]
    );

    const removeItem = useCallback(
        (menuItemId: string) =>
            dispatch({ type: "REMOVE_ITEM", payload: { menuItemId } }),
        []
    );

    const updateQuantity = useCallback(
        (menuItemId: string, quantity: number) =>
            dispatch({ type: "UPDATE_QUANTITY", payload: { menuItemId, quantity } }),
        []
    );

    const updateNotes = useCallback(
        (menuItemId: string, notes: string) =>
            dispatch({ type: "UPDATE_NOTES", payload: { menuItemId, notes } }),
        []
    );

    const setOrderType = useCallback(
        (type: OrderType) => dispatch({ type: "SET_ORDER_TYPE", payload: type }),
        []
    );

    const setCustomerInfo = useCallback(
        (info: Partial<CustomerInfo>) =>
            dispatch({ type: "SET_CUSTOMER_INFO", payload: info }),
        []
    );

    const clearCart = useCallback(
        () => dispatch({ type: "CLEAR_CART" }),
        []
    );

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                orderType: state.orderType,
                customerInfo: state.customerInfo,
                itemCount,
                subtotal,
                isOpen,
                lastAdded,
                openCart,
                closeCart,
                dismissNotification,
                addItem,
                removeItem,
                updateQuantity,
                updateNotes,
                setOrderType,
                setCustomerInfo,
                clearCart,
                getItemQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

/* ── Hook ────────────────────────────────────────── */

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error("useCart must be used within a <CartProvider>");
    }
    return ctx;
}
