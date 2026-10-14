
"use client";

import CartButton from "./CartButton";
import CartDrawer from "./CartDrawer";
import CartNotification from "./CartNotification";

export default function CartShell() {
    return (
        <>
            <CartNotification />
            <CartButton />
            <CartDrawer />
        </>
    );
}
