/**
 * Menu API — fetches menu data from the server when the backend is
 * enabled, otherwise returns static data immediately with zero
 * network overhead.
 */

import { APP_CONFIG } from "@/lib/config";
import { api } from "./client";
import { STATIC_MENU } from "@/lib/data/menu";
import type { MenuCategory } from "@/lib/types";

/**
 * Fetch menu from the Express server.
 * When the backend is disabled, returns static data instantly.
 * On server failure, falls back to the same static data so the
 * site never shows an empty menu.
 */
export async function fetchMenu(): Promise<{
    categories: MenuCategory[];
    source: "server" | "static";
}> {
    // When backend is disabled, skip the network call entirely
    if (!APP_CONFIG.backendEnabled) {
        return { categories: STATIC_MENU, source: "static" };
    }

    const result = await api.get<MenuCategory[]>("/api/menu");

    if (result.data && result.data.length > 0) {
        return { categories: result.data, source: "server" };
    }

    console.warn(
        `[menu] Server returned ${result.error ?? "empty menu"} — using static data`
    );
    return { categories: STATIC_MENU, source: "static" };
}
