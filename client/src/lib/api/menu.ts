/**
 * Menu API calls.
 * Falls back to hardcoded data if the server is unreachable.
 */

import { api } from "./client";
import type { MenuCategory } from "@/lib/types";

/** Hardcoded fallback data — keeps site usable when server is down */
const FALLBACK_MENU: MenuCategory[] = [
    {
        id: "fb_burgers", posId: null, name: "BURGERS", sortOrder: 1,
        createdAt: "", updatedAt: "",
        items: [
            { id: "fb_1", posId: null, name: "Cheese Burger", description: "Grass fed Beef, Cheese, Tomato, mustard, pickle side of chips", price: 1400, image: null, active: true, isSpecial: false, categoryId: "fb_burgers", createdAt: "", updatedAt: "" },
            { id: "fb_2", posId: null, name: "Double Cheeseburger", description: "Double Grass fed Beef, double Cheese, tomato, mustard, pickle with a side of chips", price: 1800, image: null, active: true, isSpecial: false, categoryId: "fb_burgers", createdAt: "", updatedAt: "" },
            { id: "fb_3", posId: null, name: "GM Classic Burger", description: "Iceberg lettuce, Tomato, Grass fed Beef Patty, Cheese, Bacon, Pickles & GM house sauce with side of chips", price: 2000, image: null, active: true, isSpecial: false, categoryId: "fb_burgers", createdAt: "", updatedAt: "" },
            { id: "fb_4", posId: null, name: "GM Classic Chicken", description: "Iceberg lettuce, Tomato, chicken schnitzel, bacon, cheese, GM house sauce with a side of chips", price: 2000, image: null, active: true, isSpecial: false, categoryId: "fb_burgers", createdAt: "", updatedAt: "" },
            { id: "fb_5", posId: null, name: "Chilli Burger", description: "Grass fed Beef, Cheese, Streaky Bacon, lettuce, Jalapeños, Hot sauce, house sauce & side of chips", price: 2000, image: null, active: true, isSpecial: false, categoryId: "fb_burgers", createdAt: "", updatedAt: "" },
            { id: "fb_6", posId: null, name: "Veggie Burger", description: "Halloumi patty, Spinach, Tomato slice, Slaw & sweet Chilli sauce with a side of chips", price: 2000, image: null, active: true, isSpecial: false, categoryId: "fb_burgers", createdAt: "", updatedAt: "" },
            { id: "fb_7", posId: null, name: "GM Lunch Box", description: "CheeseBurger with Side of Fries, 3pcs wings and a can of drink", price: 2200, image: null, active: true, isSpecial: true, categoryId: "fb_burgers", createdAt: "", updatedAt: "" },
        ],
    },
    {
        id: "fb_pastas", posId: null, name: "PASTAS", sortOrder: 2,
        createdAt: "", updatedAt: "",
        items: [
            { id: "fb_8", posId: null, name: "Creamy chicken mushroom", description: "al dente Pasta, Sautéed mushrooms, Tender chicken, creamy garlic sauce, finished with parmesan and olive oil.", price: 1700, image: null, active: true, isSpecial: true, categoryId: "fb_pastas", createdAt: "", updatedAt: "" },
            { id: "fb_9", posId: null, name: "Italian Rosè Pasta", description: "A creamy blend of tomato passata and cream, tossed with chicken & pasta, with parmesan and fresh herbs", price: 1700, image: null, active: true, isSpecial: false, categoryId: "fb_pastas", createdAt: "", updatedAt: "" },
            { id: "fb_10", posId: null, name: "Peri Peri Chicken", description: "Tender chicken, Pasta tossed in a blend of spicy peri peri sauce, finished with parmesan and fresh herbs", price: 1700, image: null, active: true, isSpecial: false, categoryId: "fb_pastas", createdAt: "", updatedAt: "" },
            { id: "fb_11", posId: null, name: "Pesto Chicken", description: "Grilled chicken & Pasta tossed in a blend of creamy basil pesto sauce, mix herbs finished with parmesan and olive oil", price: 1600, image: null, active: true, isSpecial: false, categoryId: "fb_pastas", createdAt: "", updatedAt: "" },
        ],
    },
    {
        id: "fb_rice", posId: null, name: "RICE & CURRY", sortOrder: 3,
        createdAt: "", updatedAt: "",
        items: [
            { id: "fb_12", posId: null, name: "Beef Curry", description: "Curry with rice of Your Choice (Fried / Plain)", price: 1600, image: null, active: true, isSpecial: false, categoryId: "fb_rice", createdAt: "", updatedAt: "" },
            { id: "fb_13", posId: null, name: "Goat Curry", description: "Curry with rice of Your Choice (Fried / Plain)", price: 1600, image: null, active: true, isSpecial: false, categoryId: "fb_rice", createdAt: "", updatedAt: "" },
            { id: "fb_14", posId: null, name: "Chicken Curry", description: "Curry with rice of Your Choice (Fried / Plain)", price: 1600, image: null, active: true, isSpecial: false, categoryId: "fb_rice", createdAt: "", updatedAt: "" },
            { id: "fb_15", posId: null, name: "Nasi Goreng", description: "Curry with rice of Your Choice (Fried / Plain)", price: 1600, image: null, active: true, isSpecial: false, categoryId: "fb_rice", createdAt: "", updatedAt: "" },
        ],
    },
    {
        id: "fb_noodles", posId: null, name: "NOODLES & DUMPLINGS", sortOrder: 4,
        createdAt: "", updatedAt: "",
        items: [
            { id: "fb_16", posId: null, name: "Veg Noodles / Dumplings", description: "Served with a side of housemade dumpling sauce", price: 1500, image: null, active: true, isSpecial: false, categoryId: "fb_noodles", createdAt: "", updatedAt: "" },
            { id: "fb_17", posId: null, name: "Chicken Noodles / Dumplings", description: "Served with a side of housemade dumpling sauce", price: 1700, image: null, active: true, isSpecial: false, categoryId: "fb_noodles", createdAt: "", updatedAt: "" },
        ],
    },
    {
        id: "fb_classics", posId: null, name: "CLASSICS & SIDES", sortOrder: 5,
        createdAt: "", updatedAt: "",
        items: [
            { id: "fb_18", posId: null, name: "GM Hot Wings", description: "6pcs", price: 1000, image: null, active: true, isSpecial: false, categoryId: "fb_classics", createdAt: "", updatedAt: "" },
            { id: "fb_19", posId: null, name: "Peri Peri Wings", description: "Delicious wings tossed in peri peri sauce", price: 1000, image: null, active: true, isSpecial: false, categoryId: "fb_classics", createdAt: "", updatedAt: "" },
            { id: "fb_20", posId: null, name: "Smoke BBQ Wings", description: "Delicious wings tossed in BBQ sauce", price: 1000, image: null, active: true, isSpecial: false, categoryId: "fb_classics", createdAt: "", updatedAt: "" },
            { id: "fb_21", posId: null, name: "Bowl of Chips", description: "Classic hot chips", price: 850, image: null, active: true, isSpecial: false, categoryId: "fb_classics", createdAt: "", updatedAt: "" },
            { id: "fb_22", posId: null, name: "GM Loaded Fries", description: "Crunchy fried chips tossed in Shallots, Shredded Cheese, topped with Bacon bits and GM house sauce", price: 1300, image: null, active: true, isSpecial: false, categoryId: "fb_classics", createdAt: "", updatedAt: "" },
            { id: "fb_23", posId: null, name: "Snitty and Chips", description: "Crispy Golden Schnitzel served with a side of crunchy chips, mix salad and Garlic Aioli", price: 1800, image: null, active: true, isSpecial: false, categoryId: "fb_classics", createdAt: "", updatedAt: "" },
            { id: "fb_24", posId: null, name: "Fish and chips", description: "Crispy golden battered fish served with crunchy chips, fresh garden salad & tartare sauce.", price: 1800, image: null, active: true, isSpecial: false, categoryId: "fb_classics", createdAt: "", updatedAt: "" },
            { id: "fb_25", posId: null, name: "Seafood basket", description: "Calamari, battered fish, served with a side of chips & garden salad", price: 2000, image: null, active: true, isSpecial: false, categoryId: "fb_classics", createdAt: "", updatedAt: "" },
        ],
    },
    {
        id: "fb_addons", posId: null, name: "ADD-ONS", sortOrder: 6,
        createdAt: "", updatedAt: "",
        items: [
            { id: "fb_26", posId: null, name: "Egg", description: "", price: 400, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_27", posId: null, name: "Bacon", description: "", price: 500, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_28", posId: null, name: "Smoked Salmon", description: "", price: 500, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_29", posId: null, name: "Chorizo", description: "", price: 500, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_30", posId: null, name: "Avocado", description: "", price: 400, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_31", posId: null, name: "Hash Browns", description: "", price: 400, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_32", posId: null, name: "Halloumi", description: "", price: 500, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_33", posId: null, name: "Sautéed Mushrooms", description: "", price: 400, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_34", posId: null, name: "Spinach/Kale", description: "", price: 400, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_35", posId: null, name: "Feta Cheese", description: "", price: 400, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_36", posId: null, name: "Cherry Tomatoes", description: "", price: 400, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_37", posId: null, name: "Sauce", description: "", price: 100, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
            { id: "fb_38", posId: null, name: "Cheese", description: "", price: 100, image: null, active: true, isSpecial: false, categoryId: "fb_addons", createdAt: "", updatedAt: "" },
        ],
    },
];

/**
 * Fetch menu from the Express server.
 * On failure, returns the hardcoded fallback so the site never shows an empty menu.
 */
export async function fetchMenu(): Promise<{
    categories: MenuCategory[];
    source: "server" | "fallback";
}> {
    const result = await api.get<MenuCategory[]>("/api/menu");

    if (result.data && result.data.length > 0) {
        return { categories: result.data, source: "server" };
    }

    console.warn(
        `[menu] Server returned ${result.error ?? "empty menu"} — using fallback data`
    );
    return { categories: FALLBACK_MENU, source: "fallback" };
}
