import { prisma } from '../lib/prisma';

// Master Golden Moment Menu (38 items across 6 categories)
export const DEFAULT_MENU_SEED = {
  categories: [
    { id: "fb_burgers", name: "BURGERS", sortOrder: 1 },
    { id: "fb_pastas", name: "PASTAS", sortOrder: 2 },
    { id: "fb_rice", name: "RICE & CURRY", sortOrder: 3 },
    { id: "fb_noodles", name: "NOODLES & DUMPLINGS", sortOrder: 4 },
    { id: "fb_classics", name: "CLASSICS & SIDES", sortOrder: 5 },
    { id: "fb_addons", name: "ADD-ONS", sortOrder: 6 },
  ],
  items: [
    // BURGERS
    { id: "fb_1", categoryId: "fb_burgers", name: "Cheese Burger", description: "Grass fed Beef, Cheese, Tomato, mustard, pickle side of chips", price: 1400, image: null, active: true, isSpecial: false },
    { id: "fb_2", categoryId: "fb_burgers", name: "Double Cheeseburger", description: "Double Grass fed Beef, double Cheese, tomato, mustard, pickle with a side of chips", price: 1800, image: null, active: true, isSpecial: false },
    { id: "fb_3", categoryId: "fb_burgers", name: "GM Classic Burger", description: "Iceberg lettuce, Tomato, Grass fed Beef Patty, Cheese, Bacon, Pickles & GM house sauce with side of chips", price: 2000, image: null, active: true, isSpecial: false },
    { id: "fb_4", categoryId: "fb_burgers", name: "GM Classic Chicken", description: "Iceberg lettuce, Tomato, chicken schnitzel, bacon, cheese, GM house sauce with a side of chips", price: 2000, image: null, active: true, isSpecial: false },
    { id: "fb_5", categoryId: "fb_burgers", name: "Chilli Burger", description: "Grass fed Beef, Cheese, Streaky Bacon, lettuce, Jalapeños, Hot sauce, house sauce & side of chips", price: 2000, image: null, active: true, isSpecial: false },
    { id: "fb_6", categoryId: "fb_burgers", name: "Veggie Burger", description: "Halloumi patty, Spinach, Tomato slice, Slaw & sweet Chilli sauce with a side of chips", price: 2000, image: null, active: true, isSpecial: false },
    { id: "fb_7", categoryId: "fb_burgers", name: "GM Lunch Box", description: "CheeseBurger with Side of Fries, 3pcs wings and a can of drink", price: 2200, image: null, active: true, isSpecial: true },

    // PASTAS
    { id: "fb_8", categoryId: "fb_pastas", name: "Creamy chicken mushroom", description: "al dente Pasta, Sautéed mushrooms, Tender chicken, creamy garlic sauce, finished with parmesan and olive oil.", price: 1700, image: null, active: true, isSpecial: true },
    { id: "fb_9", categoryId: "fb_pastas", name: "Italian Rosè Pasta", description: "A creamy blend of tomato passata and cream, tossed with chicken & pasta, with parmesan and fresh herbs", price: 1700, image: null, active: true, isSpecial: false },
    { id: "fb_10", categoryId: "fb_pastas", name: "Peri Peri Chicken", description: "Tender chicken, Pasta tossed in a blend of spicy peri peri sauce, finished with parmesan and fresh herbs", price: 1700, image: null, active: true, isSpecial: false },
    { id: "fb_11", categoryId: "fb_pastas", name: "Pesto Chicken", description: "Grilled chicken & Pasta tossed in a blend of creamy basil pesto sauce, mix herbs finished with parmesan and olive oil", price: 1600, image: null, active: true, isSpecial: false },

    // RICE & CURRY
    { id: "fb_12", categoryId: "fb_rice", name: "Beef Curry", description: "Curry with rice of Your Choice (Fried / Plain)", price: 1600, image: null, active: true, isSpecial: false },
    { id: "fb_13", categoryId: "fb_rice", name: "Goat Curry", description: "Curry with rice of Your Choice (Fried / Plain)", price: 1600, image: null, active: true, isSpecial: false },
    { id: "fb_14", categoryId: "fb_rice", name: "Chicken Curry", description: "Curry with rice of Your Choice (Fried / Plain)", price: 1600, image: null, active: true, isSpecial: false },
    { id: "fb_15", categoryId: "fb_rice", name: "Nasi Goreng", description: "Curry with rice of Your Choice (Fried / Plain)", price: 1600, image: null, active: true, isSpecial: false },

    // NOODLES & DUMPLINGS
    { id: "fb_16", categoryId: "fb_noodles", name: "Veg Noodles / Dumplings", description: "Served with a side of housemade dumpling sauce", price: 1500, image: null, active: true, isSpecial: false },
    { id: "fb_17", categoryId: "fb_noodles", name: "Chicken Noodles / Dumplings", description: "Served with a side of housemade dumpling sauce", price: 1700, image: null, active: true, isSpecial: false },

    // CLASSICS & SIDES
    { id: "fb_18", categoryId: "fb_classics", name: "GM Hot Wings", description: "6pcs", price: 1000, image: null, active: true, isSpecial: false },
    { id: "fb_19", categoryId: "fb_classics", name: "Peri Peri Wings", description: "Delicious wings tossed in peri peri sauce", price: 1000, image: null, active: true, isSpecial: false },
    { id: "fb_20", categoryId: "fb_classics", name: "Smoke BBQ Wings", description: "Delicious wings tossed in BBQ sauce", price: 1000, image: null, active: true, isSpecial: false },
    { id: "fb_21", categoryId: "fb_classics", name: "Bowl of Chips", description: "Classic hot chips", price: 850, image: null, active: true, isSpecial: false },
    { id: "fb_22", categoryId: "fb_classics", name: "GM Loaded Fries", description: "Crunchy fried chips tossed in Shallots, Shredded Cheese, topped with Bacon bits and GM house sauce", price: 1300, image: null, active: true, isSpecial: false },
    { id: "fb_23", categoryId: "fb_classics", name: "Snitty and Chips", description: "Crispy Golden Schnitzel served with a side of crunchy chips, mix salad and Garlic Aioli", price: 1800, image: null, active: true, isSpecial: false },
    { id: "fb_24", categoryId: "fb_classics", name: "Fish and chips", description: "Crispy golden battered fish served with crunchy chips, fresh garden salad & tartare sauce.", price: 1800, image: null, active: true, isSpecial: false },
    { id: "fb_25", categoryId: "fb_classics", name: "Seafood basket", description: "Calamari, battered fish, served with a side of chips & garden salad", price: 2000, image: null, active: true, isSpecial: false },

    // ADD-ONS
    { id: "fb_26", categoryId: "fb_addons", name: "Egg", description: "", price: 400, image: null, active: true, isSpecial: false },
    { id: "fb_27", categoryId: "fb_addons", name: "Bacon", description: "", price: 500, image: null, active: true, isSpecial: false },
    { id: "fb_28", categoryId: "fb_addons", name: "Smoked Salmon", description: "", price: 500, image: null, active: true, isSpecial: false },
    { id: "fb_29", categoryId: "fb_addons", name: "Chorizo", description: "", price: 500, image: null, active: true, isSpecial: false },
    { id: "fb_30", categoryId: "fb_addons", name: "Avocado", description: "", price: 400, image: null, active: true, isSpecial: false },
    { id: "fb_31", categoryId: "fb_addons", name: "Hash Browns", description: "", price: 400, image: null, active: true, isSpecial: false },
    { id: "fb_32", categoryId: "fb_addons", name: "Halloumi", description: "", price: 500, image: null, active: true, isSpecial: false },
    { id: "fb_33", categoryId: "fb_addons", name: "Sautéed Mushrooms", description: "", price: 400, image: null, active: true, isSpecial: false },
    { id: "fb_34", categoryId: "fb_addons", name: "Spinach/Kale", description: "", price: 400, image: null, active: true, isSpecial: false },
    { id: "fb_35", categoryId: "fb_addons", name: "Feta Cheese", description: "", price: 400, image: null, active: true, isSpecial: false },
    { id: "fb_36", categoryId: "fb_addons", name: "Cherry Tomatoes", description: "", price: 400, image: null, active: true, isSpecial: false },
    { id: "fb_37", categoryId: "fb_addons", name: "Sauce", description: "", price: 100, image: null, active: true, isSpecial: false },
    { id: "fb_38", categoryId: "fb_addons", name: "Cheese", description: "", price: 100, image: null, active: true, isSpecial: false },
  ]
};

async function fetchFromPos(): Promise<{ categories: any[]; items: any[] } | null> {
  const apiUrl = process.env.POS_API_URL || process.env.RESTROOPS_API_URL || 'http://localhost:4000';
  const merchantId = process.env.POS_MERCHANT_ID || process.env.POS_RESTAURANT_ID || process.env.RESTROOPS_RESTAURANT_ID;

  if (!merchantId || merchantId === 'mock_pos_id' || merchantId === 'mock_restaurant_id') {
    return null;
  }

  try {
    const headers = { 'x-restaurant-id': merchantId };
    
    // Fetch categories and menu items with 3.5s timeout
    const [catsRes, itemsRes] = await Promise.all([
      fetch(`${apiUrl}/api/v1/public/categories`, { headers, signal: AbortSignal.timeout(3500) }),
      fetch(`${apiUrl}/api/v1/public/menu-items`, { headers, signal: AbortSignal.timeout(3500) })
    ]);

    if (!catsRes.ok || !itemsRes.ok) {
      console.warn(`POS API responded with status: categories=${catsRes.status}, items=${itemsRes.status}`);
      return null;
    }

    const catsData = await catsRes.json();
    const itemsData = await itemsRes.json();

    return {
      categories: catsData.data || [],
      items: itemsData.data || []
    };
  } catch {
    // POS is offline / unreachable
    return null;
  }
}

export async function syncPosMenu(force = false) {
  try {
    console.log("Checking POS connection...");
    const liveData = await fetchFromPos();

    if (liveData && liveData.categories.length > 0) {
      console.log(`⚡ Connected to POS! Syncing ${liveData.categories.length} categories and ${liveData.items.length} items...`);

      // 1. Sync Categories
      for (const cat of liveData.categories) {
        await prisma.menuCategory.upsert({
          where: { posId: cat.id },
          update: {
            name: cat.name.toUpperCase(),
            sortOrder: cat.sortOrder ?? 0,
          },
          create: {
            posId: cat.id,
            name: cat.name.toUpperCase(),
            sortOrder: cat.sortOrder ?? 0,
          }
        });
      }

      // 2. Sync Items
      for (const item of liveData.items) {
        const category = await prisma.menuCategory.findUnique({
          where: { posId: item.categoryId }
        });

        if (!category) {
          console.warn(`Skipping item ${item.name}: Category ${item.categoryId} not found.`);
          continue;
        }

        const priceInCents = Math.round(Number(item.price) * 100);

        await prisma.menuItem.upsert({
          where: { posId: item.id },
          update: {
            name: item.name,
            description: item.description,
            price: priceInCents,
            image: item.imageUrl,
            active: item.isAvailable && !item.isDeleted,
            categoryId: category.id
          },
          create: {
            posId: item.id,
            name: item.name,
            description: item.description,
            price: priceInCents,
            image: item.imageUrl,
            active: item.isAvailable && !item.isDeleted,
            categoryId: category.id
          }
        });
      }

      console.log("✅ Successfully synced menu from POS!");
      return { success: true, source: 'pos', message: "Menu synced with POS system" };
    }

    // --- STANDALONE FALLBACK MODE ---
    console.log("ℹ️ POS system offline or standalone. Verifying Golden Moment full menu...");

    const existingCount = await prisma.menuItem.count();
    if (existingCount >= 30 && !force) {
      console.log(`✅ Keeping existing ${existingCount} menu items from database.`);
      return {
        success: true,
        source: 'local_database',
        message: `Running standalone. ${existingCount} items active in database.`
      };
    }

    console.log("🌱 Seeding/syncing complete 38-item Golden Moment menu to database...");
    
    // Upsert Categories with deterministic IDs
    for (const cat of DEFAULT_MENU_SEED.categories) {
      await prisma.menuCategory.upsert({
        where: { id: cat.id },
        update: { name: cat.name, sortOrder: cat.sortOrder },
        create: { id: cat.id, posId: cat.id, name: cat.name, sortOrder: cat.sortOrder }
      });
    }

    // Upsert Items with deterministic IDs matching client fallback IDs
    for (const item of DEFAULT_MENU_SEED.items) {
      await prisma.menuItem.upsert({
        where: { id: item.id },
        update: {
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          active: item.active,
          isSpecial: item.isSpecial,
          categoryId: item.categoryId,
          posId: item.id
        },
        create: {
          id: item.id,
          posId: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          image: item.image,
          active: item.active,
          isSpecial: item.isSpecial,
          categoryId: item.categoryId
        }
      });
    }

    console.log("✅ Seeded/synced complete Golden Moment menu (38 items) successfully!");
    return { success: true, source: 'seed', message: "Seeded complete Golden Moment menu into database" };

  } catch (error: any) {
    console.error("❌ Sync error:", error);
    return { success: false, error: error.message };
  }
}
