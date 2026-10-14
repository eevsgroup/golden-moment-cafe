
export interface MenuItem {
    id: string;
    posId: string | null;
    name: string;
    description: string | null;
    price: number; // Integer cents
    image: string | null;
    active: boolean;
    isSpecial: boolean;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
}

export interface MenuCategory {
    id: string;
    posId: string | null;
    name: string;
    sortOrder: number;
    items: MenuItem[];
    createdAt: string;
    updatedAt: string;
}
